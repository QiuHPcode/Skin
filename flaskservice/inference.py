import cv2
import numpy as np
import torch
from PIL import Image
from torchvision import transforms
from ultralytics.utils import ops

from core.datasets import Compose
from models.build import BuildNet
from models.model_resNet import ResNet34, ResNet50
from utils.checkpoint import load_checkpoint
from models.efficientnetv2.efficientnetv2_b0 import model_cfg, val_pipeline

'''
文本：{性别，年龄，病变部位}
    性别：无：0，男：1，女：2
    年龄：0——***
    部位：全身：0，鼻子：1，眼周：2，口部：3，颊部：4，（面部：1-4），头部：5，耳朵：6，颈部：7，胸部：8，腹部：9，背部：10，臀部：11，（躯干：8-11），腿部：12，足部：13，手部：14，手臂：15，（四肢：12-15），腋下：16，肛周：17，外生殖器：18,指甲：19
'''

# 定义疾病信息的字典
diseases_info = {
    0: {'gender': 1, 'age_range': (30, 60), 'areas': [1]},
    1: {'gender': 0, 'age_range': (10, 30), 'areas': [0]},
    2: {'gender': 0, 'age_range': (-1, -1), 'areas': [0]},
    3: {'gender': 0, 'age_range': (30, 60), 'areas': [1,2,3,4,7,8,9,10,11]},
    4: {'gender': 0, 'age_range': (30, 40), 'areas': [5]},
    5: {'gender': 0, 'age_range': (-1, -1), 'areas': [0]},
    6: {'gender': 0, 'age_range': (15, 25), 'areas': [1,2,3,4]},
    7: {'gender': 0, 'age_range': (2, 10), 'areas': [0]},
    8: {'gender': 0, 'age_range': (5, 35), 'areas': [7,8,9,10,11,18]},
    9: {'gender': 0, 'age_range': (5, 30), 'areas': [1,2,3,4,7,8,9,10,11]},
    10: {'gender': 0, 'age_range': (5, 50), 'areas': [0]},
    11: {'gender': 2, 'age_range': (5, 30), 'areas': [0]},
    12: {'gender': 2, 'age_range': (20, 30), 'areas': [0]},
    13: {'gender': 0, 'age_range': (20, 60), 'areas': [0]},
    14: {'gender': 0, 'age_range': (-1, -1), 'areas': [0]},
    15: {'gender': 0, 'age_range': (-1, -1), 'areas': [0]},
    16: {'gender': 1, 'age_range': (20, 50), 'areas': [1,2,3,4,6,14]},
    17: {'gender': 1, 'age_range': (20, 50), 'areas': [8,10,12,13,14,15]},
    18: {'gender': 2, 'age_range': (15, 40), 'areas': [1,2,3,4]},
    19: {'gender': 2, 'age_range': (-1, -1), 'areas': [1,2,3,4]},
    20: {'gender': 0, 'age_range': (20, 40), 'areas': [16,17,18]},
    21: {'gender': 0, 'age_range': (-1, -1), 'areas': [0]},
    22: {'gender': 0, 'age_range': (-1, -1), 'areas': [13,14]},
    23: {'gender': 1, 'age_range': (3, 5), 'areas': [1,2,3,4,12,13,14,15]},
    24: {'gender': 1, 'age_range': (20, 60), 'areas': [7,10,12]},
    25: {'gender': 0, 'age_range': (-1, -1), 'areas': [0]},
    26: {'gender': 0, 'age_range': (20, 40), 'areas': [2,4]},
    27: {'gender': 0, 'age_range': (5, 30), 'areas': [3,13,14]},
    28: {'gender': 0, 'age_range': (-1, -1), 'areas': [0]},
    29: {'gender': 0, 'age_range': (40, 60), 'areas': [1,2,3,4,5,14]},
    30: {'gender': 0, 'age_range': (-1, -1), 'areas': [19]},
    31: {'gender': 0, 'age_range': (-1, -1), 'areas': [1,2,3,4]},
    32: {'gender': 0, 'age_range': (50, 70), 'areas': [3,5,7]},
    33: {'gender': 0, 'age_range': (20, 60), 'areas': [13]},
    34: {'gender': 0, 'age_range': (-1, -1), 'areas': [0]},
    35: {'gender': 0, 'age_range': (-1, -1), 'areas': [3]},
    36: {'gender': 0, 'age_range': (-1, -1), 'areas': [12]},
    37: {'gender': 0, 'age_range': (-1, -1), 'areas': [0]},
    38: {'gender': 0, 'age_range': (-1, -1), 'areas': [17,18]},
    39: {'gender': 0, 'age_range': (5, 20), 'areas': [11,12,13,14,15]},
    40: {'gender': 0, 'age_range': (-1, -1), 'areas': [1,2,3,4,5]},
    41: {'gender': 0, 'age_range': (20, 30), 'areas': [1,2,3,4,5,10]},
    42: {'gender': 0, 'age_range': (5, 15), 'areas': [1,2,3,4,12,13,14,15]},
    43: {'gender': 0, 'age_range': (-1, -1), 'areas': [0]},
    44: {'gender': 0, 'age_range': (-1, -1), 'areas': [0]},
    45: {'gender': 2, 'age_range': (20, 40), 'areas': [12,13,14,15]},
    46: {'gender': 1, 'age_range': (40, 80), 'areas': [1,2,3,4,5,15]},
    47: {'gender': 0, 'age_range': (40, 60), 'areas': [0]},
    48: {'gender': 0, 'age_range': (-1, -1), 'areas': [0]},
    49: {'gender': 0, 'age_range': (50, 80), 'areas': [1,2,3,4]},
    50: {'gender': 2, 'age_range': (3, 80), 'areas': [1,2,3,4]},
    51: {'gender': 2, 'age_range': (50, 60), 'areas': [8]},
    52: {'gender': 0, 'age_range': (3, 10), 'areas': [0]},
    53: {'gender': 0, 'age_range': (3, 20), 'areas': [0]},
    54: {'gender': 0, 'age_range': (-1, -1), 'areas': [0]},
    55: {'gender': 0, 'age_range': (0, 2), 'areas': [0]},
    56: {'gender': 0, 'age_range': (0, 5), 'areas': [3,13,14]},
    57: {'gender': 0, 'age_range': (50, 60), 'areas': [0]},
    58: {'gender': 0, 'age_range': (25, 40), 'areas': [0]},
    59: {'gender': 0, 'age_range': (50, 60), 'areas': [0]},
    60: {'gender': 0, 'age_range': (0, 10), 'areas': [0]},
    61: {'gender': 0, 'age_range': (5, 25), 'areas': [0]},
    62: {'gender': 0, 'age_range': (0, 2), 'areas': [0]},
    63: {'gender': 0, 'age_range': (5, 10), 'areas': [12,13,14,15]},
    64: {'gender': 0, 'age_range': (-1, -1), 'areas': [0]},
    65: {'gender': 0, 'age_range': (40, 80), 'areas': [8,9,10,11]},
    66: {'gender': 0, 'age_range': (20, 40), 'areas': [5,12,13,14,15]},
    67: {'gender': 0, 'age_range': (20, 40), 'areas': [13]},
    68: {'gender': 0, 'age_range': (-1, -1), 'areas': [8,9,10,11]},
    69: {'gender': 0, 'age_range': (5, 20), 'areas': [8,9,10,11,12,13,14,15]},
    70: {'gender': 0, 'age_range': (40, 80), 'areas': [1,2,3,4,10]},
    71: {'gender': 2, 'age_range': (10, 25), 'areas': [1,2,3,4,7,14]}
    # 78种疾病特征信息：性别，年龄，部位
}
#部位映射字典
area_map={0:5,1:4,2:6,3:2,4:4,5:3,6:3,7:7,8:8,9:8,10:9,11:12,12:12,13:12,14:13,15:13,16:13,17:13,18:19,19:16,20:15,21:15,22:15,23:15,24:14,25:14,26:14,27:10,28:11,29:12,30:13,31:13,32:14,33:19,34:18,35:18,36:17,37:18,38:18,39:18}

