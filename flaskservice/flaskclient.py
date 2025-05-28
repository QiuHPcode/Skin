import base64
import datetime
import io
import os

import cv2
import torch
from datetime import timedelta, datetime

from PIL import Image
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from jwt import ExpiredSignatureError
from sqlalchemy import text

from flask_jwt_extended import create_access_token, JWTManager, get_jwt_identity, jwt_required, create_refresh_token
from werkzeug.utils import secure_filename

from DbClass import db, User_account, User_info, Sickness, Result, Count, Model
from sqlalchemy.exc import IntegrityError

from inference import load_model34, load_model50, load_modelEv2, all_work, predict, Ev2Predict
from modelSelect import model_select, get_val_pipeline_by_id
from mydetect import detect
from utils.general import xywh2xyxy
from models.common import DetectMultiBackend
from utils.torch_utils import select_device
from models.efficientnetv2.efficientnetv2_b0 import model_cfg
from models.efficientnetv2.efficientnetv2_b1 import model_cfg1
from models.efficientnetv2.efficientnetv2_b2 import model_cfg2
from models.efficientnetv2.efficientnetv2_s import model_cfg_s

app = Flask(__name__)
CORS(app, supports_credentials=True)

HOSTNAME = "127.0.0.1"
PORT = 3306
USERNAME = "root"
PASSWORD = "123456"
DATABASE = "skin"

app.config[
    'SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{USERNAME}:{PASSWORD}@{HOSTNAME}:{PORT}/{DATABASE}?charset=utf8mb4"

app.config['JWT_SECRET_KEY'] = 'skincloud key'
# 设置普通JWT过期时间seconds=5days=7
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=7)
# 设置刷新JWT过期时间days=30
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)
jwt = JWTManager(app)
with app.app_context():
    # db = SQLAlchemy(app)
    db.init_app(app)

# yolov5两个模型加载
half = False  # 是否使用半精度推理（F16），使用半精度可以提高检测速度
line_thickness = 3  # 画框线条的粗细
weights1 = r'model/skin/best.pt'
weights2 = r'model/lession/best.pt'
device = select_device('0' if torch.cuda.is_available() else 'cpu')  # 获取设备
  ####读取加载模型
models1 = DetectMultiBackend(weights1, device=device, fp16=half)
models2 = DetectMultiBackend(weights2, device=device, fp16=half)

# resnet34模型加载
model_weights34_path = r'model/allCategory/resNet34.pth'
model_weights50_path = r'model/allCategory/resNet50.pth'
model_weightsEv2_b0_path = r'model/allCategory/E_b0.pth'
model_weightsEv2_b1_path = r'model/allCategory/E_b1.pth'
model_weightsEv2_b2_path = r'model/allCategory/E_b2.pth'
model_weightsEv2_s_path = r'model/allCategory/E_s.pth'
device1 = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
model34 = load_model34(model_weights34_path,device1)
model50 = load_model50(model_weights50_path,device1)
model_Ev2_b0 = load_modelEv2(model_cfg, model_weightsEv2_b0_path, device1)
model_Ev2_b1 = load_modelEv2(model_cfg1, model_weightsEv2_b1_path, device1)
model_Ev2_b2 = load_modelEv2(model_cfg2, model_weightsEv2_b2_path, device1)
model_Ev2_s = load_modelEv2(model_cfg_s, model_weightsEv2_s_path, device1)
allModels = [model34, model50, model_Ev2_b0, model_Ev2_b1, model_Ev2_b2, model_Ev2_s]

# with app.app_context():
#     users = User_account.query.all()
#     print(users)
#     for user in users:
#         content = {'id': user.id, 'user': user.user,
#                     'password': user.password, 'date': user.date}
#         print(content)


@app.route('/')
# 目前在本体电脑上启动，试验服务器和数据库是否正常启动
def get_users():
    # with app.app_context():
    #     users = User_account.query.all()
    #     print(users)
    #     for user in users:
    #         content = {'id': user.id, 'user': user.user,
    #                    'password': user.password, 'date': user.date}
    #         print(content)
    return 'hello world'


