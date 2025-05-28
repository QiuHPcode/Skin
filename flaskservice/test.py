from argparse import ArgumentParser
import os
import sys

import torch

from inference import load_modelEv2
from utils.checkpoint import load_checkpoint
from utils.train_utils import get_info, file2dict
from models.build import BuildNet
from models.efficientnetv2.efficientnetv2_b0 import model_cfg, val_pipeline


def run_inference_by_params(
    img_path: str,
    model_cfg: dict,
    checkpoint_path: str,
    val_pipeline: dict,
    classes_map_path: str,
    device: str = 'cuda'
):
    """
    Args:
        img_path (str): 图片路径
        model_cfg (dict): 模型结构配置（包含 backbone、neck、head 等）
        checkpoint_path (str): 已训练的模型权重路径
        val_pipeline (list): 验证时的 transform 配置
        classes_map_path (str): 类别映射文件
        save_path (str): 预测结果保存路径，可为 None
        device (str): 推理设备，'cuda' 或 'cpu'
    """
    # 类别名称和标签映射
    classes_names, label_names = get_info(classes_map_path)
    # 构建模型
    model = BuildNet(model_cfg)
    # 加载权重
    model = load_modelEv2(model, checkpoint_path, device=device)
    # 推理
    # result = inference_model(model, img_path, val_pipeline, classes_names, label_names)

    return model


if __name__ == '__main__':

    result = run_inference_by_params(
        img_path='1.jpg',
        model_cfg=model_cfg,
        checkpoint_path='model/allCategory/E_b0.pth',
        val_pipeline=val_pipeline,
        classes_map_path='annotations.txt',
        device='cuda'
    )