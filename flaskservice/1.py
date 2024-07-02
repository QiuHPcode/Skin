# // 给定的日期字符串
# const dateString = "Thu, 04 Jan 2024 00:00:00 GMT";
#
# // 创建 Date 对象
# const dateObject = new Date(dateString);
#
# // 获取年、月、日
# const year = dateObject.getFullYear();
# // 月份加 1，因为月份是从 0 开始计数的
# const month = (dateObject.getMonth() + 1);
# const day = dateObject.getDate();
#
# // 将月份转换为对应的汉字
# const monthInChinese = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
# const monthChinese = monthInChinese[month - 1];
#
# // 格式化日期
# const formattedDate = `${year}年${monthChinese}月${day}日`;
#
# console.log(formattedDate);  // 输出：2024年1月4日
from datetime import datetime

import os
#
# import cv2
#
# 获取当前脚本的绝对路径
script_path = os.path.abspath(__file__)

# 获取项目根目录的路径（假设项目的根目录是 src/ 目录的上级目录）
project_root = os.path.dirname(os.path.dirname(script_path))
print(project_root)
# 使用相对地址并将其存储在变量中
root = os.path.join(project_root, "flaskservice","sickness")
print("项目的相对地址:", root+'\\10.jpg')
# image=cv2.imread(f'{root}\\10.jpg')
# cv2.imshow('0',image)
# cv2.waitKey(0)
# cv2.destroyAllWindows()
# 打印相对地址

# for i in range(72):
#     filename = f"root\\\\{i}.jpg"
#     print(filename)
# date = datetime.now().strftime('%Y-%m')
# print(date)
import os
from datetime import datetime

# 用户目录路径
user_id = 37
user_directory = f'lession/{user_id}'

# 检查用户目录是否存在
# if os.path.exists(user_directory):
#     # 获取用户目录下所有文件的路径
#     files = [os.path.join(user_directory, file) for file in os.listdir(user_directory)]
#
#     # 按照文件的创建时间进行排序
#     files.sort(key=os.path.getmtime, reverse=True)
#
#     # 获取最新的文件路径
#     latest_file = files[0] if files else None
#
#     if latest_file:
#         # 提取文件名
#         file_name = os.path.basename(latest_file)
#         # 提取文件创建时间
#         creation_time = datetime.fromtimestamp(os.path.getmtime(latest_file))
#
#         print(f"最新的文件名: {file_name}")
#         print(f"创建时间: {creation_time}")
#     else:
#         print("用户目录下没有文件")
# else:
#     print("用户目录不存在")
import io
# from PIL import Image
# img_url = f'lession/{user_id}/2024-03-22_14-17-33.jpg'
# with open(img_url, 'rb') as f:
#     a = f.read()
# img_stream = io.BytesIO(a)
# img = Image.open(img_stream)
# imgByteArr = io.BytesIO()
# img.save(imgByteArr, format='JPEG')
# imgByteArr = imgByteArr.getvalue()
# print(imgByteArr)
# user_directory = f'lession/37'

# 检查路径是否存在
# if os.path.exists(user_directory):
#     # 获取路径下所有文件和文件夹的列表
#     files = os.listdir(user_directory)
#     for file in files:
#         # 检查文件是否以'.jpg'结尾
#         if file.endswith('.jpg'):
#             # 构建完整的文件路径
#             file_path = os.path.join(user_directory, file)
#             # 删除文件
#             os.remove(file_path)
#             print(f"Deleted: {file_path}")
# else:
#     print(f"Directory '{user_directory}' does not exist.")

str = '2024-03-30_16-00-58.jpg'
file = str.split('.')[0]
filetime = datetime.strptime(file,"%Y-%m-%d_%H-%M-%S")
print('filetime',filetime)
current_time = datetime.now()
print("current_time",current_time)
time_difference = (current_time - filetime).total_seconds() / 60
print(time_difference)
if time_difference > 10:
    print('删除')