@app.route('/register', methods=['POST'])
# 注册
def register():
    try:
        data = request.get_json()
        # print(data)
        user = data.get('user')
        password = data.get('password')
        current_date = datetime.now().date()
        # 创建一个新的User_account实例
        new_user = User_account(user=user, password=password, date=current_date)
        db.session.add(new_user)
        db.session.commit()
        user_id = new_user.id
        username = '默认用户'
        sex = '男'
        age = 0
        birth = datetime.now().strftime('%Y-%m')
        is_default = 1
        date = datetime.now().date()
        # 创建一个新的User_account实例
        new_userinfo = User_info(user_id=user_id, username=username, sex=sex, age=age, birth=birth, date=date,
                                 is_default=is_default)
        db.session.add(new_userinfo)
        db.session.commit()
        response = {'code': '200', 'msg': '注册成功'}
        # print(response)
        return jsonify(response), 200
    except IntegrityError:
        response = {'code': '401', 'msg': '账号已存在'}
        # print(response)
        return jsonify(response), 200
        # 处理异常（如果有）
    except AttributeError as ae:
        print(f"AttributeError occurred: {ae}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500
    except TypeError as te:
        print(f"TypeError occurred: {te}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500
    except Exception as e:
        print(f"Exception during forget: {e}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500


@app.route('/forget', methods=['POST'])
# 忘记密码第一步
def forget():
    try:
        data = request.get_json()
        user = data.get('user')
        users = User_account.query.filter_by(user=user).first()
        if users:
            response = {'code': '200', 'msg': user}
        else:
            response = {'code': '401', 'msg': '没有该用户'}
        return jsonify(response)
        # 处理异常（如果有）
    except AttributeError as ae:
        print(f"AttributeError occurred: {ae}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500
    except TypeError as te:
        print(f"TypeError occurred: {te}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500
    except Exception as e:
        print(f"Exception during forget: {e}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500


@app.route('/forget2', methods=['POST'])
# 忘记密码第二步
def forget2():
    try:
        data = request.get_json()
        # print(data)
        user = data.get('user')
        username = data.get('username')
        users = User_account.query.filter_by(user=user).first()

        if users:
            userinfos = User_info.query.filter_by(user_id=users.id, is_default=1).first()
            if userinfos:
                if username == userinfos.username:
                    users.password = data.get('password')
                    db.session.commit()
                    response = {'code': '200', 'msg': '成功'}
                else:
                    response = {'code': '401', 'msg': '用户名错误'}
            else:
                response = {'code': '401', 'msg': '用户名错误'}
        else:
            response = {'code': '400', 'msg': '没有该用户'}
        return jsonify(response)
    # 处理异常（如果有）
    except AttributeError as ae:
        print(f"AttributeError occurred: {ae}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500
    except TypeError as te:
        print(f"TypeError occurred: {te}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500
    except Exception as e:
        print(f"Exception during forget: {e}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500


@app.route('/getinfo', methods=['GET'])
@jwt_required()
# 获取用户信息
def getinfo():
    try:
        user_id = get_jwt_identity()
        users = User_info.query.filter_by(user_id=user_id).all()
        user_info_list = []
        if users:
            for user in users:
                user_info = {
                    'info_id': user.info_id,
                    'username': user.username,
                    'sex': user.sex,
                    'age': user.age,
                    'birth': user.birth,
                    'date': user.date
                }
                user_info_list.append(user_info)
            # print(user_info_list)
            response = {'code': '200', 'data': user_info_list}
            return jsonify(response)
        else:
            response = {'code': '300', 'msg': '没有信息'}
            return jsonify(response)
        # 处理异常（如果有）
    except AttributeError as ae:
        print(f"AttributeError occurred: {ae}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500
    except TypeError as te:
        print(f"TypeError occurred: {te}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500
    except Exception as e:
        print(f"Exception during forget: {e}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500


@app.route('/getinfo0', methods=['GET'])
@jwt_required()
# 获取用户信息
def getinfo0():
    try:
        user_id = get_jwt_identity()
        user = User_info.query.filter_by(user_id=user_id, is_default=1).first()
        admin = User_account.query.filter_by(id = user_id).first()
        script_path = os.path.abspath(__file__)
        # 获取项目根目录的路径（假设项目的根目录是 src/ 目录的上级目录）
        project_root = os.path.dirname(os.path.dirname(script_path))
        # 使用相对地址并将其存储在变量中
        root0 = os.path.join(project_root, "flaskservice", "result")
        root1 = os.path.join(project_root, "flaskservice", "sickness")
        if user and admin:
            user_info = {
                'user': admin.user,
                'info_id': user.info_id,
                'username': user.username,
                'sex': user.sex,
                'age': user.age,
                'birth': user.birth,
                'date': user.date
            }
            users = User_info.query.filter_by(user_id=user_id).all()
            user_info_list = []
            result_list = []
            if users:
                for user in users:
                    user_info1 = {
                        'info_id': user.info_id,
                        'username': user.username,
                        'sex': user.sex,
                        'age': user.age,
                        'birth': user.birth,
                        'date': user.date,
                        'is_default': user.is_default
                    }
                    results = Result.query.filter_by(info_id=user.info_id).all()
                    if results:
                        results = sorted(results, key=lambda x: x.date, reverse=True)
                        for result in results:
                            sickness_info1 = Sickness.query.filter_by(sickness_id=result.sickness_id1).first()
                            sickness_info2 = Sickness.query.filter_by(sickness_id=result.sickness_id2).first()
                            sickness_info3 = Sickness.query.filter_by(sickness_id=result.sickness_id3).first()
                            img_url1 = sickness_info1.sicknessurl
                            img_url2 = sickness_info2.sicknessurl
                            img_url3 = sickness_info3.sicknessurl
                            with open(root1 + img_url1, 'rb') as f1:
                                img_data1 = f1.read()
                            sicknessimg1 = base64.b64encode(img_data1).decode('utf-8')
                            with open(root1 + img_url2, 'rb') as f2:
                                img_data2 = f2.read()
                            sicknessimg2 = base64.b64encode(img_data2).decode('utf-8')
                            with open(root1 + img_url3, 'rb') as f3:
                                img_data3 = f3.read()
                            sicknessimg3 = base64.b64encode(img_data3).decode('utf-8')
                            resulturl = result.resulturl
                            with open(root0 + f'\\{user_id}' + resulturl, 'rb') as r:
                                img = r.read()
                            resultimg = base64.b64encode(img).decode('utf-8')

                            result_info = {
                                'info_id': user.info_id,
                                'username': user.username,
                                'age': user.age,
                                'sex': user.sex,
                                'date': result.date,
                                'result_id': result.result_id,
                                'resultimg': resultimg,
                                'sicknessimg1': sicknessimg1,
                                "Wsicknessname1": sickness_info1.Wsicknessname,
                                "Csicknessname1": sickness_info1.Csicknessname,
                                "isChinesemedicine1": sickness_info1.isChinesemedicine,
                                "Wsymptoms1": sickness_info1.Wsymptoms,
                                "Csymptoms1": sickness_info1.Csymptoms,
                                "Wcause1": sickness_info1.Wcause,
                                "Ccause1": sickness_info1.Ccause,
                                "Wtreatment1": sickness_info1.Wtreatment,
                                "Ctreatment1": sickness_info1.Ctreatment,
                                "urgency1": sickness_info1.urgency,
                                "probability1": result.probability_1,
                                'sicknessimg2': sicknessimg2,
                                "Wsicknessname2": sickness_info2.Wsicknessname,
                                "Csicknessname2": sickness_info2.Csicknessname,
                                "isChinesemedicine2": sickness_info2.isChinesemedicine,
                                "Wsymptoms2": sickness_info2.Wsymptoms,
                                "Csymptoms2": sickness_info2.Csymptoms,
                                "Wcause2": sickness_info2.Wcause,
                                "Ccause2": sickness_info2.Ccause,
                                "Wtreatment2": sickness_info2.Wtreatment,
                                "Ctreatment2": sickness_info2.Ctreatment,
                                "urgency2": sickness_info2.urgency,
                                "probability2": result.probability_2,
                                'sicknessimg3': sicknessimg3,
                                "Wsicknessname3": sickness_info3.Wsicknessname,
                                "Csicknessname3": sickness_info3.Csicknessname,
                                "isChinesemedicine3": sickness_info3.isChinesemedicine,
                                "Wsymptoms3": sickness_info3.Wsymptoms,
                                "Csymptoms3": sickness_info3.Csymptoms,
                                "Wcause3": sickness_info3.Wcause,
                                "Ccause3": sickness_info3.Ccause,
                                "Wtreatment3": sickness_info3.Wtreatment,
                                "Ctreatment3": sickness_info3.Ctreatment,
                                "urgency3": sickness_info3.urgency,
                                "probability3": result.probability_3
                            }
                            result_list.append(result_info)
                    user_info_list.append(user_info1)
                response = {'code': '200', 'data': user_info, 'infoman': user_info_list, 'result': result_list}

                return jsonify(response)
        else:
            response = {'code': '300', 'msg': '没有信息'}
            return jsonify(response)
        # 处理异常（如果有）
    except AttributeError as ae:
        print(f"AttributeError occurred: {ae}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500
    except TypeError as te:
        print(f"TypeError occurred: {te}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500
    except Exception as e:
        print(f"Exception during forget: {e}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500


@app.route('/deleteresult', methods=['POST'])
@jwt_required()
# 删除报告记录
def deleteresult():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        # print(data)
        result_id = data.get('result_id')
        result = Result.query.filter_by(result_id = result_id).first()
        if result:
            user_directory = os.path.join('result', str(user_id))
            # result_url = result.resulturl.replace('\\', os.sep)
            result_url = result.resulturl.replace('\\', '')

            file_path = os.path.join(user_directory, result_url)
            try:
                os.remove(file_path)
            except ValueError:
                response = {'code': '300', 'msg': '没有信息'}
                return jsonify(response), 200
            # print(result.resulturl)
            db.session.delete(result)
            db.session.commit()
            response = {'code':'200','msg':'删除成功'}
        else:
            response = {'code':'300','msg':'没有信息'}
        return jsonify(response),200
    except AttributeError as ae:
        print(f"AttributeError occurred: {ae}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500
    except TypeError as te:
        print(f"TypeError occurred: {te}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500
    except Exception as e:
        print(f"Exception during forget: {e}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500

@app.route('/deleteuser', methods=['POST'])
@jwt_required()
# 删除非默认用户
def deleteuser():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        # print(data)
        info_id = data.get('info_id')
        info = User_info.query.filter_by(info_id = info_id).first()
        if info:
            results = Result.query.filter_by(info_id = info.info_id).all()
            if results:
                user_directory = os.path.join('result', str(user_id))
                for result in results:
                    # result_url = result.resulturl.replace('\\', os.sep)
                    result_url = result.resulturl.replace('\\', '')
                    file_path = os.path.join(user_directory, result_url)
                    try:
                        os.remove(file_path)
                    except ValueError:
                        response = {'code': '300', 'msg': '没有信息'}
                        return jsonify(response), 200
                    # db.session.delete(result)
                    #数据库设置的当Info删除 相应的result也删除，这也不是异步执行 所以 可以不用写
            db.session.delete(info)
            db.session.commit()
            response = {'code': '200', 'msg': '删除成功'}
        else:
            response = {'code': '300', 'msg': '没有信息'}
        return jsonify(response), 200
    except AttributeError as ae:
        print(f"AttributeError occurred: {ae}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500
    except TypeError as te:
        print(f"TypeError occurred: {te}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500
    except Exception as e:
        print(f"Exception during forget: {e}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500


@app.route('/adduser', methods=['POST'])
@jwt_required()
# 添加用户
def adduser():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        # print(data)
        username = data.get('username')
        sex = data.get('sex')
        age = data.get('age')
        birth = data.get('birth')
        is_default = data.get('is_default')
        date = datetime.now().date()
        # 创建一个新的User_account实例
        new_userinfo = User_info(user_id=user_id, username=username, sex=sex, age=age, birth=birth, date=date,
                                 is_default=is_default)
        db.session.add(new_userinfo)
        db.session.commit()
        id = new_userinfo.info_id
        response = {'code': '200', 'msg': '成功','data':id}
        # print(response)
        return jsonify(response), 200
        # 处理异常（如果有）
    except AttributeError as ae:
        print(f"AttributeError occurred: {ae}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500
    except TypeError as te:
        print(f"TypeError occurred: {te}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500
    except Exception as e:
        print(f"Exception during forget: {e}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500


@app.route('/changeuser', methods=['POST'])
@jwt_required()
# 添加用户
def changeuser():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        # print(data)
        info_id = data.get('info_id')
        username = data.get('username')
        sex = data.get('sex')
        age = data.get('age')
        birth = data.get('birth')
        is_default = data.get('is_default')

        user_info = User_info.query.filter_by(info_id=info_id, user_id=user_id).first()
        if user_info:
            user_info.username = username
            user_info.sex = sex
            user_info.age = age
            user_info.birth = birth
            user_info.is_default = is_default
            db.session.commit()
            response = {'code': '200', 'msg': '成功'}
            return jsonify(response), 200
        # 处理异常（如果有）
    except AttributeError as ae:
        print(f"AttributeError occurred: {ae}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500
    except TypeError as te:
        print(f"TypeError occurred: {te}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500
    except Exception as e:
        print(f"Exception during forget: {e}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500


@app.route('/skinrecognition', methods=['POST'])
@jwt_required()
# 皮肤识别
def skinrecognition():
    try:
        user_id = get_jwt_identity()
        file = request.files['file']
        user_directory = f'lession/{user_id}'
        if not os.path.exists(user_directory):
            os.makedirs(user_directory)
        datetime_str = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
        file.save(f'{user_directory}/{datetime_str}.jpg')
        files = os.listdir(user_directory)
        current_time = datetime.now()
        for file in files:
            # 检查文件是否以'.jpg'结尾
            if file.endswith('.jpg'):
                # 构建完整的文件路径
                file_path = os.path.join(user_directory, file)
                # 删除文件
                try:
                    # 从文件名中提取时间信息，假设文件名中时间部分位于前面
                    file_time = datetime.strptime(file.split('.')[0], "%Y-%m-%d_%H-%M-%S")
                    # 计算文件的创建时间与当前时间的差值
                    time_difference = (current_time - file_time).total_seconds() / 60
                    # 如果时间差超过10分钟，则删除文件,为防止网络带宽拥挤 设置为15
                    if time_difference > 15:
                        os.remove(file_path)
                        print(f"Deleted: {file_path}")
                except ValueError:
                    continue
        with torch.no_grad():

            source = f'{user_directory}/{datetime_str}.jpg'
            source = str(source)
            xywh = detect(models1, models2, source, line_thickness)
        # print(xywh)

        if xywh != False:
            if len(xywh):
                response = {'code': '200', 'data': xywh}
            else:
                response = {'code': '201', 'data': xywh}
        else:
            response = {'code': '300', 'data': False}
        # print(response)
        return jsonify(response)
        # 处理异常（如果有）
    except AttributeError as ae:
        print(f"AttributeError occurred: {ae}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500
    except TypeError as te:
        print(f"TypeError occurred: {te}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500
    except Exception as e:
        print(f"Exception during forget: {e}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500


# 最终检测结果
@app.route('/skindataest', methods=['POST'])
@jwt_required()
def skindataest():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        info_id = data.get('info_id')
        sex = data.get('sex')
        age = data.get('age')
        position = data.get('position')
        x = data.get('x')
        y = data.get('y')
        w = data.get('w')
        h = data.get('h')
        model_id = data.get('model')
        print(model_id)
        use_model = model_select(allModels, model_id)
        category = Model.query.filter_by(model_id = model_id).first().category
        print('category',category)
        xywh = [x, y, w, h]
        user_directory = f'lession/{user_id}'
        if os.path.exists(user_directory):
            files = [os.path.join(user_directory, file) for file in os.listdir(user_directory)]
            files.sort(key=os.path.getmtime, reverse=True)
            latest_file = files[0] if files else None
            if latest_file:
                file_name = os.path.basename(latest_file)
                creation_time = datetime.fromtimestamp(os.path.getmtime(latest_file))
                image = cv2.imread(f'lession/{user_id}/{file_name}')

                gn1 = torch.tensor(image.shape)[[1, 0, 1, 0]]
                # print(f"最新的文件名: {file_name}")
                # print(f"创建时间: {creation_time}")
                xyxy = xywh2xyxy(torch.tensor(xywh).view(1, 4) * gn1).long().view(
                    -1).tolist()
                image1 = image[xyxy[1]:xyxy[3], xyxy[0]:xyxy[2]]
                image1 = Image.fromarray(cv2.cvtColor(image1, cv2.COLOR_BGR2RGB))
                if category == 'E':
                    val_pipeline = get_val_pipeline_by_id(model_id)
                    output = Ev2Predict(use_model, image1, val_pipeline)
                else:

                    output = predict(use_model, image1)
                #
                top_out = all_work(output, sex, age, position)
                top_out = format(top_out)
                # print('好嗲：',top_out)
                data_dict = eval(top_out)  # 将字符串解析为字典
                keys_list = list(data_dict.keys())  # 提取字典中的键
                values_list = list(data_dict.values())  # 提取字典中的值
                # print(keys_list)
                # print(values_list)
                # 按逗号分割字符串，得到键值对列表

                sickness_list = Sickness.query.filter(Sickness.sickness_id.in_(keys_list)).all()
                sickness_list = sorted(sickness_list, key=lambda x: keys_list.index(x.sickness_id))
                sickness_info_list = []
                script_path = os.path.abspath(__file__)
                # 获取项目根目录的路径（假设项目的根目录是 src/ 目录的上级目录）
                project_root = os.path.dirname(os.path.dirname(script_path))
                # 使用相对地址并将其存储在变量中
                root = os.path.join(project_root, "flaskservice", "sickness")
                date = datetime.now().date()
                for sickness, probability in zip(sickness_list, values_list):
                    img_url = sickness.sicknessurl
                    with open(root + img_url, 'rb') as f:
                        img_data = f.read()
                    img_data_base64 = base64.b64encode(img_data).decode('utf-8')
                    sickness_info_list.append({
                        "sickness_id": sickness.sickness_id,
                        "sicknessurl": img_data_base64,
                        "Wsicknessname": sickness.Wsicknessname,
                        "Csicknessname": sickness.Csicknessname,
                        "isChinesemedicine": sickness.isChinesemedicine,
                        "Wsymptoms": sickness.Wsymptoms,
                        "Csymptoms": sickness.Csymptoms,
                        "Wcause": sickness.Wcause,
                        "Ccause": sickness.Ccause,
                        "Wtreatment": sickness.Wtreatment,
                        "Ctreatment": sickness.Ctreatment,
                        "urgency": sickness.urgency,
                        "probability": probability,
                        "date": date
                    })

                # 获取路径下所有文件和文件夹的列表
                files = os.listdir(user_directory)
                current_time = datetime.now()
                for file in files:
                    # 检查文件是否以'.jpg'结尾
                    if file.endswith('.jpg'):
                        # 构建完整的文件路径
                        file_path = os.path.join(user_directory, file)
                        # 删除文件
                        try:
                            # 从文件名中提取时间信息，假设文件名中时间部分位于前面
                            file_time = datetime.strptime(file.split('.')[0], "%Y-%m-%d_%H-%M-%S")

                            # 计算文件的创建时间与当前时间的差值
                            time_difference = (current_time - file_time).total_seconds() / 60

                            # 如果时间差超过十分钟，则删除文件 为防止网络带宽拥挤 设置为15
                            if time_difference > 15:
                                os.remove(file_path)
                                print(f"Deleted: {file_path}")

                        except ValueError:
                            continue
                user_directory = os.path.join('result', str(user_id))
                if not os.path.exists(user_directory):
                    os.makedirs(user_directory)

                datetime_str = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
                cv2.imwrite(f'{user_directory}/{datetime_str}.jpg', image)
                new_result = Result(info_id=info_id, sickness_id1=sickness_list[0].sickness_id,
                                    probability_1=values_list[0],
                                    sickness_id2=sickness_list[1].sickness_id,
                                    probability_2=values_list[1],
                                    sickness_id3=sickness_list[2].sickness_id, date=date,
                                    probability_3=values_list[2],
                                    resulturl=f'\\\\{datetime_str}.jpg')
                db.session.add(new_result)
                count_object = Count.query.first()
                if count_object:
                    count_object.count +=1
                db.session.commit()
                response = {'code': '200', 'msg': '登录成功', 'data': sickness_info_list}

                # print(response)
                return jsonify(response)
        response = {'code': '401', 'msg': '错误'}
        return jsonify(response)
        # 处理异常（如果有）
    except AttributeError as ae:
        print(f"AttributeError occurred: {ae}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500
    except TypeError as te:
        print(f"TypeError occurred: {te}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500
    except Exception as e:
        print(f"Exception during forget: {e}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500

@app.route('/count', methods=['GET'])
# 获取测评人次
def count():
    try:
        counts = Count.query.first()
        if counts:
            count = counts.count
            response = {'code':'200','msg':'获取成功','data':count}
        else:
            response = {'code': '300', 'msg': '没有信息'}
        return jsonify(response)
    except AttributeError as ae:
        print(f"AttributeError occurred: {ae}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500
    except TypeError as te:
        print(f"TypeError occurred: {te}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500
    except Exception as e:
        print(f"Exception during forget: {e}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500

@app.route('/model', methods=['GET'])
# 获取模型信息
def model():
    try:
        models = Model.query.all()
        model_list = [{
            'value': m.model_id,
            'text': f"{m.model_name} （推荐）" if m.recommend == 1 else m.model_name,
            'recommend': m.recommend
        } for m in models]
        # 按 recommend 排序，1 在前，0 在后
        model_list.sort(key=lambda x: x['recommend'], reverse=True)
        print(model_list)
        response = {'code':'200','msg':'获取成功','data':model_list}
        return jsonify(response)
    except AttributeError as ae:
        print(f"AttributeError occurred: {ae}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500
    except TypeError as te:
        print(f"TypeError occurred: {te}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500
    except Exception as e:
        print(f"Exception during forget: {e}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500

@app.route('/login', methods=['POST'])
# 登录
def login():
    try:
        # 假设您在请求中接收到JSON数据
        data = request.get_json()
        # print(data)
        # 从接收到的数据中获取用户名和密码
        user = data.get('user')
        password = data.get('password')

        users = User_account.query.filter_by(user=user).first()

        # print(users)
        # 验证凭据（您应该用实际的身份验证逻辑替换这部分）
        if users:
            if users.password == password:
                deviceid = data.get('deviceid')

                if users.deviceid != deviceid:
                    # print('设备id：', deviceid)
                    users.deviceid = deviceid
                    db.session.commit()
                access_token = create_access_token(identity=users.id)
                refresh_token = create_refresh_token(identity=users.id)

                # access_token = create_access_token(identity=users.id, expires_delta=timedelta(days=30))
                # print(access_token)
                user_data = {'access_token': access_token, 'refresh_token': refresh_token}
                response = {'code': '200', 'msg': '登录成功', 'data': user_data}
            else:
                response = {'code': '401', 'msg': '账号或密码错误'}
        else:
            response = {'code': '401', 'msg': '账号或密码错误'}

        return jsonify(response)

    # 处理异常（如果有）
    except AttributeError as ae:
        print(f"AttributeError occurred: {ae}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500
    except TypeError as te:
        print(f"TypeError occurred: {te}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500
    except Exception as e:
        print(f"Exception during forget: {e}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500


@app.route('/devicelogin', methods=['POST'])
@jwt_required()
def device():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        deviceid = data.get('deviceid')
        users = User_account.query.filter_by(id=user_id).first()
        if users:
            if users.deviceid == deviceid:
                # print('相同')
                response = {'code': '200'}
            else:
                response = {'code': '300'}
            return jsonify(response)
        # 处理异常（如果有）
    except AttributeError as ae:
        print(f"AttributeError occurred: {ae}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500
    except TypeError as te:
        print(f"TypeError occurred: {te}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500
    except Exception as e:
        print(f"Exception during forget: {e}")
        return jsonify({'code': '500', 'msg': '服务器错误'}), 500


@jwt.expired_token_loader
# 过期token
def expired_token_callback(jwt_header, jwt_data):
    response = {'code': '401', 'msg': '登录已过期'}
    return jsonify(response), 401


@jwt.invalid_token_loader
# 错误token
def error_token_callback(jwt_header, jwt_data=None):
    response = {'code': '422', 'msg': '登录错误'}
    return jsonify(response), 422


@app.route("/refresh", methods=["GET"])
@jwt_required(refresh=True)
# 使用刷新JWT来获取普通JWT
def refresh():
    current_user = get_jwt_identity()
    access_token = create_access_token(identity=current_user)
    # print(access_token)
    response = {'code': '200', 'data': access_token}
    return jsonify(response)


@app.route('/protected', methods=['GET'])
@jwt_required()
# 验证token
def protected():
    try:
        # 使用 get_jwt_identity 访问当前用户的身份
        current_user = get_jwt_identity()
        print(current_user)
        response = {'code': '200', 'data': current_user}
        return jsonify(response)
    except Exception as e:
        print(f"Exception during login: {e}")
        response = {'code': '500', 'msg': 'Server error'}
        return jsonify(response)


if __name__ == '__main__':
    app.run(host='172.19.117.149', port=5000)

# 后端增删在新一个表里 添加不往数据库做触发器 +1 -1
