# 肤测汇——基于AI图像视觉的中西医皮肤疾病诊断与识别
## 基于Uni-app(Vite的Vue3)+Python的flask+MySql+PyTorch
* Node.js版本 v18.18.2
* python版本 3.9
## 运行
### 后端(flaskservice)
配置requeriments.txt的环境 及自身电脑适配的不低于YOLOv5和ResNet34需求的pytorch版本
### 前端(App01)
项目于HBuilderX导入
可直接运行 或导出为apk安卓安装包等各种
### 数据库(skin.sql)
MySQL数据库skin.sql
### 功能实现
#### 实现前后端分离，token验证密钥自动登录，皮损根据后端YOLOv5模型预测的坐标用Canvas自动标注框取或手动框取，并最终根据ResNet模型出现结果，并实现单账号多用户及各记录的增删改操作。
