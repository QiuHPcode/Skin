from _datetime import datetime
import os
from pathlib import Path
import torch
from PIL import Image
from ultralytics.utils import ops
from ultralytics.utils.files import increment_path
from ultralytics.utils.plotting import save_one_box

from models.common import DetectMultiBackend
from utils.dataloaders import LoadImages
from utils.general import LOGGER, Profile, check_img_size, colorstr, cv2, non_max_suppression, scale_boxes, xyxy2xywh
from utils.plots import Annotator, colors
from utils.torch_utils import select_device

def detect(models1, models2, source, line_thickness):
    # if not os.path.exists(save_dir):
    #     os.mkdir(save_dir)
    zb=[]
  #   device = select_device('0')  # 获取设备
  # ####读取加载模型
  #   models1 = DetectMultiBackend(weights1, device=device, fp16=half)
  #   models2 = DetectMultiBackend(weights2, device=device, fp16=half)
    stride1, names1, pt1 = models1.stride, models1.names, models1.pt
    stride2, names2, pt2= models2.stride, models2.names, models2.pt
    # print('pt', pt)
    imgsz1 = check_img_size(imgsz=640, s=stride1)  # check image size
    imgsz2 = check_img_size(imgsz=640, s=stride2)  # check image size
    dataset1 = LoadImages(source, img_size=imgsz1, stride=stride1, auto=pt1)
    # dataset_safety = LoadImages(source, img_size=imgsz, stride=stride, auto=pt_safety)

    seen, windows, dt = 0, [], (Profile())
    # 正式推理 从上面的LoadImages()可以看到每次只输入单张图片
    # 处理每一张图片或者视频的格式
    for path, im, im0s, vid_cap, s in dataset1:
        # path 是图片或视频的路径
        # im 是进行resize + pad之后的图片
        # im0s 是原尺寸图片
        # vid_cap 当读取的图片为None时，读取视频为视频源
        # torch.from_numpy()的作用是将生成的数组转换为张量。

        im = torch.from_numpy(im).to(models1.device)
        # 图片设置为FP16/FP32
        im = im.half() if models1.fp16 else im.float()
        im /= 255  # 归一化
        # 如果没有batch_size的话则在最前面添加一个轴
        if len(im.shape) == 3:
            # 增加一个维度
            im = im[None]
        with dt:  # 使用with以及dt是为了方便后续计算推理时间
            pred = models1(im)
        # 调用utils/general.py文件中的non_max_suppression类进行非极大值抑制 max_det默认300记得改
        pred = non_max_suppression(pred, conf_thres=0.25, iou_thres=0.45, classes=None, agnostic=False)

        global x
        global detect
        x=0
        detect=False
        # 后续保存或者打印预测信息
        # 对每张图片进行处理 将pred映射回原图
        for i, det in enumerate(pred):
            seen += 1
            # print('det',i,det)
            im0 = im0s.copy()
                          # frame= getattr(dataset, 'frame', 0))
            # p = Path(p)  # 当前路径（yolov5/data/images）
            # save_path = str(save_dir + p.name)  # 图片或视频的保存路径（如runs/detect/AEF/***.jpg）
            # 设置保存框的坐标的txt文件路径，每张图片对应一个框坐标信息
            # txt_path = str(save_dir + 'labels' + p.stem) + ('' if dataset.mode == 'image' else f'_{frame}')
            # 设置打印图片的信息
            s += '%gx%g ' % im.shape[2:]
            gn = torch.tensor(im0.shape)[[1, 0, 1, 0]]  # normalization gain whwh
            annotator = Annotator(im0, line_width=line_thickness, example=str(names1))

            if len(det):
                x=len(det)
                detect=True
                # print('det前:',det)
                det[:, :4] = scale_boxes(im.shape[2:], det[:, :4], im0.shape).round()  # 将预测信息映射到原图
                # print('det后:',det)
                # 打印检测到的类别数量
                for c in det[:, 5].unique():
                    n = (det[:, 5] == c).sum()
                    s += f"{n} {names1[int(c)]}{'s' * (n > 1)},"

                # name = ["0", "dog", '1', '3']
                # 保存结果： txt/图片画框/crop-image
                for *xyxy, conf, cls in reversed(det):
                    # print(xyxy)
                    # 将每个图片的预测信息分别存入save_dir/labels下的xxx.txt中 每行: class_id + score + xywh
                    xywh = ops.xyxy2xywh(torch.tensor(xyxy).view(1, 4) / gn).view(-1).tolist()# normalized xywh
                    # print(xywh)
                    xyxy0 = ops.xywh2xyxy(torch.tensor(xywh).view(1,4)*gn).long().view(-1).tolist()
                    # print(xyxy0)
                    im1=im0s.copy()
                    datetime_str = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
                    file_path = Path(f'skin/{datetime_str}.jpg')
                    immm=saveone_box(xyxy, im1, file=file_path,square=False, BGR=True, save=True)
                    dataset2 = LoadImages(file_path, img_size=imgsz2, stride=stride2, auto=pt2)
                    for path1, imm, im0s1, vid_cap1, s1 in dataset2:
                        imm = torch.from_numpy(imm).to(models2.device)
                        imm = imm.half() if models1.fp16 else imm.float()
                        imm /= 255  # 归一化
                        # 如果没有batch_size的话则在最前面添加一个轴
                        if len(imm.shape) == 3:
                            # 增加一个维度
                            imm = imm[None]
                        with dt:  # 使用with以及dt是为了方便后续计算推理时间
                            pred1 = models2(imm)
                            pred1 = non_max_suppression(pred1, conf_thres=0.25, iou_thres=0.45, classes=None,
                                                       agnostic=False)
                            for j, det1 in enumerate(pred1):
                                seen += 1
                                im01 = im0s1.copy()
                                s1 += '%gx%g ' % imm.shape[2:]
                                gn1 = torch.tensor(im01.shape)[[1, 0, 1, 0]]  # normalization gain whwh
                                annotator1 = Annotator(im01, line_width=line_thickness, example=str(names2))
                                if len(det1):
                                    x1 = len(det1)
                                    # print('det前:', det1)
                                    det1[:, :4] = scale_boxes(imm.shape[2:], det1[:, :4], im01.shape).round()  # 将预测信息映射到原图
                                    # print('det后:', det1)
                                    # 打印检测到的类别数量
                                    for c1 in det1[:, 5].unique():
                                        n1 = (det1[:, 5] == c1).sum()
                                        s1 += f"{n1} {names2[int(c1)]}{'s' * (n1 > 1)},"
                                    for *xyxy1, conf1, cls1 in reversed(det1):
                                        # print('ds:',xyxy1)
                                        # 将每个图片的预测信息分别存入save_dir/labels下的xxx.txt中 每行: class_id + score + xywh
                                        xywh1 = ops.xyxy2xywh(torch.tensor(xyxy1).view(1, 4) / gn1).view(
                                            -1).tolist()  # normalized xywh
                                        # print(xywh1)
                                        xyxy2 = ops.xywh2xyxy(torch.tensor(xywh1).view(1, 4) * gn1).long().view(
                                            -1).tolist()
                                        # print(xyxy2)
                                        xyxy2 = [xyxy2[0] + xyxy0[0], xyxy2[1] + xyxy0[1], xyxy2[2] + xyxy0[0],
                                                  xyxy2[3] + xyxy0[1]]


                                        gg= torch.tensor(im0s.shape)[[1,0,1,0]]
                                        # print(gg)
                                        xywh3 = xyxy2xywh(torch.tensor(xyxy2).view(1, 4) / gg).view(
                                            -1).tolist()
                                        xyxy2 = ops.xywh2xyxy(torch.tensor(xywh3).view(1,4)*gg).long().view(
                                            -1).tolist()
                                        # print('比例:',xywh3)
                                        xyxy3=ops.xywh2xyxy(torch.tensor(xywh1).view(1,4)*gg).long().view(
                                            -1).tolist()
                                        # print('xyxy3:', xyxy3)
                                        zb.append(xywh3)
                    directory = 'skin'
                    os.remove(file_path)
                    files = os.listdir(directory)
                    current_time = datetime.now()
                    for file in files:
                        if file.endswith('.jpg'):
                            # 构建完整的文件路径
                            file_path = os.path.join(directory, file)
                            # 删除文件
                            try:
                                # 从文件名中提取时间信息，假设文件名中时间部分位于前面
                                file_time = datetime.strptime(file.split('.')[0], "%Y-%m-%d_%H-%M-%S")
                                # 计算文件的创建时间与当前时间的差值
                                time_difference = (current_time - file_time).total_seconds() / 60
                                # 如果时间差超过十分钟，则删除文件
                                if time_difference > 5:
                                    os.remove(file_path)
                                    # print(f"Deleted: {file_path}")
                            except ValueError:
                                continue
                    return zb
            else:
                return False
                                        # image1 = im0s[xyxy2[1]:xyxy2[3], xyxy2[0]:xyxy2[2]]
                                        # image1=im0s[xyxy3[1]:xyxy3[3],xyxy3[0]:xyxy3[2]]
                                        # cv2.imshow('i',image1)
                                        # cv2.imwrite(f'2{datetime_str}.jpg',image1)
                                        # cv2.waitKey()
                                        # cv2.destroyAllWindows()

                                        # im11 = im0s1.copy()
                                        # datetime_str = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
                                        # file_path1 = Path(f'lession/{datetime_str}.jpg')
                                        # immm1 = saveone_box(xyxy1, im11, file=file_path1, square=False, BGR=True, save=True)




                    # cv2.imshow('mm',immm)
                    # cv2.waitKey()
                    # cv2.destroyAllWindows()

                    # if int(cls) == 2:
                    #     line = (cls - 1, *xywh)  # label format 这里的类别序号需要注意一下
                    # else:
                    #     line = (cls, *xywh)  # label format 这里的类别序号需要注意一下
                    # with open(f'{txt_path}.txt', 'a') as f:
                    #     f.write(('%g ' * len(line)).rstrip() % line + '\n')
                    # 在原图中画框

            #         c = int(cls)  # 整数类
            #         print(names1)
            #         label = (f'{names1[c]} {conf:.2f}')
            #         annotator.box_label(xyxy, label, color=colors(c, True))
            #     LOGGER.info(f"{s}{'' if len(det) else '(no detection),'}{dt.dt * 1E3:.1f}ms")
            # im0 = annotator.result()
            # 保存图片
            # if dataset1.mode == 'image':
            #     cv2.imwrite('detect.jpg',im0)
                #cv2.imwrite(save_path, im0)
        # print(x)
        # print(detect)
            # =====================================加载安全衣检测模型对图片进行推理======================================================
            # 后续保存或者打印预测信息
            # 对每张图片进行处理 将pred映射回原图
        # 打印推理时间，图片大小，以及检测到的类别

    # # 打印输出图像的保存路劲
    # LOGGER.info(f"Results saved to {colorstr('bold', save_dir)}")

