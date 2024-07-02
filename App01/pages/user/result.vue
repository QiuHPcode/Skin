<template>
	<view class="saveimage">
	
		<view  style="background-color: #8366c8;  padding-top: 1%; padding-bottom: 5%; width: 100vw; display: flex; justify-content: center; align-items: center;">
			<uni-card  :is-full="true" style="white-space: nowrap; text-overflow: ellipsis;margin-top: 3%; margin-left: 5%; margin-right: 5%; border-radius: 30rpx;">
				<view class="img"  style="height: 8vh; display: flex; justify-content: flex-start; align-items: center;">
					<view :style="{height: imgsize + 'px', width: imgsize + 'px' ,'border-radius' :  imgsize + 'px',overflow:'hidden' }">
						<image :src="form.imgurl" mode="aspectFill" style="width: 100%; height: 100%;" @click="clickImg" ></image>
					</view>
					<view style="flex: 1; display: flex; justify-content: center; align-items: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; ">
						<text style="font-size: 20px; color: #000;  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{form.username}}</text>
					</view>
				</view>
				<view style=" white-space: nowrap; text-overflow: ellipsis; width: 100%; display: flex; align-items: center; justify-content: flex-start; padding-top: 2%; margin-top: 2%; border-top: 2rpx solid #b2b2b2;">
					<view style=" white-space: nowrap; text-overflow: ellipsis;">
						<text style="color: #b0adbd; font-size:30rpx">日期:{{formatDate(form.date)}}</text>
					</view>
					<view class="as0">
							<view class="half-width0">{{form.age}}</view>
							    <view class="separator0">|</view>
							    <view class="half-width0">{{form.sex}}</view>
					</view>
				</view>
			</uni-card>
		</view>
		<view style="overflow: auto; height: 60vh; " >
			<view v-for="(item,index) in test" :key="index">
				<view style="padding-top: 3%; padding-bottom: 3%; background-color: #ECEFF1; display: flex; justify-content: center; justify-content: center;">
					<uni-card :is-full="true" style="white-space: nowrap; text-overflow: ellipsis;margin-left: 5%; margin-right: 5%; border-radius: 30rpx;">
						<view style="white-space: nowrap; display: flex; justify-content: flex-start; align-items: center; text-overflow: ellipsis; margin-bottom: 2%; padding-bottom: 2%;  border-bottom: 2rpx solid #b2b2b2;">
							<text v-if="result.isChinesemedicine[index]==0" style="font-size: 16px; color: #b2b2b2; white-space: nowrap; text-overflow: ellipsis;  overflow: hidden;">西医：</text>
							<text v-if="result.isChinesemedicine[index]==0" style="font-size: 20px; color: #000; white-space: nowrap; text-overflow: ellipsis;  overflow: hidden;">{{ result.Wsicknessname[index] }}</text>
							<text v-if="result.isChinesemedicine[index]==1" style="font-size: 16px; color: #b2b2b2; white-space: nowrap; text-overflow: ellipsis;  overflow: hidden;">西医：</text>
							<text v-if="result.isChinesemedicine[index]==1" style="font-size: 20px; color: #000; white-space: nowrap; text-overflow: ellipsis;  overflow: hidden;">{{ result.Wsicknessname[index] }}</text>
							<text v-if="result.isChinesemedicine[index]==1" style="margin-left: auto; font-size: 16px; color: #b2b2b2; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">中医：</text>
							<text v-if="result.isChinesemedicine[index]==1" style=" font-size: 20px; color: #000; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">{{result.Csicknessname[index]}}</text>
						</view>
					
						<view class="images"  style="height: 6vh; display: flex; justify-content: flex-start; align-items: center;">
							<view :style="{height: imagesize + 'px', width: imagesize + 'px' ,'border-radius' :  imagesize + 'px',overflow:'hidden','margin-right':'2%'}">
								<image :src="result.sicknessimg[index]" mode="aspectFill" style="width: 100%; height: 100%;"></image>
							</view>
							<view style="flex: 1; ">
								<progress :percent="result.probability[index]"  stroke-width="8" style=" overflow: hidden; border-radius: 30rpx;"  activeColor="#857BE8" />
							</view>
						</view>
						<view>
							<uni-collapse>
								<view>
									<uni-collapse-item  thumb="../../static/cw/fire.png" title="就医紧急度" >
										<view style="padding: 0 20px; word-break: break-all;font-size: 15px;">
											<text>{{result.urgency[index]}}</text>
										</view>
									</uni-collapse-item>
								</view>
								<view>
									<uni-collapse-item  thumb="../../static/cw/W.png"  :title-border="result.isChinesemedicine[index]==1 ? 'auto' : 'none'"  title="西医">
										<view style="padding: 0 15px; display: flex; justify-content: flex-start;">
											<view style="margin: 0 1%;">
												<uni-icons type="calendar-filled" size="24" color="#bcbcbc" ></uni-icons>
											</view>
											<view style="flex: 1; padding: 0 5px;">
												<view style="word-break: keep-all; overflow: hidden;">
													<text style="color: #a2a2a2 ;">典型症状</text>
												</view>
												<view style="word-break: break-all; font-size: 15px;">
													<text>{{result.Wsymptoms[index]}}</text>
												</view>
											</view>
										</view>
										<view style="padding: 0 15px; display: flex; justify-content: flex-start;">
											<view style="margin: 0 1%;">
												<uni-icons type="info-filled" size="24" color="#bcbcbc" ></uni-icons>
											</view>
											<view style="flex: 1;  padding: 0 5px;">
												<view style="word-break: keep-all; overflow: hidden;">
													<text style="color: #a2a2a2 ;">可能病因</text>
												</view>
												<view style="word-break: break-all; font-size: 15px;">
													<text>{{result.Wcause[index]}}</text>
												</view>
											</view>
										</view>
										<view style="padding: 0 15px; display: flex; justify-content: flex-start;">
											<view style="margin: 0 1%;">
												<uni-icons type="plusempty" size="24" color="#bcbcbc" ></uni-icons>
											</view>
											<view style="flex: 1;  padding: 0 5px;">
												<view style="word-break: keep-all; overflow: hidden;">
													<text style="color: #a2a2a2 ;">治疗方法</text>
												</view>
												<view style="white-space: normal; font-size: 15px;">
													<text>{{result.Wtreatment[index]}}</text>
												</view>
											</view>
										</view>
									</uni-collapse-item>
								</view>
								<view v-if="result.isChinesemedicine[index]==1">
									<uni-collapse-item  thumb="../../static/cw/C.png" title-border="none" title="中医">
										
										<view style="padding: 0 15px; display: flex; justify-content: flex-start;">
											<view style="margin: 0 1%;">
												<uni-icons type="calendar-filled" size="24" color="#bcbcbc" ></uni-icons>
											</view>
											<view style="flex: 1;  padding: 0 5px;">
												<view style="word-break: keep-all; overflow: hidden;">
													<text style="color: #a2a2a2 ;">典型症状</text>
												</view>
												<view style="word-break: break-all;font-size: 15px;">
													<text>{{result.Csymptoms[index]}}</text>
												</view>
											</view>
										</view>
										<view style="padding: 0 15px; display: flex; justify-content: flex-start;">
											<view style="margin: 0 1%;">
												<uni-icons type="info-filled" size="24" color="#bcbcbc" ></uni-icons>
											</view>
											<view style="flex: 1;  padding: 0 5px;">
												<view style="word-break: keep-all; overflow: hidden;">
													<text style="color: #a2a2a2 ;">可能病因</text>
												</view>
												<view style="white-space: normal;font-size: 15px;">
													<text>{{result.Ccause[index]}}</text>
												</view>
											</view>
										</view>
										<view style="padding: 0 15px; display: flex; justify-content: flex-start;">
											<view style="margin: 0 1%;">
												<uni-icons type="plusempty" size="24" color="#bcbcbc" ></uni-icons>
											</view>
											<view style="flex: 1;  padding: 0 5px;">
												<view style="word-break: keep-all; overflow: hidden;">
													<text style="color: #a2a2a2 ;">治疗方法</text>
												</view>
												<view style="white-space: normal;font-size: 15px;">
													<text>{{result.Ctreatment[index]}}</text>
												</view>
											</view>
										</view>
									</uni-collapse-item>
								</view>
							</uni-collapse>
							
						</view>
					</uni-card>
				</view>
			</view>
		</view>
		<view style="word-wrap: break-word; padding: 1% 5vw; background-color:#ECEFF1 ;">
			<view style="background-color:#ECEFF1 ; display: flex; justify-content: flex-start; align-items: center;">
				<image style="height:36px; width: 36px;" src="../../static/cw/icon.png" mode="aspectFit"></image>
				<text style="padding-left: 2%; color: #000; font-size: 16px; font-weight: bold;" >SkinCloud</text>
			</view>
			<text style="font-size: 14px; color: #b2b2b2;" >*注:本结果不代表临床诊断，如有紧急情况请及时就医\n</text>
			<text style="font-size: 14px; color: #b2b2b2;" >*尊重用户的隐私，皮肤云保护用户历史数据</text>
		</view>
		
	
	</view>
