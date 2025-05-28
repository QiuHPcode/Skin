<template>
	<view id="viewd" style="width: 100%;">
		<view style="height: 10vh; background-color: aqua; display: contents; ">
		    <view style="display: flex; flex-direction: row; align-items: center;  padding-top: 2vh;">
		        <view style="font-size: 40rpx; padding-left: 1.5vh;white-space: nowrap;  overflow: hidden;text-overflow: ellipsis;">
		            <text style="color: #8b8b8b; white-space: nowrap;">病发位于:</text>
					<text style="color: #8366c8; padding-left: 2vh; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"></text>
		        </view>
		        <view style="justify-content: flex-end; margin-left: auto; padding-right: 1vh; ">
		            <text :style="{color: ischose? '#8366c8':'#bfbfbf' , 'white-space': 'nowrap' }" @click="deleteall">清空选项</text>
		        </view>
		    </view>
		    <view style=" font-size: 24rpx; padding-top: 1vh;padding-bottom: 1vh;padding-left: 1.5vh;border-bottom: 2rpx solid #9f9f9f;">
		        <text style="color: #bfbfbf;">请在下图中点击选择皮损发病部位，可多选*</text>
		    </view>
		</view>
		<view v-if="form.sex == '男'" >
			<view v-if="opposite" style="height: 65vh; width: 100%; background-color: #fff; display: flex; justify-content: center; align-items: center; overflow: hidden; ">
				<image class="image" src="../../static/humam/man1.jpg" mode="aspectFit" style="height: 100%; width: 100%;" @load="imageLoad"></image>
				<canvas :style="{position: 'absolute' , width: '15%' , height: '12%' , top: canvastop + '%'}" @click="canvas(0)"></canvas>
				<canvas :style="{position: 'absolute' , width: '18%' , height: '17%' , top: canvastop+12 + '%'}" @click="canvas(1)"></canvas>
				<canvas :style="{position: 'absolute' , width: '10%' , height: '4%' , top: canvastop+29 + '%',left:'45%'}" @click="canvas(2)"></canvas>
				<canvas :style="{position: 'absolute' , width: '5%' , height: '4%' , top: canvastop+29 + '%',left:'40%'}" @click="canvas(3)"></canvas>
				<canvas :style="{position: 'absolute' , width: '10%' , height: '32%' , top: canvastop+33 + '%',left:'40%'}" @click="canvas(3)"></canvas>
				<canvas :style="{position: 'absolute' , width: '5%' , height: '4%' , top: canvastop+29 + '%',left:'55%'}" @click="canvas(3)"></canvas>
				<canvas :style="{position: 'absolute' , width: '10%' , height: '32%' , top: canvastop+33 + '%',left:'51%'}" @click="canvas(3)"></canvas>
				<canvas :style="{position: 'absolute' , width: '22%' , height: '26%' , top: canvastop+12 + '%',left:'19%'}" @click="canvas(4)"></canvas>
				<canvas :style="{position: 'absolute' , width: '22%' , height: '26%' , top: canvastop+12 + '%',left:'59%'}" @click="canvas(4)"></canvas>
			</view>
			<view v-else-if="!opposite" style="height: 65vh; width: 100%; background-color: #fff; display: flex; justify-content: center; align-items: center;">
				<image class="image" src="../../static/humam/man2.jpg" mode="aspectFit" style="height: 100%; width: 100%; " @load="imageLoad"></image>
				<canvas :style="{position: 'absolute' , width: '15%' , height: '12%' , top: canvastop + '%'}" @click="canvas(0)"></canvas>
				<canvas :style="{position: 'absolute' , width: '18%' , height: '23%' , top: canvastop+12 + '%'}" @click="canvas(1)"></canvas>
				<canvas :style="{position: 'absolute' , width: '10%' , height: '30%' , top: canvastop+35 + '%',left:'40%'}" @click="canvas(3)"></canvas>
				<canvas :style="{position: 'absolute' , width: '10%' , height: '30%' , top: canvastop+35 + '%',left:'51%'}" @click="canvas(3)"></canvas>
				<canvas :style="{position: 'absolute' , width: '22%' , height: '26%' , top: canvastop+12 + '%',left:'19%'}" @click="canvas(4)"></canvas>
				<canvas :style="{position: 'absolute' , width: '22%' , height: '26%' , top: canvastop+12 + '%',left:'59%'}" @click="canvas(4)"></canvas>
			</view>
		</view>
		<view v-if="form.sex == '女'">
			<view v-if="opposite" style="height: 65vh; width: 100%; background-color: #fff; display: flex; justify-content: center; align-items: center; overflow: hidden; ">
				<image class="image" src="../../static/humam/woman1.jpg" mode="aspectFit" style="height: 100%; width: 100%;" @load="imageLoad"></image>
				<canvas :style="{position: 'absolute' , width: '15%' , height: '12%' , top: canvastop + '%'}" @click="canvas(0)"></canvas>
				<canvas :style="{position: 'absolute' , width: '17%' , height: '17%' , top: canvastop+12 + '%'}" @click="canvas(1)"></canvas>
				<canvas :style="{position: 'absolute' , width: '10%' , height: '4%' , top: canvastop+29 + '%',left:'45%'}" @click="canvas(2)"></canvas>
				<canvas :style="{position: 'absolute' , width: '5%' , height: '4%' , top: canvastop+29 + '%',left:'40%'}" @click="canvas(3)"></canvas>
				<canvas :style="{position: 'absolute' , width: '10%' , height: '32%' , top: canvastop+33 + '%',left:'40%'}" @click="canvas(3)"></canvas>
				<canvas :style="{position: 'absolute' , width: '5%' , height: '4%' , top: canvastop+29 + '%',left:'55%'}" @click="canvas(3)"></canvas>
				<canvas :style="{position: 'absolute' , width: '10%' , height: '32%' , top: canvastop+33 + '%',left:'51%'}" @click="canvas(3)"></canvas>
				<canvas :style="{position: 'absolute' , width: '20%' , height: '25%' , top: canvastop+12 + '%',left:'21%'}" @click="canvas(4)"></canvas>
				<canvas :style="{position: 'absolute' , width: '20%' , height: '25%' , top: canvastop+12 + '%',left:'59%'}" @click="canvas(4)"></canvas>
			</view>
			<view v-else-if="!opposite" style="height: 65vh; width: 100%; background-color: #fff; display: flex; justify-content: center; align-items: center;">
				<image class="image" src="../../static/humam/woman2.jpg" mode="aspectFit" style="height: 100%; width: 100%;" @load="imageLoad"></image>
				<canvas :style="{position: 'absolute' , width: '15%' , height: '12%' , top: canvastop + '%'}" @click="canvas(0)"></canvas>
				<canvas :style="{position: 'absolute' , width: '18%' , height: '23%' , top: canvastop+12 + '%'}" @click="canvas(1)"></canvas>
				<canvas :style="{position: 'absolute' , width: '10%' , height: '30%' , top: canvastop+35 + '%',left:'40%'}" @click="canvas(3)"></canvas>
				<canvas :style="{position: 'absolute' , width: '10%' , height: '30%' , top: canvastop+35 + '%',left:'51%'}" @click="canvas(3)"></canvas>
				<canvas :style="{position: 'absolute' , width: '20%' , height: '25%' , top: canvastop+12 + '%',left:'21%'}" @click="canvas(4)"></canvas>
				<canvas :style="{position: 'absolute' , width: '20%' , height: '25%' , top: canvastop+12 + '%',left:'59%'}" @click="canvas(4)"></canvas>
			</view>
		</view>
		<uni-popup ref="popup"  >
			<view class="info1">
				<view  style="height: 25%; padding-left: 5%; padding-right: 5%; align-items: center; display: flex; font-size: 30rpx;">
					<text style="color: #bfbfbf; white-space: nowrap;">请选择具体部位，可多选</text>
					<text style="color: #8366c8; white-space: nowrap;">*</text>
				</view>
				<view v-if="form.sex=='男'">
					<view  v-if="opposite">
						<view v-if="clicknum==0" style="display: flex; flex-wrap: wrap; width: 100 %; height: 75%; justify-content: center;">
							<view style="width: 33%; height: 20%; padding-bottom: 5%; padding-top: 3%;">
								<button  :class="positionx[0]==0 ? 'bt0':'bt1' " @click="btclick(0)" >头皮</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;  padding-top: 3%;">
								<button :class="positionx[1]==0 ? 'bt0':'bt1' " @click= "btclick(1)">前额</button>
							</view>
							<view style="width: 33%; height: 20%;  padding-bottom: 5%;  padding-top: 3%;">
								<button :class="positionx[2]==0 ? 'bt0':'bt1' " @click= "btclick(2)">耳朵</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;  padding-top: 3%;">
								<button :class="positionx[3]==0 ? 'bt0':'bt1' " @click= "btclick(3)">眼部</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;  padding-top: 3%;">
								<button :class="positionx[4]==0 ? 'bt0':'bt1' " @click= "btclick(4)">面颊</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;  padding-top: 3%;">
								<button :class="positionx[5]==0 ? 'bt0':'bt1' " @click= "btclick(5)">口部</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;  padding-top: 3%;">
								<button :class="positionx[6]==0 ? 'bt0':'bt1' " @click= "btclick(6)">下巴</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;  padding-top: 3%;">
								<button :class="positionx[7]==0 ? 'bt0':'bt1' " @click= "btclick(7)">颈部</button>
							</view>
						</view>
						<view v-if="clicknum==1" style="display: flex; flex-wrap: wrap; width: 100 %; height: 75%; justify-content: center; ">
							<view style="width: 50%; height: 20%; padding-bottom: 5%; padding-top: 3%;">
								<button  :class="positionx[8]==0 ? 'bt0':'bt1' " @click="btclick(8)" >胸部</button>
							</view>
							<view style="width: 50%; height: 20%; padding-bottom: 5%;  padding-top: 3%;">
								<button :class="positionx[9]==0 ? 'bt0':'bt1'"  @click= "btclick(9)">乳头乳晕</button>
							</view>
							<view style="width: 50%; height: 20%;  padding-bottom: 5%;  padding-top: 3%;">
								<button :class="positionx[10]==0 ? 'bt0':'bt1' " @click= "btclick(10)">腹部</button>
							</view>
						</view>
						<view v-if="clicknum==3" style="display: flex; flex-wrap: wrap; width: 100 %; height: 75%; justify-content: center; ">
							<view style="width: 33%; height: 20%;  padding-top: 3%;">
								<button  :class="positionx[11]==0 ? 'bt0':'bt1' " @click="btclick(11)" >大腿</button>
							</view>
							<view style="width: 40%; height: 20%; padding-top: 3%;">
								<button :class="positionx[12]==0 ? 'bt0':'bt1'"  @click= "btclick(12)">膝关节</button>
							</view>
							<view style="width: 33%; height: 20%;   padding-top: 3%;">
								<button :class="positionx[13]==0 ? 'bt0':'bt1' " @click= "btclick(13)">小腿</button>
							</view>
							<view style="width: 33%; height: 20%;    padding-top: 3%;">
								<button :class="positionx[14]==0 ? 'bt0':'bt1' " @click= "btclick(14)">足踝</button>
							</view>
							<view style="width: 33%; height: 20%;    padding-top: 3%;">
								<button :class="positionx[15]==0 ? 'bt0':'bt1' " @click= "btclick(15)">脚背</button>
							</view>
							<view style="width: 33%; height: 20%;   padding-top: 3%;">
								<button :class="positionx[16]==0 ? 'bt0':'bt1' " @click= "btclick(16)">脚趾</button>
							</view>
							<view style="width: 40%; height: 20%;    padding-top: 3%;">
								<button :class="positionx[17]==0 ? 'bt0':'bt1' " @click= "btclick(17)">脚趾缝</button>
							</view>
							<view style="width:40%; height: 20%;    padding-top: 3%;">
								<button :class="positionx[18]==0 ? 'bt0':'bt1' " @click= "btclick(18)">脚趾甲</button>
							</view>
							
						</view>
						<view v-if="clicknum==4" style="display: flex; flex-wrap: wrap; width: 100 %; height: 75%; justify-content: center;">
							<view style="width: 33%; height: 20%; padding-bottom: 5%;">
								<button  :class="positionx[19]==0 ? 'bt0':'bt1' " @click="btclick(19)" >腋窝</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%; ">
								<button :class="positionx[20]==0 ? 'bt0':'bt1' " @click= "btclick(20)">上臂</button>
							</view>
							<view style="width: 40%; height: 20%;  padding-bottom: 5%;">
								<button :class="positionx[21]==0 ? 'bt0':'bt1' " @click= "btclick(21)">肘关节</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;">
								<button :class="positionx[22]==0 ? 'bt0':'bt1' " @click= "btclick(22)">前臂</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;">
								<button :class="positionx[23]==0 ? 'bt0':'bt1' " @click= "btclick(23)">手腕</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;">
								<button :class="positionx[24]==0 ? 'bt0':'bt1' " @click= "btclick(24)">手掌</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;">
								<button :class="positionx[25]==0 ? 'bt0':'bt1' " @click= "btclick(25)">手指</button>
							</view>
							<view style="width: 40%; height: 20%; padding-bottom: 5%;">
								<button :class="positionx[26]==0 ? 'bt0':'bt1' " @click= "btclick(26)">手指缝</button>
							</view>
						</view>
						<view v-if="clicknum==2" style="display: flex; flex-wrap: wrap; width: 100 %; height: 75%; justify-content: center;">
							<view style="width: 40%; height: 20%; padding-bottom: 5%;  padding-top: 3%;">
								<button :class="positionx[34]==0 ? 'bt0':'bt1' " @click= "btclick(34)">腹股沟</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;  padding-top: 3%;">
								<button :class="positionx[35]==0 ? 'bt0':'bt1' " @click= "btclick(35)">会阴</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;  padding-top: 3%;">
								<button :class="positionx[36]==0 ? 'bt0':'bt1' " @click= "btclick(36)">肛周</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;  padding-top: 3%;">
								<button :class="positionx[37]==0 ? 'bt0':'bt1' " @click= "btclick(37)">龟头</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;  padding-top: 3%;">
								<button :class="positionx[38]==0 ? 'bt0':'bt1' " @click= "btclick(38)">阴茎</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;  padding-top: 3%;">
								<button :class="positionx[39]==0 ? 'bt0':'bt1' " @click= "btclick(39)">阴囊</button>
							</view>
							
						</view>
					</view>
					<view v-else>
						<view v-if="clicknum==0" style="display: flex; flex-wrap: wrap; width: 100 %; height: 75%; justify-content: center;">
							<view style="width: 33%; height: 20%; padding-bottom: 5%; padding-top: 3%;">
								<button  :class="positionx[0]==0 ? 'bt0':'bt1' " @click="btclick(0)" >头皮</button>
							</view>
							<view style="width: 33%; height: 20%;  padding-bottom: 5%;  padding-top: 3%;">
								<button :class="positionx[2]==0 ? 'bt0':'bt1' " @click= "btclick(2)">耳朵</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;  padding-top: 3%;">
								<button :class="positionx[7]==0 ? 'bt0':'bt1' " @click= "btclick(7)">颈部</button>
							</view>
						</view>
						<view v-if="clicknum==1" style="display: flex; flex-wrap: wrap; width: 100 %; height: 75%; justify-content: center;">
							<view style="width: 50%; height: 20%; padding-bottom: 5%; padding-top: 3%;">
								<button :class="positionx[27]==0 ? 'bt0':'bt1' " @click= "btclick(27)">背部</button>
							</view>
							<view style="width: 50%; height: 20%; padding-bottom: 5%; padding-top: 3%;">
								<button :class="positionx[28]==0 ? 'bt0':'bt1' " @click= "btclick(28)">臀部</button>
							</view>
						</view>
						<view v-if="clicknum==3" style="display: flex; flex-wrap: wrap; width: 100 %; height: 75%; justify-content: center;">
							<view style="width: 33%; height: 20%; padding-bottom: 5%;">
								<button :class="positionx[11]==0 ? 'bt0':'bt1' " @click= "btclick(11)">大腿</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;">
								<button :class="positionx[29]==0 ? 'bt0':'bt1' " @click= "btclick(29)">腘窝</button>
							</view>
							<view style="width: 33%; height: 20%;  padding-bottom: 5%;">
								<button :class="positionx[13]==0 ? 'bt0':'bt1' " @click= "btclick(13)">小腿</button>
							</view>
							<view style="width: 33%; height: 20%;  padding-bottom: 5%;">
								<button :class="positionx[14]==0 ? 'bt0':'bt1' " @click= "btclick(14)">足踝</button>
							</view>
							<view style="width: 40%; height: 20%;  padding-bottom: 5%;">
								<button :class="positionx[30]==0 ? 'bt0':'bt1' " @click= "btclick(30)">脚后跟</button>
							</view>
							<view style="width: 33%; height: 20%;  padding-bottom: 5%;">
								<button :class="positionx[31]==0 ? 'bt0':'bt1' " @click= "btclick(31)">脚底</button>
							</view>
							<view style="width: 33%; height: 20%;   padding-bottom: 5%;">
								<button :class="positionx[16]==0 ? 'bt0':'bt1' " @click= "btclick(16)">脚趾</button>
							</view>
							<view style="width: 40%; height: 20%;    padding-bottom: 5%;">
								<button :class="positionx[17]==0 ? 'bt0':'bt1' " @click= "btclick(17)">脚趾缝</button>
							</view>
						</view>
						<view v-if="clicknum==4" style="display: flex; flex-wrap: wrap; width: 100 %; height: 75%; justify-content: center;">
							<view style="width: 33%; height: 20%; padding-bottom: 5%;">
								<button  :class="positionx[19]==0 ? 'bt0':'bt1' " @click="btclick(19)" >腋窝</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%; ">
								<button :class="positionx[20]==0 ? 'bt0':'bt1' " @click= "btclick(20)">上臂</button>
							</view>
							<view style="width: 40%; height: 20%;  padding-bottom: 5%;">
								<button :class="positionx[21]==0 ? 'bt0':'bt1' " @click= "btclick(21)">肘关节</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;">
								<button :class="positionx[22]==0 ? 'bt0':'bt1' " @click= "btclick(22)">前臂</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;">
								<button :class="positionx[23]==0 ? 'bt0':'bt1' " @click= "btclick(23)">手腕</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;">
								<button :class="positionx[32]==0 ? 'bt0':'bt1' " @click= "btclick(32)">手背</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;">
								<button :class="positionx[25]==0 ? 'bt0':'bt1' " @click= "btclick(25)">手指</button>
							</view>
							<view style="width: 40%; height: 20%; padding-bottom: 5%;">
								<button :class="positionx[26]==0 ? 'bt0':'bt1' " @click= "btclick(26)">手指缝</button>
							</view>
							<view style="width: 40%; height: 20%; padding-bottom: 5%;">
								<button :class="positionx[33]==0 ? 'bt0':'bt1' " @click= "btclick(33)">手指甲</button>
							</view>
						</view>
					</view>
				</view>
				<view v-if="form.sex=='女'">
					<view  v-if="opposite">
						<view v-if="clicknum==0" style="display: flex; flex-wrap: wrap; width: 100 %; height: 75%; justify-content: center;">
							<view style="width: 33%; height: 20%; padding-bottom: 5%; padding-top: 3%;">
								<button  :class="positiony[0]==0 ? 'bt0':'bt1' " @click="btclick(0)" >头皮</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;  padding-top: 3%;">
								<button :class="positiony[1]==0 ? 'bt0':'bt1' " @click= "btclick(1)">前额</button>
							</view>
							<view style="width: 33%; height: 20%;  padding-bottom: 5%;  padding-top: 3%;">
								<button :class="positiony[2]==0 ? 'bt0':'bt1' " @click= "btclick(2)">耳朵</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;  padding-top: 3%;">
								<button :class="positiony[3]==0 ? 'bt0':'bt1' " @click= "btclick(3)">眼部</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;  padding-top: 3%;">
								<button :class="positiony[4]==0 ? 'bt0':'bt1' " @click= "btclick(4)">面颊</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;  padding-top: 3%;">
								<button :class="positiony[5]==0 ? 'bt0':'bt1' " @click= "btclick(5)">口部</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;  padding-top: 3%;">
								<button :class="positiony[6]==0 ? 'bt0':'bt1' " @click= "btclick(6)">下巴</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;  padding-top: 3%;">
								<button :class="positiony[7]==0 ? 'bt0':'bt1' " @click= "btclick(7)">颈部</button>
							</view>
						</view>
						<view v-if="clicknum==1" style="display: flex; flex-wrap: wrap; width: 100 %; height: 75%; justify-content: center; ">
							<view style="width: 50%; height: 20%; padding-bottom: 5%; padding-top: 3%;">
								<button  :class="positiony[8]==0 ? 'bt0':'bt1' " @click="btclick(8)" >胸部</button>
							</view>
							<view style="width: 50%; height: 20%; padding-bottom: 5%;  padding-top: 3%;">
								<button :class="positiony[9]==0 ? 'bt0':'bt1'"  @click= "btclick(9)">乳头乳晕</button>
							</view>
							<view style="width: 50%; height: 20%;  padding-bottom: 5%;  padding-top: 3%;">
								<button :class="positiony[10]==0 ? 'bt0':'bt1' " @click= "btclick(10)">腹部</button>
							</view>
						</view>
						<view v-if="clicknum==3" style="display: flex; flex-wrap: wrap; width: 100 %; height: 75%; justify-content: center; ">
							<view style="width: 33%; height: 20%;  padding-top: 3%;">
								<button  :class="positiony[11]==0 ? 'bt0':'bt1' " @click="btclick(11)" >大腿</button>
							</view>
							<view style="width: 40%; height: 20%; padding-top: 3%;">
								<button :class="positiony[12]==0 ? 'bt0':'bt1'"  @click= "btclick(12)">膝关节</button>
							</view>
							<view style="width: 33%; height: 20%;   padding-top: 3%;">
								<button :class="positiony[13]==0 ? 'bt0':'bt1' " @click= "btclick(13)">小腿</button>
							</view>
							<view style="width: 33%; height: 20%;    padding-top: 3%;">
								<button :class="positiony[14]==0 ? 'bt0':'bt1' " @click= "btclick(14)">足踝</button>
							</view>
							<view style="width: 33%; height: 20%;    padding-top: 3%;">
								<button :class="positiony[15]==0 ? 'bt0':'bt1' " @click= "btclick(15)">脚背</button>
							</view>
							<view style="width: 33%; height: 20%;   padding-top: 3%;">
								<button :class="positiony[16]==0 ? 'bt0':'bt1' " @click= "btclick(16)">脚趾</button>
							</view>
							<view style="width: 40%; height: 20%;    padding-top: 3%;">
								<button :class="positiony[17]==0 ? 'bt0':'bt1' " @click= "btclick(17)">脚趾缝</button>
							</view>
							<view style="width:40%; height: 20%;    padding-top: 3%;">
								<button :class="positiony[18]==0 ? 'bt0':'bt1' " @click= "btclick(18)">脚趾甲</button>
							</view>
							
						</view>
						<view v-if="clicknum==4" style="display: flex; flex-wrap: wrap; width: 100 %; height: 75%; justify-content: center;">
							<view style="width: 33%; height: 20%; padding-bottom: 5%;">
								<button  :class="positiony[19]==0 ? 'bt0':'bt1' " @click="btclick(19)" >腋窝</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%; ">
								<button :class="positiony[20]==0 ? 'bt0':'bt1' " @click= "btclick(20)">上臂</button>
							</view>
							<view style="width: 40%; height: 20%;  padding-bottom: 5%;">
								<button :class="positiony[21]==0 ? 'bt0':'bt1' " @click= "btclick(21)">肘关节</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;">
								<button :class="positiony[22]==0 ? 'bt0':'bt1' " @click= "btclick(22)">前臂</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;">
								<button :class="positiony[23]==0 ? 'bt0':'bt1' " @click= "btclick(23)">手腕</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;">
								<button :class="positiony[24]==0 ? 'bt0':'bt1' " @click= "btclick(24)">手掌</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;">
								<button :class="positiony[25]==0 ? 'bt0':'bt1' " @click= "btclick(25)">手指</button>
							</view>
							<view style="width: 40%; height: 20%; padding-bottom: 5%;">
								<button :class="positiony[26]==0 ? 'bt0':'bt1' " @click= "btclick(26)">手指缝</button>
							</view>
						</view>
						<view v-if="clicknum==2" style="display: flex; flex-wrap: wrap; width: 100 %; height: 75%; justify-content: center;">
							<view style="width: 40%; height: 20%; padding-bottom: 5%;  padding-top: 3%;">
								<button :class="positiony[34]==0 ? 'bt0':'bt1' " @click= "btclick(34)">腹股沟</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;  padding-top: 3%;">
								<button :class="positiony[35]==0 ? 'bt0':'bt1' " @click= "btclick(35)">会阴</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;  padding-top: 3%;">
								<button :class="positiony[36]==0 ? 'bt0':'bt1' " @click= "btclick(36)">肛周</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;  padding-top: 3%;">
								<button :class="positiony[37]==0 ? 'bt0':'bt1' " @click= "btclick(37)">阴唇</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;  padding-top: 3%;">
								<button :class="positiony[38]==0 ? 'bt0':'bt1' " @click= "btclick(38)">阴蒂</button>
							</view>
						</view>
					</view>
					<view v-else>
						<view v-if="clicknum==0" style="display: flex; flex-wrap: wrap; width: 100 %; height: 75%; justify-content: center;">
							<view style="width: 33%; height: 20%; padding-bottom: 5%; padding-top: 3%;">
								<button  :class="positiony[0]==0 ? 'bt0':'bt1' " @click="btclick(0)" >头皮</button>
							</view>
							<view style="width: 33%; height: 20%;  padding-bottom: 5%;  padding-top: 3%;">
								<button :class="positiony[2]==0 ? 'bt0':'bt1' " @click= "btclick(2)">耳朵</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;  padding-top: 3%;">
								<button :class="positiony[7]==0 ? 'bt0':'bt1' " @click= "btclick(7)">颈部</button>
							</view>
						</view>
						<view v-if="clicknum==1" style="display: flex; flex-wrap: wrap; width: 100 %; height: 75%; justify-content: center;">
							<view style="width: 50%; height: 20%; padding-bottom: 5%; padding-top: 3%;">
								<button :class="positiony[27]==0 ? 'bt0':'bt1' " @click= "btclick(27)">背部</button>
							</view>
							<view style="width: 50%; height: 20%; padding-bottom: 5%; padding-top: 3%;">
								<button :class="positiony[28]==0 ? 'bt0':'bt1' " @click= "btclick(28)">臀部</button>
							</view>
						</view>
						<view v-if="clicknum==3" style="display: flex; flex-wrap: wrap; width: 100 %; height: 75%; justify-content: center;">
							<view style="width: 33%; height: 20%; padding-bottom: 5%;">
								<button :class="positiony[11]==0 ? 'bt0':'bt1' " @click= "btclick(11)">大腿</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;">
								<button :class="positiony[29]==0 ? 'bt0':'bt1' " @click= "btclick(29)">腘窝</button>
							</view>
							<view style="width: 33%; height: 20%;  padding-bottom: 5%;">
								<button :class="positiony[13]==0 ? 'bt0':'bt1' " @click= "btclick(13)">小腿</button>
							</view>
							<view style="width: 33%; height: 20%;  padding-bottom: 5%;">
								<button :class="positiony[14]==0 ? 'bt0':'bt1' " @click= "btclick(14)">足踝</button>
							</view>
							<view style="width: 40%; height: 20%;  padding-bottom: 5%;">
								<button :class="positiony[30]==0 ? 'bt0':'bt1' " @click= "btclick(30)">脚后跟</button>
							</view>
							<view style="width: 33%; height: 20%;  padding-bottom: 5%;">
								<button :class="positiony[31]==0 ? 'bt0':'bt1' " @click= "btclick(31)">脚底</button>
							</view>
							<view style="width: 33%; height: 20%;   padding-bottom: 5%;">
								<button :class="positiony[16]==0 ? 'bt0':'bt1' " @click= "btclick(16)">脚趾</button>
							</view>
							<view style="width: 40%; height: 20%;    padding-bottom: 5%;">
								<button :class="positiony[17]==0 ? 'bt0':'bt1' " @click= "btclick(17)">脚趾缝</button>
							</view>
						</view>
						<view v-if="clicknum==4" style="display: flex; flex-wrap: wrap; width: 100 %; height: 75%; justify-content: center;">
							<view style="width: 33%; height: 20%; padding-bottom: 5%;">
								<button  :class="positiony[19]==0 ? 'bt0':'bt1' " @click="btclick(19)" >腋窝</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%; ">
								<button :class="positiony[20]==0 ? 'bt0':'bt1' " @click= "btclick(20)">上臂</button>
							</view>
							<view style="width: 40%; height: 20%;  padding-bottom: 5%;">
								<button :class="positiony[21]==0 ? 'bt0':'bt1' " @click= "btclick(21)">肘关节</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;">
								<button :class="positiony[22]==0 ? 'bt0':'bt1' " @click= "btclick(22)">前臂</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;">
								<button :class="positiony[23]==0 ? 'bt0':'bt1' " @click= "btclick(23)">手腕</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;">
								<button :class="positiony[32]==0 ? 'bt0':'bt1' " @click= "btclick(32)">手背</button>
							</view>
							<view style="width: 33%; height: 20%; padding-bottom: 5%;">
								<button :class="positiony[25]==0 ? 'bt0':'bt1' " @click= "btclick(25)">手指</button>
							</view>
							<view style="width: 40%; height: 20%; padding-bottom: 5%;">
								<button :class="positiony[26]==0 ? 'bt0':'bt1' " @click= "btclick(26)">手指缝</button>
							</view>
							<view style="width: 40%; height: 20%; padding-bottom: 5%;">
								<button :class="positiony[33]==0 ? 'bt0':'bt1' " @click= "btclick(33)">手指甲</button>
							</view>
						</view>
					</view>

				</view>
			</view>
		</uni-popup>
		
		<view style="height: 16vh; border-top: 2rpx solid #9f9f9f;">
			<view style="height: 30%; background-color: #fff; display: flex; align-items: center; justify-content: flex-start;">
				<view style="display: flex; justify-content: flex-start; align-items: center; padding-left: 5%; padding-right: 5%;">
					<view style="height: 100%; display: flex; justify-content: center; align-items: center; padding: 0 2%; font-size: 30rpx;">
						<text :style="{'text-align': 'center','white-space' : 'nowrap', 'color': swc ? '#b2b2b2' : '#8366c8' }">正面</text>
						<switch color="#8366c8"   style=" transform:scale(0.65);  align-items: center; dispaly: flex;" @change="switchchange" />
						<text :style="{'text-align': 'center','white-space' : 'nowrap', 'color': !swc ? '#b2b2b2' : '#8366c8'}">背面</text>
					</view>
				</view>
				<view style="height: 100%; display: flex; margin-left: auto; align-items: center; justify-content: flex-end; padding-right: 5%;font-size: 30rpx;">
					<checkbox style="transform: scale(0.8);" :checked="isChecked" @click="toggleCheckbox"  color="#ffffff" border-color="#b2b2b2"  activeBorderColor="#8366c8" activeBackgroundColor="#8366c8"/>
					<text :style="{color: isChecked ? '#6f6f6f':'#b2b2b2' }">选择全身</text>
				</view>
			</view>
			<uni-section  title="模型选择:" type="line">
				<template v-slot:right>
					<uni-data-select placement="top" :clear="false"  :localdata="models" placeholder="请选择检测模型" v-model="form.model" style=" padding-left: 20rpx;padding-right: 20rpx;"></uni-data-select>
				</template>
			</uni-section>
			<view style="height: 70%; background-color: #fff; display: flex; align-items: center; justify-content: center;">
				<button :style="{width: '80%', color: (ischose || isChecked) ? '#fff' :'#b2b2b2' , 'background-color':  (ischose || isChecked) ? '#8366c8':'#dddddd','border-radius': '30rpx', 'font-size': '28rpx', border: (ischose || isChecked) ? '1rpx solid #8366c8' : '1rpx solid #dddddd' }"  hover-class="finalbt"  @click="final">查看结果</button>
			</view>
		</view>
		<uni-popup ref="overtime" :is-mask-click="false">
			<view style="height: 20vh; width: 100%; background-color: #fff;border-top-left-radius: 2vh; border-top-right-radius: 2vh;">
				<view style="padding-top: 5%; padding-left: 5%; display: flex; justify-content:  flex-start; align-items: center;">
					<image src="../../static/fail1.png" style="width: 70rpx; height: 70rpx; margin-right: 20rpx;"></image>
					<text>测评时间超过10分钟,提交失败</text>
					
				</view>
				<view style="padding-top: 8%; padding-left: 5%; display: flex; justify-content: flex-start; align-items: center; ">
					<navigator style="margin-left: 90rpx; color: #914DFF;" open-type="switchTab" url="/pages/index/index" >重新测评</navigator>	
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>                 
	export default {
		data() {
			return {
				models:[],
				ischose: false,
				opposite: true,
				form:{
					info_id: 0,
					username: '',
					x: 0,
					y: 0,
					w: 0,
					h: 0,
					sex: '男',
					age: '0',
					imageUrl: '',
					position: [],
					model: 1
				},
				// 女 40 男 41
				clicknum: 0,
				positionx: Array(40).fill(0),
				positiony: Array(39).fill(0),
				image:{
					displayWidth: 0,
					displayHeight: 0,
					left: 0,
					top: 0,
					right: 0,
					bottom: 0
				},
				height: 0,
				tabbarheight: 0,
				canvastop: 0,
				swc: false,
				time1:null,
				isChecked: false,
				currenttime:''
			}
		},
		onLoad :function(option) {
			this.getModels()
			const form = JSON.parse(option.form);
			this.form.info_id = form.info_id;
			this.form.username = form.username;
			this.form.sex = form.sex;
			this.form.age = form.age;
			this.form.x = form.x;
			this.form.y = form.y;
			this.form.w = form.w;
			this.form.h = form.h;
			this.form.imageUrl = form.imageUrl;
			this.currenttime = form.currenttime;
			this.tabbarheight = uni.getSystemInfoSync().windowTop;
			// console.log('efef',this.tabbarheight);
			this.height = uni.getSystemInfoSync().windowHeight ;
			//可使用窗口-底部导航栏的占比
			this.tabbarheight = uni.getSystemInfoSync().statusBarHeight;
			// console.log('efeddwf',this.height);
			this.canvastop = this.height;
		},
		onShow(){
			this.$device(function(result){
				// console.log(result);
				if(result==2){
					uni.showToast({
						icon:'error',
						title:'账号在异地登录',
						mask:true
					})
					setTimeout(()=>{
						uni.reLaunch({
							url:'/pages/index/index'
						})
					},1000)
					
			
				}else if (result==4){
						setTimeout(()=>{
							uni.reLaunch({
								url:'/pages/index/index'
							})
						},1000)
					
				}else{
					let user1 = uni.getStorageSync('user');
					
					if (!user1){
						uni.showToast({
							icon:'none',
							title:'未登录',
							'mask':true
						})
						setTimeout(()=>{
							uni.reLaunch({
								url:'/pages/index/index'
							})
						},1000)
					}
				}
			});
			this.time1=setInterval(()=>{
					this.$device(function(result){
					// console.log(result);
					if(result==2){
						uni.showToast({
							icon:'error',
							title:'账号在异地登录',
							mask:true
						})
						setTimeout(()=>{
							uni.reLaunch({
								url:'/pages/index/index'
							})
						},1000)
						
				
					}else if (result==4){
							setTimeout(()=>{
								uni.reLaunch({
									url:'/pages/index/index'
								})
							},1000)
						
					}else{
						let user1 = uni.getStorageSync('user');
						
						if (!user1){
							uni.showToast({
								icon:'none',
								title:'未登录',
								'mask':true
							})
							setTimeout(()=>{
								uni.reLaunch({
									url:'/pages/index/index'
								})
							},1000)
						}
					}
				});
			},3600000)
		},
		onReady() {

			// var that = this;
			// const query0 = uni.createSelectorQuery().in(this);
			// query0.select('#viewd').boundingClientRect(data0 => {
			// 	console.log('canvas高度:',data0.height);
			// 	that.height = data0.height;
				
			// }).exec();
		
		},
		onHide() {
			clearInterval(this.time1);
			this.time1 = null;
		},
		methods: {
			final(){
				if(this.ischose || this.isChecked){
					
					
					var now = new Date();
					var currentTimeMs = now.getTime();
					var timeDifference  = currentTimeMs-this.currenttime;
					if (timeDifference>9*60*1000){
						this.$refs.overtime.open('bottom');
					}else{
						// console.log('点击');
						if(this.form.sex == '男'){
							this.form.position = this.positionx;
						}else{
							this.form.position = this.positiony;
						}
						// uni.showLoading({
						// 	mask:true
						// });
						// setTimeout(()=>{
						// 	uni.hideLoading();
						// },1000)
						uni.navigateTo({
							url:'/pages/detect/detect3?form='+JSON.stringify(this.form)
						})
					}
					
			
				}
			},
			toggleCheckbox(){
				this.isChecked = !this.isChecked;
				if (this.isChecked) {
					if(this.form.sex == '男'){
						this.positionx.fill(1);
					
					}else{
						this.positiony.fill(1);
					}
					this.ischose = true;
				} else {
					if(this.form.sex == '男'){
						this.positionx.fill(0);
					}else{
						this.positiony.fill(0);
					}
					this.ischose = false;
				}
			},
			deleteall(){
				if(this.ischose){
					if(this.form.sex == '男'){
						this.positionx = this.positionx.map(() => 0);
					}else{
						this.positiony = this.positiony.map(() => 0);
					}
					this.ischose = false;
					this.isChecked = false;
				}
			},
			imageLoad: function(e) {
				var that = this;
				const query = uni.createSelectorQuery().in(this);
				query.select('.image').boundingClientRect(data => {
					that.image.displayWidth = data.width;
					that.image.displayHeight = data.height;
					that.image.left = data.left;
					that.image.top = data.top;
					that.image.right = data.right;
					that.image.bottom = data.bottom;
					that.canvastop = that.image.top/that.canvastop *100;
				}).exec();
				// console.log('宽度:',this.image.displayWidth);
				// console.log('高度:',this.image.displayHeight);
				// console.log('left:',this.image.left);
				// console.log('top:',this.image.top);
				// console.log('right:',this.image.right);
				// console.log('bootom:',this.image.bottom);
				// console.log('top比:',this.canvastop);
			},
			canvas(index){
				// console.log('点击画板');
				if(this.form.sex == '男'){
					if(this.opposite){
						// console.log('1');
						this.clicknum = index;
						this.$refs.popup.open('center');
					}else{
						// console.log('2');
						this.clicknum = index;
						this.$refs.popup.open('center');
					}
					
				}
				else{
					if(this.opposite){
						// console.log('1');
						this.clicknum = index;
						this.$refs.popup.open('center');
					}else{
						// console.log('2');
						this.clicknum = index;
						this.$refs.popup.open('center');
					}
				}
				// this.tabbarheight = uni.getSystemInfoSync().windowTop;
				// console.log('efef',this.tabbarheight);
				// this.height = uni.getSystemInfoSync().windowHeight;
				// this.tabbarheight = uni.getSystemInfoSync().statusBarHeight;
				// console.log('efeddwf',this.height);
				// this.canvastop = this.height;
				// this.opposite = !this.opposite;
			},
			btclick(num){
				if(this.form.sex=='男'){
					if(this.positionx[num]==0){
						this.positionx[num]=1;
						this.ischose = true;
					}else{
						this.positionx[num]=0;
						const allZeros = this.positionx.every(item => item === 0);
						if (allZeros) {
							this.ischose =false;
						}
					}
				}else{
					if(this.positiony[num]==0){
						this.positiony[num]=1;
						this.ischose = true;
					}else{
						this.positiony[num]=0;
						const allZeros = this.positiony.every(item => item === 0);
						if (allZeros) {
							this.ischose =false;
						}
					}
				}
				
			},
			switchchange: function(e){
				if(e.detail.value){
					this.swc = true;
					this.opposite = false;
				}
				else{
					this.swc = false;
					this.opposite = true;
				
				
				}
				this.tabbarheight = uni.getSystemInfoSync().windowTop;
				// console.log('efef',this.tabbarheight);
				this.height = uni.getSystemInfoSync().windowHeight;
				this.tabbarheight = uni.getSystemInfoSync().statusBarHeight;
				// console.log('efeddwf',this.height);
				this.canvastop = this.height;
			},
			getModels() {
				var that = this;
				uni.request({
				   url:this.$BASE_URL+'/model',
				   method:'GET',
				   success: (res) => { 
				        const data = res.data;
				        if (data.code = '200'){
				            that.models = data.data; 
				        }else{
				            uni.showToast({
				                title: data.msg,
				                icon:'error'
				            })
				        }
				    },
				    fail: (error) => {   
				        uni.showToast({
				            title: '服务器或网络错误',
				            icon:'none'
				        })        
				    }
				  })
			}
			
			
			
		}
	}
</script>

<style>
	
	>>>.uni-section .uni-section-header__content {
		flex: unset !important;
	}
	>>>.uni-section .uni-section-header__slot-right{
		flex: 1 !important;
	}
	>>>.uni-switch-input::before{
		background-color: #8366c8 ;
	}
	.uni-switch-input::before{
		background-color: #8366c8;
	}

	.info1 {
			width:  45vh;
			height: 45vh;
			background-color: #fff;
			border-radius: 2vh;
		}
	.bt0{
		width: 80% ;
		color: #b2b2b2 ;
		background-color: #fff;
		border-radius: 30rpx; 
		font-size: 28rpx;
		border: 1rpx solid #b2b2b2;
	}
	.bt1{
		width: 80%;
		color: #fff;
		background-color: #8366c8;
		border-radius: 30rpx;
		font-size: 28rpx;
		border: 1rpx solid #8366c8;
	}
	.finalbt{
		color:  #b2b2b2 !important;
	}
</style>
