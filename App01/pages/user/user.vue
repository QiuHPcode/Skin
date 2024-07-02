<template>
	<view>
		<view v-if="!success"  style="text-align: center;">
			<view style=" align-items: center; justify-content: center; text-align: center; display: flex;">
				<image src="../../static/report.png" mode="aspectFit" style="width: 100vw;height: 50vh;">
				</image>
			</view>
			<text style="text-align: center; color: #7259b1;">网络错误请求失败...</text>
		</view>
		<view v-if="success" style="padding: 10rpx 10px; "> 
			<view style="display: flex; justify-content: flex-start; align-items: center; padding: 5rpx 5rpx; border: 2rpx solid #b2b2b2; border-radius: 45px; background-color: #ECEFF1;">
				<view style="width: 45px; height: 45px; border-radius: 50%; background-color: #8366c8; font-size: 22.5px; display: flex; color: #fff; justify-content: center; align-items: center; ">
					<text v-if="login">
						{{form.username.substring(0,1)}}
					</text>
					<view v-if="!login">
						<uni-icons type="person-filled"  size="44"  color="#ECEFF1" ></uni-icons>
					</view>
				</view>
				<view v-if="!login" style="font-size: 15px;margin-left:4%; width: 50vw;">
					<view style="display: flex; width: 100%;">
						<text style=" white-space: nowrap;text-overflow: ellipsis; overflow: hidden; ">用户名</text>
						<text style="white-space: nowrap;text-overflow: ellipsis; overflow: hidden; color: #b2b2b2;">(未登录)</text>
					</view>
					<view>
						<text style="color: #b2b2b2;">创建时间</text>
					</view>
				</view>
				<view v-if="login" style="font-size: 15px; width: 50vw; margin-left: 4%;">
				    <view style="display: flex; width: 100%;">
				        <text style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">{{form.username}}</text>
				    </view>
				    <view style="display: flex; width: 100%;">
				        <text style="color: #b2b2b2;overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">创建于{{formatDate(form.date)}}</text>
				    </view>
				</view>
				<view style="margin-left: auto;">
					<uni-icons type="forward" size="32"  color="#666699" @click="loginorexit"></uni-icons>
				</view>
			</view>
			<view v-if="!login"  style=" align-items: center; justify-content: center; text-align: center; display: flex;">
				<image src="../../static/report.png" mode="aspectFit" style="width: 100vw;height: 50vh;"></image>
			</view>
			<view v-if="login&&!finish"  style=" align-items: center; justify-content: center; text-align: center; display: flex;">
				<image src="../../static/report.png" mode="aspectFit" style="width: 100vw;height: 50vh;"></image>
			</view>
			<view v-if="login&&!finish" style="text-align: center;" >
				<text style="color: #7259b1; font-size: 20px; ">暂无测评报告</text>
			</view>
		</view>
		<uni-drawer ref="showRight" mode="right" >
			<view style="background-color: #b2b2b2;color: #ECEFF1; border-radius: 10px; height: 40px; margin-top: 10vh; margin-left: auto; margin-right: auto; width: 85%; display: flex; align-items: center; justify-content: center; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;  " >
				<text style=" padding-left: 5%; padding-right: 5%; text-overflow: ellipsis;white-space: nowrap; overflow: hidden;">账号:{{form.user}}</text>
			</view>
			<view style="margin-top: 15vh;">
				<button style=" background-color: #8366c8; color: #fff; border-radius: 30px; width: 85%;" hover-class="bt-click" @click="alluser">查看所有用户</button>
			</view>
			<view style="margin-top: 15vh;">
				<button style=" background-color: #8366c8; color: #fff; border-radius: 30px; width: 85%;" hover-class="bt-click" @click="add">添加新用户</button>
			</view>
			<view style="justify-content: center; display: flex; height: 40%; align-items: center;">
				<button style=" background-color: #99CCCC; color: #fff; border-radius: 30px; width: 85%;" hover-class="bt-click" @click="exit">退出登录</button>
			</view>	
		</uni-drawer>
		<view v-if="login&&finish"  >
			<view  v-for="(item,index) in resultlist" :key="index" >
				<uni-card :is-full="true" style="background-color: #f1f4f5; white-space: nowrap; text-overflow: ellipsis;margin-left: 5%; margin-right: 5%; border-radius: 30rpx; margin-top: 5%;">
					<view style="display: flex; padding-top: 3%; padding-bottom: 3%; justify-content: flex-start; " >
						<view class="images"  style="height: 7vh; display: flex; justify-content: flex-start; align-items: center;" @click="result(index)">
							<view :style="{height: imagesize + 'px', width: imagesize + 'px' ,'border-radius' :  imagesize + 'px',overflow:'hidden','margin-right':'2%'}">
								<image :src="item.resultimg" mode="aspectFill" style="width: 100%; height: 100%;"></image>
							</view>
						</view>
						<view style="flex: 1;">
							<view style="display: flex; justify-content: flex-start; align-items: center;"> 
								<view style=" margin-left: 2%; width: 50vw; font-size: 18px; display: flex; justify-content: flex-start;align-items: center; " @click="result(index)">
									<text style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">{{item.username}}</text>
								</view>
								<view style="margin-left: auto;" >
									<uni-icons type="trash-filled" color="#b2b2b2" size="30"  @click="deleteresult(index)" ></uni-icons>
								</view>
							</view>
							
							<view @click="result(index)" style="margin-left: 2%;  white-space: nowrap; text-overflow: ellipsis; width: 100%; display: flex; align-items: center; justify-content: flex-start; padding-top: 2%; margin-top: 2%; border-top: 2rpx solid #b2b2b2; ">
								
								<view style=" white-space: nowrap; text-overflow: ellipsis;">
									<text style="color: #b0adbd; font-size:30rpx">报告日期:{{formatDate(item.date)}}</text>
								</view>
								<view class="as0">
										<view class="half-width0">{{item.age}}</view>
										    <view class="separator0">|</view>
										    <view class="half-width0">{{item.sex}}</view>
								</view>
							
							</view>
						</view>
						
					</view>
				</uni-card>
			</view>
		
		</view>
		<uni-popup ref="delete" :is-mask-click="false" >
			<view style="width: 280px; height: 130px; background-color: #fff; border-radius: 2vh;  ">
				<view style="text-align: center; display: flex; justify-content: center; align-items: center;padding-top: 20px;">
					<text style="color: #8366c8; font-size: 20px;">请确定删除?</text>
				</view>
				<view style="text-align: center; display: flex; justify-content: center; align-items: center;">
					<text style="color: #b2b2b2; font-size: 14px;">*删除报告后无法还原</text>
				</view>
				<view style="display: flex; justify-content: space-around; align-items: center; margin-top:15px; ">
					<view>
						<button  @click="cancel" style="font-size: 16px; border-radius: 18px; background-color: #ECEFF1; color: #b2b2b2;">取消</button>
					</view>
					<view> 
						<button @click="deletefinish" style=" border-radius: 18px;font-size: 16px; background-color: #8366c8; color: #fff;">确定</button>
					</view>
					
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="exit" :is-mask-click="false" >
			<view style="width: 280px; height: 130px; background-color: #fff; border-radius: 2vh;  ">
				<view style="text-align: center; display: flex; justify-content: center; align-items: center;padding-top: 20px;">
					<text style="color: #99CCCC; font-size: 20px;">请确定退出登录?</text>
				</view>
				<view style="display: flex; justify-content: space-around; align-items: center; margin-top:15px; ">
					<view>
						<button  @click="cancelexit" style="font-size: 16px; border-radius: 18px; background-color: #ECEFF1; color: #b2b2b2;">取消</button>
					</view>
					<view> 
						<button @click="exitfinish" style=" border-radius: 18px;font-size: 16px; background-color: #99CCCC; color: #fff;">确定</button>
					</view>
					
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="popup"  @change="change" >
			<view class="info">
				<view class="infobara">
					<view class="Bicon" v-if="i2t === 'i'">
						<uni-icons type="person-filled"  size="60"  color="#cccccc" ></uni-icons>
					</view>
					<view class="Bicon" v-else-if="i2t === 't'">
						{{form1.username.substring(0,1)}}
					</view>
					<view style="display: flex; justify-content: center;  width: 40%; position: absolute; margin-top: 70rpx;">
						<text style="font-size: 32rpx; color: #755cb5; ">添加新用户</text>
					</view>
				</view>
				<view class="infoback">
						<view style="padding-top: 2%;">
							<uni-easyinput v-model="form1.username" :error-message=" error ? 'errorMessage' : ''" placeholder="用户名称" placeholder-style="font-size:30rpx" :clearable="true" primaryColor="#8366c8"  @input="Binput" @focus="Bfocus"></uni-easyinput>
							<text style="padding-left: 3%; font-size: 28rpx; color: #ff0000 ;">{{errormessgae}}</text>
						</view>
					
						<view :class="swc ? 'sexg' : 'sexb' ">
							<text  :style="swc? 'padding-left: 3%; color: #ffacd2; font-size: 30rpx;': 'padding-left: 3%; color: #66CCFF; font-size: 30rpx;' ">性别</text>
							<view style="display: flex; justify-content: flex-end; align-items: center; margin-left: auto; padding-right: 3%;">
								<text :class="swc ? 'textsex' : 'textsexb'">男</text>
								<view style="height: 100%; display: flex; justify-content: center; align-items: center; padding: 0 2%;">
									<switch color="#ffacd2"  style=" transform:scale(0.7); align-items: center; dispaly: flex;" @change="switchchange"/>
								</view>
								<text :class="swc ? 'textsexg' : 'textsex'">女</text>
							</view>
						</view>
						
						<view style="height: 6vh; margin-bottom: 7%; display: flex; align-items: center;  border-radius: 40rpx; border: 2rpx solid #ccc;">
							<picker mode="date" :value="form1.birth" start="1900-01" :end="currenttime" fields="month" @change="bindDateChange" style="width: 100%; height: 100%; display: flex; align-items: center; padding-left:3%;">
							    <text :style="form1.age === '' ? 'font-size:30rpx; color: #a2a2a2; width: 100%; white-space: nowrap;' : 'font-size:30rpx; color: #000000; width: 100%; white-space: nowrap;' ">{{form1.birth}}</text>
							</picker>
						</view>
					
						<view  style="height: 6vh;  display: flex; align-items: center;  border-radius: 40rpx;">  
							<button  :class="form1.username === '' || form1.age === '' || form1.birth == '出生年月' ? 'noB-bt' : 'B-bt'" @click="adduser">{{Bttext}}
							</button>
						</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import { base64ToPath } from '../../js_sdk/mmmm-image-tools';
	export default {
		data() {

			return {
				form:{
					user: '默认账号',
					username: '默认用户',
					sex: '男',
					age: '0',
					birth: '出生年月',
					date: 'Wed, 03 Jan 2024 00:00:00 GMT',
					is_default: '1'
				},
				imgurl: '../../static/imagetest.png',
				form1:{
					username: '',
					sex:'男',
					age:'0',
					birth:'出生年月',
					is_default : '0'
				},
				test: [0,0,0,0,0,0,0],
				i2t: 'i',
				error: false,
				success: true,
				login: false,
				currenttime: '',
				year: '',
				swc: false,
				infoman: [],
				resultlist:[],
				Bttext: '创建用户',
				errormessgae: '',
				finish: false,
				imagesize: 40,
				deleteindex: 0,
				time1:null
			}
		},
		onLoad() {
			let current = new Date();
			let year = current.getFullYear();
			this.year = year;
			let month = current.getMonth()+1;
			if (month < 10) {
			        month = '0' + month;
			}
					
			this.currenttime = year + '-' + month;
			this.imagesize = uni.getSystemInfoSync().screenHeight*0.07;
			// console.log(this.imagesize);
			this.getdefault();
		},
	
		onShow() {
			var that = this;
			this.$device(function(result){
				if (result==1){
					
					let user = uni.getStorageSync('user');
					if (user){
						if (!that.success && that.login){
							uni.showLoading({
								mask:true,
								title:'重新加载中',
							})
							setTimeout(()=>{
								that.getdefault();
								
							},3000)
							setTimeout(()=>{
								uni.hideLoading();
							},3000)
						}
						// if (!that.success){
						// 	setInterval(()=>{
						// 		that.getdefault();
						// 	},5000)
						// }
					}else{
						that.login = false;
					}

				}else if(result==2){
		
						uni.showToast({
							icon:'error',
							title:'账号在异地登录',
							mask:true
						})
						setTimeout(()=>{
							uni.reLaunch({
								url:'/pages/user/user'
							})
						},1000)	
						
				}else if (result==4){
					that.login = false;
					uni.navigateTo({
						url:'/pages/login/login'
					})
				}else{
					let user1 = uni.getStorageSync('user');
					if (user1){
						
					}else{
						that.login = false;
					}
				}
				
			});
			this.time1=setInterval(()=>{
				this.$device(function(result){
					if (result==1){
						
						let user = uni.getStorageSync('user');
						if (user){
							if (!that.success){
								uni.showLoading({
									mask:true,
									title:'重新加载中',
								})
								setTimeout(()=>{
									that.getdefault();
									
								},3000)
								setTimeout(()=>{
									uni.hideLoading();
								},3000)
							}
							// if (!that.success){
							// 	setInterval(()=>{
							// 		that.getdefault();
							// 	},5000)
							// }
						}else{
							that.login = false;
						}
				
					}else if(result==2){
						
							uni.showToast({
								icon:'error',
								title:'账号在异地登录',
								mask:true
							})
							setTimeout(()=>{
								uni.reLaunch({
									url:'/pages/user/user'
								})
							},1000)	
							
					}else if (result==4){
						that.login = false;
						uni.navigateTo({
							url:'/pages/login/login'
						})
					}else{
						let user1 = uni.getStorageSync('user');
						if (user1){
							
						}else{
							that.login = false;
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
			
		
		},
		methods: {
			
			
			getdefault(){
				uni.showLoading({
					mask:true
				});
				const userData =   uni.getStorageSync('user');
				if (userData){
					var that = this;
					uni.request({
						url: that.$BASE_URL+'/getinfo0',
						header:{Authorization: 'Bearer '+userData.access_token},
						method:'GET',
						success: (res) => {
							const data = res.data;
							if(res.statusCode == 401){
								uni.request({
									url:that.$BASE_URL+'/refresh',
									header:{Authorization: 'Bearer '+userData.refresh_token},
									method: 'GET',
									success: (res) => {
										const data = res.data;
										if (res.statusCode == 401){
											uni.hideLoading();
											uni.showToast({
												icon:'none',
												title:'登录已过期'
												
											});
											uni.removeStorage({
												key: 'user'
											});
										
											uni.navigateTo({
												url:'/pages/login/login'
											});
										}else if(data.code == '200'){
											// console.log(data.data);
											uni.setStorageSync('user',data.data)
											uni.setStorage({
												key: 'user',
												data:{
													refresh_token: userData.refresh_token,
													access_token: data.data,
												}
											});
											setTimeout(() => {
												that.getdefault();
											}, 500); 
										
										}
									},
									fail: (err) => {
										uni.hideLoading();
										that.success = false;
										that.login = true;
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
									
										}
										 else {
										  uni.showToast({
										    icon: 'none',
										    title: '请求失败，请稍后重试'
										  });
										}	
									}
								})
							}else if (data.code == '200'){
								
								uni.hideLoading();
								that.form = data.data;
								// console.log('dwd',that.form);
								that.infoman = data.infoman;
								for (let i=0;i<data.result.length;i++){
									data.result[i].resultimg = "data:image/jpeg;base64," + data.result[i].resultimg;
								}
								that.resultlist = data.result;
								that.login = true;
								if(that.resultlist.length>0){
									that.finish = true;
								}
								that.success = true;
								
								
							}else{
								uni.hideLoading();
								uni.showToast({
									icon: 'error',
									title: data.msg
								});
								that.success = false;
								that.login = true;
							}
						},
						fail: (err) => {
							uni.hideLoading();
							that.success = false;
							that.login = true;
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
							  
							}
							 else {
							  uni.showToast({
							    icon: 'none',
							    title: '请求失败，请稍后重试'
							  });
							}	
						}
					})
					
				}else{
					uni.hideLoading();

					
				}
			},
			cancel(){
				this.$refs.delete.close();
			},
			exit(){
				this.$refs.showRight.close();
				this.$refs.exit.open('center');
			},
			cancelexit(){
				this.$refs.exit.close();
			},
			exitfinish(){
				this.$refs.exit.close();
				uni.removeStorageSync('user');
				uni.reLaunch({
					url:'/pages/user/user'
				})
			},
			deletefinish(){
				//对deleteindex的进行操作
				uni.showLoading({
					mask:true
				});
				const userData =   uni.getStorageSync('user');
			
				if (userData){
					var that = this;
					uni.request({
						url: this.$BASE_URL +'/deleteresult',
						header:{Authorization: 'Bearer '+userData.access_token},
						method:'POST',
						data:{'result_id':this.resultlist[this.deleteindex].result_id},
						success: (res) => {
							const data = res.data;
							if(res.statusCode == 401){
								uni.request({
									url:that.$BASE_URL+'/refresh',
									header:{Authorization: 'Bearer '+userData.refresh_token},
									method: 'GET',
									success: (res) => {
										const data = res.data;
										if (res.statusCode == 401){
											uni.hideLoading();
											uni.showToast({
												icon:'none',
												title:'登录已过期'
												
											});
											uni.removeStorage({
												key: 'user'
											});
										
											uni.navigateTo({
												url:'/pages/login/login'
											});
										}else if(data.code == '200'){
											// console.log(data.data);
											uni.setStorageSync('user',data.data)
											uni.setStorage({
												key: 'user',
												data:{
													refresh_token: userData.refresh_token,
													access_token: data.data,
												}
											});
											setTimeout(() => {
												that.deletefinish();
											}, 500); 
										
										}
									},
									fail: (err) => {
										uni.hideLoading();
										that.success = false;
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
									
										}
										 else {
										  uni.showToast({
										    icon: 'none',
										    title: '请求失败，请稍后重试'
										  });
										}	
									}
								})
							}
							//
							else if (data.code == '200'){
								uni.hideLoading();
								that.resultlist.splice(that.deleteindex,1);
								if (that.resultlist.length ==0){
									that.finish = false;
								}
								uni.showToast({
									icon:'success',
									title:'删除报告成功'
								})
								that.$refs.delete.close();
								
							}
							else{
								uni.hideLoading();
								uni.showToast({
									icon: 'error',
									title: data.msg
								});
								
							}
						},
						fail: (err) => {
							uni.hideLoading();
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
							  
							}
							 else {
							  uni.showToast({
							    icon: 'none',
							    title: '请求失败，请稍后重试'
							  });
							}	
						}	
					})
				}
				
			},
			
			deleteresult(index){
				this.$refs.delete.open('center');
				this.deleteindex = index;
				// console.log(index);
			
			},
			result(index){
				
				let img1 = this.resultlist[index].sicknessimg1;
				let img2 = this.resultlist[index].sicknessimg2;
				let img3 = this.resultlist[index].sicknessimg3;
				// 检查前缀是否已添加
				if (!img1.startsWith("data:image/jpeg;base64,")) {
				   
					img1 = "data:image/jpeg;base64," + img1;
				}
				
				if (!img2.startsWith("data:image/jpeg;base64,")) {
				    img2 = "data:image/jpeg;base64," + img2;
				}
				
				if (!img3.startsWith("data:image/jpeg;base64,")) {
				    img3 = "data:image/jpeg;base64," + img3;
				}

				let result = this.resultlist[index];
				result.sicknessimg1 = img1;
				result.sicknessimg2 = img2;
				result.sicknessimg3 = img3;
				
				
				uni.navigateTo({
					url:'/pages/user/result?result='+encodeURIComponent(JSON.stringify(result))
				})
			},
			formatDate(dateString) {
			  const date = new Date(dateString);
			  const year = date.getFullYear();
			  const month = (date.getMonth() + 1).toString().padStart(2, '0');
			  const day = date.getDate().toString().padStart(2, '0');
			  return `${year}/${month}/${day}`;
			},
			loginorexit(){
				if(this.login){
					// console.log('已登录');
					this.showDrawer();
				}else{
					uni.navigateTo({
						url:'/pages/login/login'
					});
				}
				
			},
			showDrawer() {
				this.$refs.showRight.open();
			},
			add(){
				this.$refs.showRight.close();
				
				this.$refs.popup.open('bottom');
		
				
			},
			alluser(){
				const userData =   uni.getStorageSync('user');
				if(userData){
					
					uni.navigateTo({
						url:'/pages/user/alluser?infoman='+JSON.stringify(this.infoman)
					})
				}
			},
			Binput(e){
				const o = e;
				const inputRule = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g;
				this.$nextTick(function() {
					this.form1.username = o.replace(inputRule , '');
					if (this.form1.username){
						this.i2t = 't';
					}
					else{
						this.i2t = 'i';
				
					}
				})
				
			},
			Bfocus(){
				this.error = false;
				this.errormessgae = '';
			},
			switchchange: function(e){
				if(e.detail.value){
					this.swc = true;
					this.form1.sex = '女';
				}
				else{
					this.swc = false;
					this.form1.sex = '男';
				}
				
			},
			bindDateChange: function (e) {
				this.form1.birth = e.detail.value;
				let parts = this.form1.birth.split("-");
				let years = parseInt(parts[0]);
				this.form1.age = this.year-years;
			},
			adduser(){
				if(this.form1.username !=='' && this.form1.age !=='' && this.form1.birth !='出生年月'){
					const isExist = this.infoman.some(item => item.username === this.form1.username);
					if (isExist){
						this.error = true;
						this.errormessgae = '该用户名已经存在，请使用其他用户名';
						
					}
					else{
						this.Bttext = '创建中...';
						var that = this;
						const userData =   uni.getStorageSync('user');
						if (userData){
							uni.request({
								url: this.$BASE_URL+'/adduser',
								method: 'POST',
								header:{Authorization: 'Bearer '+userData.access_token},
								data: this.form1,
								success: (res) => {
									const data = res.data;
									if(res.statusCode == 401){
										uni.request({
											url:that.$BASE_URL+'/refresh',
											header:{Authorization: 'Bearer '+userData.refresh_token},
											method: 'GET',
											success: (res) => {
												const data = res.data;
												if (res.statusCode == 401){
													uni.showToast({
														icon:'none',
														title:'登录已过期'
														
													});
													that.Bttext= '创建用户';
													uni.removeStorage({
														key: 'user'
													});
													
													uni.navigateTo({
														url:'/pages/login/login'
													});
												}else if(data.code == '200'){
													// console.log(data.data);
													uni.setStorageSync('user',data.data)
													uni.setStorage({
														key: 'user',
														data:{
															refresh_token: userData.refresh_token,
															access_token: data.data,
														}
													});
													setTimeout(() => {
														that.adduser();
													}, 500); 
													
												}
											},
											fail: (err) => {
												that.Bttext= '创建用户';
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
												  
												}
												 else {
												  uni.showToast({
												    icon: 'none',
												    title: '请求失败，请稍后重试'
												  });
												}	
											}
										})
									}
									else if (data.code == '200') {
										that.Bttext= '创建用户';
										that.$refs.popup.close();
										uni.showToast({
											icon: 'success',
											title: '成功',
											mask:true
										});
										setTimeout(()=>{
											uni.reLaunch({
												url:'/pages/user/user'
											})
										},500);
										
									}else{
										uni.showToast({
											icon: 'error',
											title: data.msg
										});
										that.Bttext= '创建用户';
									}
									
									
								},
								fail: (err) => {
									
									that.Bttext= '创建用户';
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
						}
						
					}
							
					
				}
			},
			change(e){
				if(e.show){
					uni.hideTabBar();
				}
				else{
					this.swc = false;
					this.form1.sex = '男';
					this.form1.username = '';
					this.form1.birth = '出生年月';
					this.form1.age = '';
					this.i2t = 'i';
					this.error = false;
					this.errormessgae = '';
					setTimeout(()=>{
							uni.showTabBar();
					},200)
				}
			},
			
			
		}
	}
</script>

<style>
	
	>>>.uni-switch-input::before{
		background-color: #66CCFF;
	}
	.uni-switch-input::before{
		background-color: #66CCFF;
	}
	>>>.uni-easyinput__content-input{
		height: 6vh !important;
		font-size: 30rpx !important;
	}
	>>>.uni-easyinput__content {
		border-radius: 40rpx !important;
	}
	.uni-easyinput__content-input{
		height: 6vh !important;
		font-size: 30rpx !important;
	}
	.uni-easyinput__content {
		border-radius: 40rpx !important;
	}
	.bt-click{
		color: #b2b2b2 !important;
	}
	.info {
			width: 100%;
			height: 50vh;
			background-color: #fff;
			border-top-left-radius: 2vh;
			border-top-right-radius: 2vh;
		}
	.infobar{
		padding: 5% 4%;
		display: flex;
		height: 4vh;
		align-items: center;
		border-bottom: 2rpx solid #ccc;
		font-weight: 500;
	}
	.infobara{
		padding: 5% 4%;
		display: flex;
		height: 4vh;
		align-items: center;
		justify-content: center;
		text-align: center; /* 添加此行来使文本居中 */
		font-weight: 500;
	}
	.Bicon{
		width: 140rpx;
		height: 140rpx;
		border-radius: 140rpx;
		background-color: #8366c8;
		justify-content: center;
		color: #fff;
		display: flex;
		align-items: center;
		text-align: center;
		position: absolute;
		margin-bottom: 17%;
		font-size: 50rpx;
	}
	.infoback{
		padding-left: 3% ;
		padding-right: 3%;
		padding-top:  2%;
		height: 38vh;
		overflow: auto;
	}
	.sexb{
		display: flex;
		height: 6vh;
		align-items: center;
		margin-bottom: 6%;
		background-color: #EBF6FD;
		border-radius: 40rpx;
	}
	.sexg{
		display: flex;
		height: 6vh;
		align-items: center;
		margin-bottom: 6%;
		background-color: #FEF5F8;
		border-radius: 40rpx;
	}
	.textsex{
		font-size: 30rpx; 
		text-align: center;
		color: #c6c6c6;
	}
	.textsexb{
		font-size: 30rpx; 
		text-align: center;
		color: #66CCFF;
	}
	.textsexg{
		font-size: 30rpx; 
		text-align: center;
		color: #ffacd2;
	}
	.B-bt{
		background-color: #9370DB;
		border-radius: 40rpx; 
		font-size: 30rpx;
		width: 95%;
		color: #fff;
		white-space: nowrap;
		float: right;
		-moz-box-shadow:0px 5rpx 25rpx #7a7a7a;
		-webkit-box-shadow:0px 5rpx 25rpx #7a7a7a;
		box-shadow:0px 10rpx 50rpx #7a7a7a;
	}
	.noB-bt{
		background-color: #E0E0E0;
		border-radius: 40rpx;
		font-size: 30rpx;
		width: 95%;
		color: #B1B1B1;
		white-space: nowrap;
		float: right;
	}
	.as0{
		background-color: #dddddd;
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
		color: #afafaf;
	}
	.separator0 {
	    color: #bababa; 
	}
</style>
