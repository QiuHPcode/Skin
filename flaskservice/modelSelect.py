import importlib

def model_id_to_index(model_id):
    """
    将以1为起点的ID转换为以0为起点的数组索引。

    参数:
        id (int): 从1开始的编号

    返回:
        int: 从0开始的索引
    """
    return model_id - 1


def model_select(modelArray, model_id):
    index = model_id_to_index(model_id)
    model = modelArray[index]
    return model



def get_val_pipeline_by_id(model_id):
    """
    根据模型ID动态导入val_pipeline
    例如：3 -> efficientnetv2_b0.py, 4 -> efficientnetv2_b1.py, 5 -> efficientnetv2_b2.py
    """
    # 映射ID到模块名
    id_to_model_map = {
        3: 'efficientnetv2_b0',
        4: 'efficientnetv2_b1',
        5: 'efficientnetv2_b2',
        6: 'efficientnetv2_s'
    }
    if model_id not in id_to_model_map:
        raise ValueError(f"模型ID {model_id} 未定义")
    model_name = id_to_model_map[model_id]
    print(model_name)
    module_path = f"models.efficientnetv2.{model_name}"
    module = importlib.import_module(module_path)

    # 按需返回对应的 pipeline 变量（确保模块中变量名一致）
    return getattr(module, 'val_pipeline')

