import torch
import torch.nn as nn
import torch.nn.functional as F

class Bottleneck(nn.Module): # Convblock
    def __init__(self, in_channel, filters, s):
        super(Bottleneck, self).__init__()
        c1, c2, c3 = filters
        self.bottleneck = nn.Sequential(
            nn.Conv2d(in_channels=in_channel, out_channels=c1, kernel_size=1, stride=s, padding=0, bias=False),
            nn.BatchNorm2d(c1),
            nn.ReLU(inplace=True),
            nn.Conv2d(in_channels=c1, out_channels=c2, kernel_size=3, stride=1, padding=1, bias=False),
            nn.BatchNorm2d(c2),
            nn.ReLU(inplace=True),
            nn.Conv2d(in_channels=c2, out_channels=c3, kernel_size=1, stride=1, padding=0, bias=False),
            nn.BatchNorm2d(c3),
            nn.ReLU(inplace=True),
        )
        self.short_cut = nn.Conv2d(in_channel, c3, kernel_size=1, stride=s, padding=0, bias=False)
        self.batch1 = nn.BatchNorm2d(c3)
        self.relu = nn.ReLU(inplace=True)

    def forward(self, x):
        output_x = self.bottleneck(x)
        short_cut_x = self.batch1(self.short_cut(x))
        result = output_x + short_cut_x
        X = self.relu(result)
        return X


class BasicBlock(nn.Module):
    def __init__(self,in_channel,filters):
        super(BasicBlock, self).__init__()
        c1, c2, c3 = filters
        self.basicblock = nn.Sequential(
            nn.Conv2d(in_channels=in_channel, out_channels=c1, kernel_size=1, stride=1, padding=0, bias=False),
            nn.BatchNorm2d(c1),
            nn.ReLU(inplace=True),
            nn.Conv2d(in_channels=c1, out_channels=c2, kernel_size=3, stride=1, padding=1, bias=False),
            nn.BatchNorm2d(c2),
            nn.ReLU(inplace=True),
            nn.Conv2d(in_channels=c2, out_channels=c3, kernel_size=1, stride=1, padding=0, bias=False),
            nn.BatchNorm2d(c3),
            nn.ReLU(inplace=True),
        )
        self.relu = nn.ReLU(inplace=True)
    def forward(self, x):
        identity = x
        output_x = self.basicblock(x)
        X = identity + output_x
        X = self.relu(X)
        return X


class ResNet(nn.Module):
    #resnet50
    def __init__(self,num_class):
        super(ResNet, self).__init__()

        self.stage1 = nn.Sequential(
            nn.Conv2d(3, 64, 7, 2, 3),
            nn.BatchNorm2d(64),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(3, 2, padding=1),
        )

        self.stage2 = nn.Sequential(
            Bottleneck(64, filters=[64, 64, 256],s=1),
            BasicBlock(256, filters=[64, 64, 256]),
            BasicBlock(256, filters=[64, 64, 256])
        )

        self.stage3 = nn.Sequential(
            Bottleneck(256, [128, 128, 512],s=2),
            BasicBlock(512, filters=[128, 128, 512]),
            BasicBlock(512, filters=[128, 128, 512]),
            BasicBlock(512, filters=[128, 128, 512]),
        )

        self.stage4 = nn.Sequential(
            Bottleneck(512, [256, 256, 1024],s=2),
            BasicBlock(1024, filters=[256, 256, 1024]),
            BasicBlock(1024, filters=[256, 256, 1024]),
            BasicBlock(1024, filters=[256, 256, 1024]),
            BasicBlock(1024, filters=[256, 256, 1024]),
            BasicBlock(1024, filters=[256, 256, 1024]),
        )

        self.stage5 = nn.Sequential(
            Bottleneck(1024, [512, 512, 2048],s=2),
            BasicBlock(2048, filters=[512, 512, 2048]),
            BasicBlock(2048, filters=[512, 512, 2048]),
        )
        self.pool = nn.AdaptiveAvgPool2d((1, 1))
        self.fc = nn.Linear(2048, num_class)

    def forward(self, x):
        out = self.stage1(x)  # torch.Size([1, 64, 56, 56])
        out = self.stage2(out)  # torch.Size([1, 64, 56, 56])
        out = self.stage3(out) # torch.Size([1, 512, 28, 28])
        out = self.stage4(out) # torch.Size([1, 1024, 14, 14])
        out = self.stage5(out)  # torch.Size([1, 2048, 7, 7])
        out = self.pool(out)
        out = out.view(out.size(0), 2048)
        out = self.fc(out)
        return out


class ResidualBlock(nn.Module):
    '''
    实现子module: Residual Block
    '''

    def __init__(self, inchannel, outchannel, stride=1, shortcut=None):
        super(ResidualBlock, self).__init__()
        # Sequential 是一个特殊Module, 包含几个子module,前向传播时会将输入一层一层的传递下去
        self.left = nn.Sequential(
            # 卷积层
            nn.Conv2d(inchannel, outchannel, 3, stride, 1, bias=False),
            # 在卷积神经网络的卷积层之后总会添加BatchNorm2d进行数据的归一化处理，
            # 这使得数据在进行Relu之前不会因为数据过大而导致网络性能的不稳定
            nn.BatchNorm2d(outchannel),
            # 激活函数采用ReLU
            nn.ReLU(inplace=True),
            nn.Conv2d(outchannel, outchannel, 3, 1, 1, bias=False),
            nn.BatchNorm2d(outchannel))
        self.right = shortcut

    # 前向传播
    def forward(self, x):
        out = self.left(x)
        residual = x if self.right is None else self.right(x)
        out += residual
        return F.relu(out)


class ResNet34(nn.Module):
    '''
    实现主module：ResNet34
    ResNet34 包含多个layer，每个layer又包含多个residual block
    用子module来实现residual block，用_make_layer函数来实现layer
    '''

    def __init__(self, num_classes=6):
        super(ResNet34, self).__init__()
        # 前几层图像转换
        self.pre = nn.Sequential(
            nn.Conv2d(3, 64, 7, 2, 3, bias=False),
            nn.BatchNorm2d(64),
            nn.ReLU(inplace=True),
            # 最大池化
            nn.MaxPool2d(3, 2, 1))

        # 重复的layer，分别有3，4，6，3个residual block
        # 共四层
        self.layer1 = self._make_layer(64, 64, 3)
        self.layer2 = self._make_layer(64, 128, 4, stride=2)
        self.layer3 = self._make_layer(128, 256, 6, stride=2)
        self.layer4 = self._make_layer(256, 512, 3, stride=2)

        # 分类用的全连接
        self.fc = nn.Linear(512, num_classes)

    def _make_layer(self, inchannel, outchannel, block_num, stride=1):
        # 构建layer,包含多个residual block
        shortcut = nn.Sequential(
            nn.Conv2d(inchannel, outchannel, 1, stride, bias=False),
            nn.BatchNorm2d(outchannel))

        layers = []
        layers.append(ResidualBlock(inchannel, outchannel, stride, shortcut))

        for i in range(1, block_num):
            layers.append(ResidualBlock(outchannel, outchannel))
        return nn.Sequential(*layers)

    def forward(self, x):
        x = self.pre(x)

        x = self.layer1(x)
        x = self.layer2(x)
        x = self.layer3(x)
        x = self.layer4(x)
        # 平均池化
        x = F.avg_pool2d(x, 7)
        x = x.view(x.size(0), -1)
        return self.fc(x)
