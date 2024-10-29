# 肤测汇——基于AI图像视觉的中西医皮肤疾病诊断与识别
## 基于Uni-app(Vite的Vue3)+Python的flask+MySql+PyTorch
* Node.js版本 v18.18.2
* python版本 3.9
## 运行
### 后端(flaskservice)
配置requeriments.txt的环境 及自身电脑适配的不低于YOLOv5和ResNet34需求的pytorch版本  
主文件是flaskclient.py文件  
一个皮肤检测YOLOv5定位模型，一个皮损(皮肤损坏位置)YOLOv5定位模型,一个病类分类RestNet34诊断模型,都是自己找寻数据，做数据标注处理，然后调参训练部署，因为数据不多，所以有的检测率不高请谅解，其实可以去找找类似的API接口请求。
### 前端(App01)
项目于HBuilderX导入
可直接运行 或导出为apk安卓安装包等各种
### 数据库(skin.sql)
MySQL数据库skin.sql  
这里存在各种登录信息，还有记录，和皮肤病中西的数据库，这也是自己搜自己处理的，所以请各位谅解。
### 功能实现
#### 项目有一些语言不规范请谅解,因为前后端开发时间太紧，有一些地方写的死代码。
#### 实现前后端分离，token验证密钥自动登录，皮肤定位判断及皮肤损坏位置定位判断根据后端YOLOv5模型预测的坐标用Canvas自动标注框取或手动框取，并最终根据ResNet模型出现结果，并实现单账号多用户及各记录的增删改操作。
#### 皮肤定位模型和皮损定位模型均用的YOLOV5算法，数据集也是自己找的开源的并且自己清洗标注的，但由于当时自己一个人并且设备不好，所以用的数据不多，然后病类判断模型用的ResNet34，也是自己的数据集，自己清洗标注训练，最终将三个模型部署，不是请求的第三方接口，请注意！！！
### 界面效果
![主页](https://github.com/QiuHPcode/picture/blob/master/%E4%B8%BB%E9%A1%B5.png)
![登录](https://github.com/QiuHPcode/picture/blob/master/%E7%99%BB%E5%BD%95.png)
![注册](https://github.com/QiuHPcode/picture/blob/master/%E6%B3%A8%E5%86%8C.png)
![未登录用户](https://github.com/QiuHPcode/picture/blob/master/%E6%9C%AA%E7%99%BB%E5%BD%95%E7%94%A8%E6%88%B7.png)
![忘记密码1](https://github.com/QiuHPcode/picture/blob/master/%E5%BF%98%E8%AE%B0%E5%AF%86%E7%A0%811.png)
![忘记密码2](https://github.com/QiuHPcode/picture/blob/master/%E5%BF%98%E8%AE%B0%E5%AF%86%E7%A0%812.png)
![选择用户](https://github.com/QiuHPcode/picture/blob/master/%E9%80%89%E6%8B%A9%E7%94%A8%E6%88%B7.png)
![添加新用户](https://github.com/QiuHPcode/picture/blob/master/%E6%B7%BB%E5%8A%A0%E6%96%B0%E7%94%A8%E6%88%B7.png)
![皮损定位](https://github.com/QiuHPcode/picture/blob/master/%E7%9A%AE%E6%8D%9F%E5%AE%9A%E4%BD%8D.png)
![部位选择](https://github.com/QiuHPcode/picture/blob/master/%E9%83%A8%E4%BD%8D%E9%80%89%E6%8B%A9.png)
![结果报告](https://github.com/QiuHPcode/picture/blob/master/%E7%BB%93%E6%9E%9C%E6%8A%A5%E5%91%8A.png)
![记录显示](https://github.com/QiuHPcode/picture/blob/master/%E8%AE%B0%E5%BD%95%E6%98%BE%E7%A4%BA.png)
![用户管理](https://github.com/QiuHPcode/picture/blob/master/%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%86.png)
![查看用户](https://github.com/QiuHPcode/picture/blob/master/%E6%9F%A5%E7%9C%8B%E7%94%A8%E6%88%B7.png)
![修改用户信息](https://github.com/QiuHPcode/picture/blob/master/%E4%BF%AE%E6%94%B9%E7%94%A8%E6%88%B7%E4%BF%A1%E6%81%AF.png)
![查看原图](https://github.com/QiuHPcode/picture/blob/master/%E6%9F%A5%E7%9C%8B%E5%8E%9F%E5%9B%BE.png)