class_indict={
         "0": "鼻赘",
         "1": "白癜风",
         "2": "瘢痕",
         "3": "扁平苔藓",
         "4": "斑秃",
         "5": "斑疹",
         "6": "痤疮",
         "7": "传染性红斑",
         "8": "传染性软疣",
         "9": "单纯糠疹",
         "10": "单纯疱疹",
         "11": "多形红斑",
         "12": "多形性日光疹",
         "13": "带状疱疹",
         "14": "发育不良痣",
         "15": "痱子",
         "16": "光化性角化病",
         "17": "花斑糠疹",
         "18": "红斑狼疮",
         "19": "黄褐斑",
         "20": "化脓性汗腺炎",
         "21": "红皮病",
         "22": "汗疱疹",
         "23": "黄色瘤",
         "24": "黑色素瘤",
         "25": "坏死性筋膜炎",
         "26": "汗腺汗囊瘤",
         "27": "环状肉芽肿",
         "28": "疥疮",
         "29": "基底细胞癌",
         "30": "甲沟炎",
         "31": "角化棘皮瘤",
         "32": "静脉湖",
         "33": "鸡眼",
         "34": "卡波西肉瘤",
         "35": "口角炎",
         "36": "腿部溃疡",
         "37": "鳞状细胞癌",
         "38": "梅毒",
         "39": "毛发苔藓",
         "40": "毛囊瘤",
         "41": "毛囊炎",
         "42": "脓疱病",
         "43": "脓肿",
         "44": "皮肤癣菌病",
         "45": "皮肤纤维瘤",
         "46": "皮角",
         "47": "皮肌炎",
         "48": "皮炎",
         "49": "皮脂腺增生",
         "50": "雀斑",
         "51": "乳腺佩吉特病",
         "52": "水痘",
         "53": "色素性干皮病",
         "54": "色素痣",
         "55": "湿疹",
         "56": "手足口病",
         "57": "天疱疮",
         "58": "血管纤维瘤",
         "59": "血管炎",
         "60": "荨麻疹",
         "61": "疣",
         "62": "幼儿急疹",
         "63": "鱼鳞病",
         "64": "硬皮病",
         "65": "樱桃血管瘤",
         "66": "银屑病",
         "67": "压性丘疹",
         "68": "晕痣",
         "69": "游走性红斑",
         "70": "脂溢性角化病",
         "71": "蜘蛛痣"
}
#疾病信息映射函数
def get_info(gender,age,area):#传入性别gender，年龄age，部位area,生成病人文本信息
    areas=[]
    gen=0
    if gender =="男":
        gen=1
    else:
        gen=2
    for index, value in enumerate(area):
        if value==1:
            if area_map[index] not in areas:
                areas.append(area_map[index])
    patient_info={'gender': gen, 'age_range': age, 'areas': areas}
    # print("病人信息为{}".format(patient_info))
    return patient_info

