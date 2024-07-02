<template>
	<view>
	<view style="height: 30px; background-color: #fff;"></view>
	<view style="height: 44px; background-color: #fff;  width: 100vw;display: flex; flex-direction: row; justify-content: center; align-items: center;">
		<view style="display: flex; justify-content: flex-start; align-items: center; padding-left:3%; width: 25%;">
			<uni-icons type="closeempty" size="32" color="#000" style="padding-right: 1%;" @click="exit" ></uni-icons>
			<text style="color: #000; font-size: 16px; white-space: nowrap;" @click="exit">退出</text>
		</view>
		
		<view style="flex: 1; display: flex; justify-content: center;">
			<text style="color: #000; white-space: nowrap; font-size: 20px; ">结果与建议</text>
		</view>
		<view style="display: flex; padding-right:3%;  width: 25%;"></view>
	</view>
	<!-- <canvas  canvas-id="Canvas" :style="{width: canvasw +'px',height: canvash + 'px',position:'absolute' }" ></canvas> -->
	<view class="saveimage">

		<view  style="background-color: #8366c8;  padding-top: 1%; padding-bottom: 5%; width: 100vw;">
			<!-- <view style="display: flex; justify-content: flex-end; align-items: center;">
				<uni-icons type="download" size="28" color="#fff" @click="saveimage()"></uni-icons>
				<text style="margin-right: 5%; color: #fff; font-size: 18px; margin-left: 2%;" @click="saveimage()">生成长图</text>
				
			</view> -->
			<view style=" display: flex; justify-content: center; align-items: center;">
				<uni-card  :is-full="true" style="white-space: nowrap; text-overflow: ellipsis;margin-top: 3%; margin-left: 5%; margin-right: 5%; border-radius: 30rpx;">
					<view class="img"  style="height: 8vh; display: flex; justify-content: flex-start; align-items: center;">
						<view :style="{height: imgsize + 'px', width: imgsize + 'px' ,'border-radius' :  imgsize + 'px',overflow:'hidden' }">
							<image :src="form.imageUrl" mode="aspectFill" style="width: 100%; height: 100%;" @click="clickImg" ></image>
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
		</view>
		<view style="overflow: auto; height: 55vh; ">
			<view v-for="(item,index) in test" :key="index">
				<view style="padding-top: 3%; padding-bottom: 3%; background-color: #ECEFF1; display: flex; justify-content: center; justify-content: center;">
					<uni-card :is-full="true" style="white-space: nowrap; text-overflow: ellipsis;margin-left: 5%; margin-right: 5%; border-radius: 30rpx;">
						<view style="white-space: nowrap; display: flex; justify-content: center; align-items: center; text-overflow: ellipsis; margin-bottom: 2%; padding-bottom: 2%;  border-bottom: 2rpx solid #b2b2b2;">
							<text v-if="item.isChinesemedicine == 0" style="font-size: 16px; color: #b2b2b2; white-space: nowrap; text-overflow: ellipsis;  overflow: hidden;">西医：</text>
							<text v-if="item.isChinesemedicine == 0" style="font-size: 20px; color: #000; white-space: nowrap; text-overflow: ellipsis;  overflow: hidden;">{{ item.Wsicknessname}}</text>
							<text v-if="item.isChinesemedicine == 1" style="font-size: 16px; color: #b2b2b2; white-space: nowrap; text-overflow: ellipsis;  overflow: hidden;">西医：</text>
							<text v-if="item.isChinesemedicine == 1" style="font-size: 20px; color: #000; white-space: nowrap; text-overflow: ellipsis;  overflow: hidden;">{{ item.Wsicknessname }}</text>
							<text v-if="item.isChinesemedicine == 1" style="margin-left: auto; font-size: 16px; color: #b2b2b2; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">中医：</text>
							<text v-if="item.isChinesemedicine == 1" style=" font-size: 20px; color: #000; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">{{item.Csicknessname}}</text>
						</view>
					
						<view class="images"  style="height: 6vh; display: flex; justify-content: flex-start; align-items: center;">
							<view :style="{height: imagesize + 'px', width: imagesize + 'px' ,'border-radius' :  imagesize + 'px',overflow:'hidden','margin-right':'2%'}">
								<image :src="item.sicknessurl" mode="aspectFill" style="width: 100%; height: 100%;"></image>
							</view>
							<view style="flex: 1; " v-if="test[0]!=0">
								<progress :percent="item.probability"  stroke-width="8" style=" overflow: hidden; border-radius: 30rpx;"  activeColor="#857BE8" />
							</view>
						</view>
						<view>
							<uni-collapse v-if="test[0]!=0" > 
								<view>
									<uni-collapse-item  thumb="../../static/cw/fire.png" title="就医紧急度" >
										<view style="padding: 0 20px; word-break: break-all;font-size: 15px;">
											<text>{{item.urgency}}</text>
										</view>
									</uni-collapse-item>
								</view>
								<view>
									<uni-collapse-item  thumb="../../static/cw/W.png"  :title-border="item.isChinesemedicine == 1 ? 'auto' : 'none'"  title="西医">
										<view style="padding: 0 15px; display: flex; justify-content: flex-start;">
											<view style="margin: 0 1%;">
												<uni-icons type="calendar-filled" size="24" color="#bcbcbc" ></uni-icons>
											</view>
											<view style="flex: 1; padding: 0 5px;">
												<view style="word-break: keep-all; overflow: hidden;">
													<text style="color: #a2a2a2 ;">典型症状</text>
												</view>
												<view style="word-break: break-all; font-size: 15px;">
													<text>{{item.Wsymptoms}}</text>
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
													<text>{{item.Wcause}}</text>
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
													<text>{{item.Wtreatment}}</text>
												</view>
											</view>
										</view>
									</uni-collapse-item>
								</view>
								<view v-if="item.isChinesemedicine == 1">
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
													<text>{{item.Csymptoms}}</text>
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
													<text>{{item.Ccause}}</text>
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
													<text>{{item.Ctreatment}}</text>
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
	</view>
