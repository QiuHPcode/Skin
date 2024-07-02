<template>
	<view>
		<view v-for="(item,index) in infoman" :key="index">
			<view style="padding-top: 3%; padding-bottom: 3%; background-color: #ECEFF1; display: flex; justify-content: center; justify-content: center;">
				<uni-card :is-full="true"  style="white-space: nowrap; text-overflow: ellipsis;margin-left: 5%; margin-right: 5%; border-radius: 30rpx;">
					<view  style="height: 45px; display: flex; justify-content: flex-start; align-items: center;">
						<view style="width: 45px; height: 45px; border-radius: 50%; background-color: #8366c8; font-size: 22.5px; display: flex; color: #fff; justify-content: center; align-items: center; margin-right: 2%;">
							<text>
								{{item.username.substring(0,1)}}
							</text>
							
						</view>
						<view style="flex: 1; display: flex; justify-content: center; align-items: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; ">
								<text style="font-size: 18px; color: #000;  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">用户名：{{item.username}}</text>
						</view>
					</view>
					<view style=" white-space: nowrap; text-overflow: ellipsis; width: 100%;  display: flex; align-items: center; justify-content: flex-start; padding-top: 2%; margin-top: 2%; border-top: 2rpx solid #b2b2b2;">
						<view style=" white-space: nowrap; text-overflow: ellipsis; margin-left: 5%;">
							<text style="color: #b0adbd; font-size:15px">创建于:{{formatDate(item.date)}}</text>
						</view>
					</view>
					<uni-collapse>
						<view>
							<uni-collapse-item title-border="none" :open="index==0 ? true: false">
								<view style="display: flex; justify-content: flex-start; align-items: center;margin-left: 5%; ">
									<view >
										<view style="display: flex; justify-content: flex-start; align-items: center;">
											<view style="width: 30px; height: 30px; display: flex; justify-content: center; align-items: center;">
												<view style="width: 10px; height: 10px; border-radius: 50%; background-color: #8366c8;"></view>
											</view>
											<view style="text-align: center;display: flex; justify-content: center; align-items: center;">
												<text style="font-size: 15px;">性别:{{item.sex}}</text>
											</view>
										</view>
										<view style="display: flex; justify-content: flex-start; align-items: center;">
											<view style="width: 30px; height: 30px; display: flex; justify-content: center; align-items: center;">
												<view style="width: 10px; height: 10px; border-radius: 50%; background-color: #8366c8;"></view>
											</view>
											<view style="text-align: center;display: flex; justify-content: center; align-items: center;">
												<text style="font-size: 15px;">出生年月:{{item.birth}}</text>
											</view>
										</view>
									</view>
									<view style="margin-left: auto; display: flex; justify-content: center; align-items: center;">
										<uni-icons v-if="index!=0" type="trash-filled" size="28" color="#b2b2b2" @click="deleteuser(index)"></uni-icons>
										<uni-icons type="compose" size="28" color="#b2b2b2" @click="changeuser(index,item)"></uni-icons>
										
									</view>
								</view>
							</uni-collapse-item>
						</view>
					</uni-collapse>
				</uni-card>
			</view>
		</view>
		<uni-popup ref="popup" @change="change">
			<view class="info">
				<view class="infobara">
					<view class="Bicon" v-if="i2t == 'i'">
						<uni-icons type="person-filled"  size="60"  color="#cccccc" ></uni-icons>
					</view>
					<view class="Bicon" v-else-if="i2t == 't'">
						{{form.username.substring(0,1)}}
					</view>
					<view style="display: flex; justify-content: center;  width: 40%; position: absolute; margin-top: 70rpx;">
						<text style="font-size: 32rpx; color: #755cb5; ">编辑用户</text>
					</view>
				</view>
				<view class="infoback">
					<view style="padding-top: 2%;">
						<uni-easyinput v-model="form.username" :error-message=" error ? 'errorMessage' : ''" placeholder="用户名称" placeholder-style="font-size:30rpx" :clearable="true" primaryColor="#8366c8"  @input="Binput" @focus="Bfocus"></uni-easyinput>
						<text style="padding-left: 3%; font-size: 28rpx; color: #ff0000 ;">{{errormessgae}}</text>
					</view>
					
					<view :class="swc ? 'sexg' : 'sexb' ">
						<text  :style="swc? 'padding-left: 3%; color: #ffacd2; font-size: 30rpx;': 'padding-left: 3%; color: #66CCFF; font-size: 30rpx;' ">性别</text>
						<view style="display: flex; justify-content: flex-end; align-items: center; margin-left: auto; padding-right: 3%;">
							<text :class="swc ? 'textsex' : 'textsexb'">男</text>
							<view style="height: 100%; display: flex; justify-content: center; align-items: center; padding: 0 2%;">
								<switch color="#ffacd2" :checked="swc ? true : false" style=" transform:scale(0.7); align-items: center; dispaly: flex;" @change="switchchange"/>
							</view>
							<text :class="swc ? 'textsexg' : 'textsex'">女</text>
						</view>
					</view>
					
					<view style="height: 6vh; margin-bottom: 7%; display: flex; align-items: center;  border-radius: 40rpx; border: 2rpx solid #ccc;">
						<picker mode="date" :value="form.birth" start="1900-01" :end="currenttime" fields="month" @change="bindDateChange" style="width: 100%; height: 100%; display: flex; align-items: center; padding-left:3%;">
							<text :style="form.age === '' ? 'font-size:30rpx; color: #a2a2a2; width: 100%; white-space: nowrap;' : 'font-size:30rpx; color: #000000; width: 100%; white-space: nowrap;' ">{{form.birth}}</text>
						</picker>
					</view>
				
					<view  style="height: 6vh;  display: flex; align-items: center;  border-radius: 40rpx;">  
						<button  :class="form.username === '' || form.age === ''|| (form.username == infoman[changeindex].username && form.age ==infoman[changeindex].age && form.sex ==infoman[changeindex].sex) ? 'noB-bt' : 'B-bt'" @click="adduser">{{Bttext}}
						</button>
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="delete" :is-mask-click="false" >
			<view style="width: 280px; height: 130px; background-color: #fff; border-radius: 2vh;  ">
				<view style="text-align: center; display: flex; justify-content: center; align-items: center;padding-top: 20px;">
					<text style="color: #8366c8; font-size: 20px;">请确定删除该用户?</text>
				</view>
				<view style="text-align: center; display: flex; justify-content: center; align-items: center;">
					<text style="color: #b2b2b2; font-size: 14px;">*删除用户后报告也跟随删除且无法还原</text>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					info_id: '',
					username: '',
					sex: '男',
					age: '0',
					birth: '出生年月',
					date: '',
					is_default: 0
				
				},
				infoman:[],
				changes:{
					user_id: '',
					username: '',
					sex: '男',
					age: '0',
					birth:'出生年月',
					is_default: '0'
				
				},
				i2t: 't',
				error: false,
				currenttime: '',
				year: '',
				swc: false,
				infoman: [],
				Bttext: '保存',
				errormessgae: '',
				test:[0,0,0,0,0],
				changeindex: 0,
				deleteindex: 0,
				time1:null
			}
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
						// console.log('fefe');
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
							// console.log('fefe');
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
		onLoad: function(option) {
			const infoman =JSON.parse(option.infoman) ;
			this.infoman = infoman;
			// console.log(this.infoman);
			let current = new Date();
			let year = current.getFullYear();
			this.year = year;
			let month = current.getMonth()+1;
			if (month < 10) {
			        month = '0' + month;
			}
			this.currenttime = year + '-' + month;
			
		},
		onBackPress() {
			setTimeout(() => {
				uni.reLaunch({
					url:'/pages/user/user'
				})	
				}, 200)
			return true
		},
		onHide() {
			clearInterval(this.time1);
			this.time1 = null;
		},
		methods: {
			
			formatDate(dateString) {
			  const date = new Date(dateString);
			  const year = date.getFullYear();
			  const month = (date.getMonth() + 1).toString().padStart(2, '0');
			  const day = date.getDate().toString().padStart(2, '0');
			  return `${year}/${month}/${day}`;
			},
			deleteuser(index){
				
				this.$refs.delete.open('center');
				this.deleteindex = index;
				// console.log('删除',this.deleteindex);
				
			},
			changeuser(index,item){
				
				this.changeindex = index;
				if(index == 0){
					this.form.is_default = 1;
				}
				else{
					this.form.is_default = 0;
				}
				this.form.info_id = item.info_id;
				this.form.username = item.username;
				this.form.sex = item.sex;
				this.form.birth = item.birth;
				this.form.age = item.age;
				if(this.form.sex == '女'){
					this.swc = true;
				}
				if (this.form.username){
					this.i2t = 't';
				}
				else{
					this.i2t = 'i';
				
				}
				this.$refs.popup.open('bottom');
				// console.log('修改');
				
				
			},
			Binput(e){
				const o = e;
				const inputRule = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g;
				this.$nextTick(function() {
					this.form.username = o.replace(inputRule , '');
					if (this.form.username){
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
					this.form.sex = '女';
				}
				else{
					this.swc = false;
					this.form.sex = '男';
				}
				
			},
			bindDateChange: function (e) {
				this.form.birth = e.detail.value;
				let parts = this.form.birth.split("-");
				let years = parseInt(parts[0]);
				this.form.age = this.year-years;
			},
			adduser(){
				if(this.form.username !=='' && this.form.age !=='' && (this.form.username != this.infoman[this.changeindex].username || this.form.age !=this.infoman[this.changeindex].age || this.form.sex !=this.infoman[this.changeindex].sex)){
					const isExist = this.infoman.some(item => item.username === this.form.username);
					if (isExist&&this.form.username != this.infoman[this.changeindex].username){
						this.error = true;
						this.errormessgae = '该用户名已经存在，请使用其他用户名';
						
					}
					else{
						this.Bttext = '保存中...';
						var that = this;
						const userData =   uni.getStorageSync('user');
						uni.request({
							url: that.$BASE_URL+'/changeuser',
							method: 'POST',
							header:{Authorization: 'Bearer '+userData.access_token},
							data: this.form,
							success: (res) => {
								const data = res.data;
								that.Bttext= '保存';
								if (data.code == '200') {
									that.Bttext= '保存';
									that.$refs.popup.close();
									that.infoman[that.changeindex].sex = that.form.sex;
									that.infoman[that.changeindex].username = that.form.username;
									that.infoman[that.changeindex].age = that.form.age;
									that.infoman[that.changeindex].birth = that.form.birth;

									uni.showToast({
										icon: 'success',
										title: '成功'
									});
								}else{
									uni.showToast({
										icon: 'error',
										title: data.msg
									});
									that.Bttext= '保存';
								}
								
								
							},
							fail: (err) => {
								
								that.Bttext= '保存';
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
				else{
					// console.log('无效');
				}
			},
			change(e){
				if(e.show){
					uni.hideTabBar();
				}
				else{
					this.swc = false;
					this.error = false;
					this.errormessgae = '';
					setTimeout(()=>{
							uni.showTabBar();
					},200)
				}
			},
			cancel(){
				this.$refs.delete.close();
			},
			deletefinish(){
				//对deleteindex的进行操作
				uni.showLoading({
					mask:true
				});
				const userData =   uni.getStorageSync('user');
							
				if (userData&&this.infoman[this.deleteindex].is_default == 0){
					var that = this;
					uni.request({
						url: this.$BASE_URL +'/deleteuser',
						header:{Authorization: 'Bearer '+userData.access_token},
						method:'POST',
						data:{'info_id':this.infoman[this.deleteindex].info_id},
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
								that.infoman.splice(that.deleteindex,1);
								uni.showToast({
									icon:'success',
									title:'删除用户成功'
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
</style>