</template>

<script>
import { base64ToPath } from '../../js_sdk/mmmm-image-tools';
	export default {
		data() {
			return {
				form:{
					username: '默认用户',
					sex: '男',
					age: 0,
					date: 'Wed, 03 Jan 2024 00:00:00 GMT',
					imgurl: '../../static/user.jpg'
				},
				result:{
					Wsicknessname:[1,1,0],
					Csicknessname:[1,1,0],
					isChinesemedicine:[1,1,0],
					Wsymptoms:[1,1,0],
					Csymptoms:[1,1,0],
					Wcause:[1,1,0],
					Ccause:[1,1,0],
					Wtreatment:[1,1,0],
					Ctreatment:[1,1,0],
					urgency:[1,1,0],
					sicknessimg:['../../static/user.jpg','../../static/user.jpg','../../static/user.jpg'],
					probability:[90,70,60]
				},
				test:[0,0,0],
				imgsize: 0,
				imagesize: 0,
				pglist: [80,60,40],
				time1:null
			}
		},
		onLoad: function(option) {
			if (!option || !option.result) {
			    return;
			}
			
			const result =JSON.parse(decodeURIComponent(option.result)) ;
			this.form.imgurl = result.resultimg;
			this.form.username = result.username;
			this.form.age = result.age;
			this.form.sex = result.sex;
			this.form.date = this.formatDate(result.date);
			for (let i = 0; i < 3; i++) {
				this.result.sicknessimg[i] = result[`sicknessimg${i+1}`];
				this.result.Wsicknessname[i] = result[`Wsicknessname${i+1}`];
				this.result.Csicknessname[i] = result[`Csicknessname${i+1}`];
				this.result.isChinesemedicine[i] = result[`isChinesemedicine${i+1}`];
				this.result.Wsymptoms[i] = result[`Wsymptoms${i+1}`];
				this.result.Csymptoms[i] = result[`Csymptoms${i+1}`];
				this.result.Wtreatment[i] = this.formatText(result[`Wtreatment${i+1}`]) ;
				this.result.Ctreatment[i] = this.formatText(result[`Ctreatment${i+1}`]) ;
				this.result.Wcause[i] = result[`Wcause${i+1}`];
				this.result.Ccause[i] = result[`Ccause${i+1}`];
				this.result.urgency[i] = result[`urgency${i+1}`];
				this.result.probability[i] = result[`probability${i+1}`];
			}
			// console.log(this.result.Wsicknessname[1]);
		
		},
		onShow() {
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
		onHide() {
			clearInterval(this.time1);
			this.time1 = null;
		},
		onReady() {
			var that = this;
			const query0 = uni.createSelectorQuery().in(this);
			query0.select('.images').boundingClientRect(data0 => {
				// console.log('canvas高度:',data0.height);
				that.imagesize = data0.height;
			}).exec();
			const query1 = uni.createSelectorQuery().in(this);
			query1.select('.img').boundingClientRect(data1 => {
				// console.log('canvas高度:',data1.height);
				that.imgsize = data1.height;
			}).exec();	
			
		},
		methods: {
			
			formatText(text) {
			      // 在文本中添加换行符
			  const newText = text.replace(/。(\d)/g, "。\n$1");
			  return newText;
			},
			clickImg(){
				var that = this;
				if (this.form.imgurl !='../../static/user.jpg'){
					// console.log('不同');
					uni.showLoading({
						mask:true
					})
					base64ToPath(this.form.imgurl).then(path =>{
						
						uni.hideLoading();
						
						that.form.imgurl = path;
						// console.log('成功转换');
						uni.previewImage({
							urls:[that.form.imgurl]
							
						});
					})
					.catch(error =>{
						uni.hideLoading();
						// console.log('转换失败');
						uni.previewImage({
							urls: [that.form.imgurl]
						})
					})
				}else{
					// console.log('xt');
					uni.previewImage({
						urls: [that.form.imgurl]
					})
				}
			},
			exit(){
				uni.switchTab({
					url:'/pages/user/user'
				})
			},
		    formatDate(dateString) {
		      const date = new Date(dateString);
		      const year = date.getFullYear();
		      const month = (date.getMonth() + 1).toString().padStart(2, '0');
		      const day = date.getDate().toString().padStart(2, '0');
		      return `${year}/${month}/${day}`;
		    }
		}
	}
</script>

<style>
	page{
		width:100%;
		height:100%;
		background-color:#ECEFF1;
	}

	/deep/.uni-progress-inner-bar{
		border-radius: 30rpx !important;
		background:linear-gradient(to right,#857BE8,#52468C) !important ;
	}
	/deep/.uni-card__header-content-title{
		font-size: 36rpx !important;
	}
	.as0{
		background-color: #ececec;
		display: flex;
		width: 28%;
		align-items: center;
		justify-content: flex-end;
		margin-left: auto;
		white-space: nowrap; 
		text-align: center;

		border-radius: 30rpx;
		font-size:25rpx;
	}
	.half-width0 {
	    width: 50%;
	    text-align: center;
		color: #b6b6b6;
	}
	.separator0 {
	    color: #ccc; 
	}
</style>