</template>

<script>
import { base64ToPath } from '../../js_sdk/mmmm-image-tools';
	export default {
		data() {
			return {
				form:{
					info_id: 0,
					username: '默认用户',
					x: 0,
					y: 0,
					w: 0,
					h: 0,
					sex: '',
					age: '',
					position: [],
					date: '',
					results: [],
					imageUrl:'../../static/user.jpg'
				},
				test: [0,0,0],
				// Wed, 03 Jan 2024 00:00:00 GMT
				imgsize: 0,
				imagesize: 0,
				Chinesemedicne: true,
				text: '1.卧床休息，抬高患肢。2.新霉素溶液、硼酸水或者生理盐水进行清洗或者湿敷。3.莫匹罗星软膏。4.手术治疗。',
				time1:null,
				canvasw:0,
				canvash:0
			}
		},
		onLoad :function(option) {
			// console.log(JSON.parse(option.form));
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
			this.form.position = form.position;
			uni.showLoading({
				mask:true
			})
			var that = this;
			const userData =  uni.getStorageSync('user');
			uni.request({
				url: this.$BASE_URL+'/skindataest',
				header:{Authorization: 'Bearer '+userData.access_token},
				method:'POST',
				data: this.form,
				success: (res) => {
				 
				  const data = res.data;
				  if (data.code == '401') {
					uni.hideLoading();
				    uni.showToast({
				      icon: "none",
				      title: data.msg
				    });
				  } else if (data.code == '200') {
					for (let i = 0; i < data.data.length; i++) {
					        data.data[i].sicknessurl = "data:image/jpeg;base64," + data.data[i].sicknessurl;
							data.data[i].Wtreatment = that.formatText(data.data[i].Wtreatment);
							data.data[i].Ctreatment = that.formatText(data.data[i].Ctreatment);
						}
					    // 将数据存储在that.test中
					that.test = data.data;
					that.form.date = that.formatDate(data.data[0].date);
					// console.log(typeof that.test[0].Wtreatment);
					uni.hideLoading();
				  }else{
					  uni.hideLoading();
					  uni.showToast({
					    icon: "none",
					    title: data.msg
					  });
				  }
				},
				fail: (err) => {
					uni.hideLoading();
				  // 请求失败时的处理逻辑
				  if (err.statusCode === 404) {
				    uni.showToast({
				      icon: 'none',
				      title: '请求失败，找不到资源'
				    });
				  } else if (err.statusCode === 500) {
				    uni.showToast({
				      icon: 'none',
				      title: '服务器内部错误，请稍后重试'
				    });
				  } else {
				    uni.showToast({
				      icon: 'none',
				      title: '请求失败，请稍后重试'
				    });
				  }
				  
				  
				}
			})
			
			
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
			// saveimage(){
			// 	/* 获取节点信息的对象 */
			// 	var that = this;
			//     const query = uni.createSelectorQuery().in(this);
			//     query
			// 	  .select(".saveimage")
			// 	  .boundingClientRect(res => {
			// 	    that.canvasw = res.width;
			// 	    that.canvash = res.height;
			// 	    console.log(res.height); // 102.85714721679688
			// 	    console.log(res.width); // 102.85714721679688
			// 	  })
			// 	  .exec();
			// 	console.log('完成');
				
			// },
			formatText(text) {
				const newText = text.replace(/。(\d)/g, "。\n$1");

				// const newText = text.replace(/(\d+)\.(?![^\n\S]*[A-Za-z])(.*?)(?=\d+\.|\b)/g, "$1.$2\n");


				return newText;
			},
			clickImg(){
				// console.log('原本',this.form.imageUrl);
				var that = this;
				if (this.form.imageUrl !='../../static/user.jpg'){
					// console.log('不同');
					uni.showLoading({
						mask:true
					})
					base64ToPath(this.form.imageUrl).then(path =>{
						var imsArray='';
						uni.hideLoading();
						
						imsArray = path;
						uni.previewImage({
							urls:[imsArray],
							current: 0
						});
					})
					.catch(error =>{
						uni.hideLoading();
						uni.previewImage({
							urls: [that.form.imageUrl]
						})
					})
				}else{
					// console.log('xt');
					uni.previewImage({
						urls: [that.form.imageUrl]
					})
				}
				
				
			},
			exit(){
				uni.reLaunch({
					url:'/pages/index/index'
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