# 加载模型resnet34
def load_model34(model_weights_path,device):
    # device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
    model = ResNet34(72).to(device)
    # 权重文件放入模型中
    model.load_state_dict(torch.load(model_weights_path, map_location=device))
    model.eval()
    print("R34模型加载成功")
    return model


# 加载模型resnet34
def load_model50(model_weights_path,device):
    # device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
    model = ResNet50(72).to(device)
    # 权重文件放入模型中
    model.load_state_dict(torch.load(model_weights_path, map_location=device))
    model.eval()
    print("R50模型加载成功")
    return model



# 初始化模型Efficientnetv2
def load_modelEv2(model_cfg: dict, checkpoint_path, device='cuda'):
    # 构建模型
    model = BuildNet(model_cfg)

    load_checkpoint(model, checkpoint_path, map_location=device, strict=False)
    model.eval()
    model.to(device)
    print("E_v0模型初始化成功")
    return model






# 图像预处理函数
def preprocess_image(image):
    transform = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])
    image = transform(image)
    image = image.unsqueeze(0)
    return image

# 预测函数
def predict(model, image):
    device = next(model.parameters()).device
    input_image = preprocess_image(image).to(device)
    with torch.no_grad():
        output = model(input_image)

    # print("预测完成")
    return output


# Ev0预测函数
def Ev2Predict(model, image, val_pipeline):
    if isinstance(image, str):
        if val_pipeline[0]['type'] != 'LoadImageFromFile':
            val_pipeline.insert(0, dict(type='LoadImageFromFile'))
        data = dict(img_info=dict(filename=image), img_prefix=None)
    else:
        if val_pipeline[0]['type'] == 'LoadImageFromFile':
            val_pipeline.pop(0)
        if isinstance(image, Image.Image):  # ✅ 处理 PIL.Image
            image = np.array(image)
        data = dict(img=image, filename=None)

    pipeline = Compose(val_pipeline)
    image = pipeline(data)['img'].unsqueeze(0)
    device = next(model.parameters()).device  # model device

    # forward the model
    with torch.no_grad():
        scores = model(image.to(device), return_loss=False)
        # print(scores)
    return scores