def saveone_box(xyxy, im, file=Path('im.jpg'), square=False, BGR=False, save=True):

    if not isinstance(xyxy, torch.Tensor):  # may be list
        xyxy = torch.stack(xyxy)
    b = ops.xyxy2xywh(xyxy.view(-1, 4))  # boxes
    if square:
        b[:, 2:] = b[:, 2:].max(1)[0].unsqueeze(1)  # attempt rectangle to square
     # box wh * gain + pad
    xyxy = ops.xywh2xyxy(b).long()
    ops.clip_boxes(xyxy, im.shape)
    crop = im[int(xyxy[0, 1]):int(xyxy[0, 3]), int(xyxy[0, 0]):int(xyxy[0, 2]), ::(1 if BGR else -1)]
    if save:
        file.parent.mkdir(parents=True, exist_ok=True)  # make directory
        f = str(increment_path(file).with_suffix('.jpg'))
        # cv2.imwrite(f, crop)  # save BGR, https://github.com/ultralytics/yolov5/issues/7007 chroma subsampling issue
        Image.fromarray(crop[..., ::-1]).save(f, quality=95, subsampling=0)  # save RGB
    return crop

if __name__ == "__main__":
    with torch.no_grad():
        half = False  # 是否使用半精度推理（F16），使用半精度可以提高检测速度
        line_thickness = 3  # 画框线条的粗细
        weights1 = r'model/skin/best.pt'
        weights2 = r'model/lession/best.pt'
        # weights1 = r'E:\code\detect\yolov5\yolov5s.pt/'
        source = r'img.jpg'
        # img=cv2.imread(source)
        source = str(source)
        # cv2.imshow('i',img)
        # cv2.waitKey(0)
        # cv2.destroyAllWindows()
        # labels = ['hat', 'other_clothes', 'person', 'reflective_clothes']
        # save_dir = r'F:\yolov5\runs\detect\exp5/'
        xywh=detect(weights1, weights2, source, half, line_thickness)
        print(xywh)