# 加权函数
def jia_quan(patient_info, output, diseases_info):
    # print(output)
    weights = [1.0] * 72
    # 遍历疾病信息字典，调整权值

    for disease_index, disease_info in diseases_info.items():
        x=0
        if patient_info['gender'] == disease_info['gender']:
            # 性别
            x += 1
        if disease_info['age_range'][0] <= patient_info['age_range'] <= disease_info['age_range'][1]:
            # 年龄
            x += 2
        if any(area in disease_info['areas'] for area in patient_info['areas']):
            # 部位
            x += 2
        if x<=2:
            weights[disease_index]+=0
        elif x==3:
            weights[disease_index]+=0.1
        elif x==4:
            weights[disease_index]+=0.3
        else:
            weights[disease_index]+=1
    weights_tensor = torch.tensor(weights, dtype=output.dtype, device=output.device)
    new_out = output * weights_tensor
    # print((new_out))
    # print("文本加权完成")
    return new_out
#取前三名
def get_top(new_out):
    # 获取前三个最高分和对应的类别索引
    top3_scores, top3_classes = torch.topk(torch.squeeze(new_out), 3)
    # 对应的类别索引
    predict_classes = [class_indict[str(class_idx.item())] for class_idx in top3_classes]
    # print("前三得分：{}".format(top3_scores.tolist()))
    # print("前三病名：{}".format(predict_classes))
    # print("前三下标：{}".format(top3_classes.tolist()))
    # 得分排序
    # scores = torch.nn.functional.softmax(new_out[0], dim=0)
    # softmax是根据指数的归一化 前三差距太大
    # top_scores, top_classes = torch.topk(torch.squeeze(scores), 72)
    #最大-最小归一化 然后*比例因子，这样归一化最大是0.9不是1
    min_vals = new_out.min(dim=1)[0]
    max_vals = new_out.max(dim=1)[0]
    data = (new_out-min_vals[:,None])/(max_vals-min_vals)[:,None]*0.9
    # print(new_out[0])
    # print('最大最小结果',data)
    top_scores,top_classes = torch.topk(torch.squeeze(data),72)
    predictions={}
    strings=[]

    for i, prob in enumerate(new_out[0]):
        if i < 72:
            strings.append(f"{top_classes.tolist()[i]}:{round(top_scores.tolist()[i] * 100, 4)}%")
            output_str = "[" + ", ".join(strings) + "]"
            predictions[top_classes.tolist()[i]] = round(top_scores.tolist()[i] * 100, 4)
    # print("归一化：{}".format(output_str))
    top_three = {k: predictions[k] for k in list(predictions)[:3]}
    return top_three


#汇总
def all_work(output, gender, age, area):#模型权重文件 model_weights_path,图片地址 image_path,性别 gender,年龄 age,部位 area

    # print('output',output)
    # 生成病人文本信息
    patient_info = get_info(gender, age, area)
    # 根据用户信息，进一步对得分加权
    new_out = jia_quan(patient_info, output, diseases_info)
    # print('Fiona：',new_out)
    #
    #取前三
    top_out=get_top(new_out)
    # print("前三",top_out)
    return top_out



def main():
    # model_weights_path = r'resNet34.pth'
    model_weights_path = r'model/allCategory/E_b0.pth'

    device1 = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
    # model = load_model34(model_weights_path,device1)
    model = load_modelEv2(model_cfg,model_weights_path,device1)
    image_path = r"1.jpg"  # 图像路径
    image = cv2.imread(image_path)

    gn1 = torch.tensor(image.shape)[[1, 0, 1, 0]]  # 注意这里的索引顺序是[1, 0, 1, 0]
    print(gn1)
    xywh = [0.39531249999999996, 0.56851525821596249,  0.1875,  0.15492957746478872]
    xyxy = ops.xywh2xyxy(torch.tensor(xywh).view(1, 4) * gn1).long().view(-1).tolist()

    print(xyxy)
    image1 = image[xyxy[1]:xyxy[3], xyxy[0]:xyxy[2]]
    # cv2.imshow('1',image1)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()
    image1 = Image.fromarray(cv2.cvtColor(image1, cv2.COLOR_BGR2RGB))

    area = [0] * 40
    gender,age, area[22] = 1,16,1
    # 进行预测
    # output = predict(model, image1)
    output = Ev2Predict(model,image1,val_pipeline)

    top_out=all_work(output,"男",16,area)

    print('all_work返回值：{}'.format(top_out))

if __name__ == '__main__':
    main()