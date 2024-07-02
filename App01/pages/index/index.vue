<template>
	<view class="content">
		<view class="bigtext">
			<text space="ensp" id="bigtext">SkinCloud </text>皮肤云
		</view>
		<view id="indexname">
			肤 测 汇
		</view>
		
		<text space="ensp" id="smalltext">智 能 皮 肤 测 评 ，中 西 病 症 汇 集</text>
		<view class="img">
			<image mode="aspectFill" class="logo"  src="/static/Logos.png"></image>
		</view>
		<view class="text-area">
			<text class="count2">*SkinCloud</text>
			<text class="count1">已提供了</text>
			<text class="count2" >{{count}}</text>
			<text class="count1">人次AI测肤服务</text>    
		</view>
		<view class="bt">
			<view class="camera">
				<button  :class="isChecked ? 'camera-bt' : 'nocamera-bt'" hover-class="camera-bt-click" @click="camera">拍照测评
				</button>
			</view>
			<view class="photo">
				<uni-icons :type="image ?'images' :'images-filled'" class="photo-bt" size="36" :color="isChecked ? '#8366c8' : '#CCC'"  @touchstart=" photostart" @touchend="photoend" @click="photo"></uni-icons>
			</view>
		</view>
		<view  class="radius" >
			<checkbox style="transform: scale(0.8);" :checked="isChecked" @click="isChecked=!isChecked" color="#ffffff" border-color="#8366c8"  activeBorderColor="#8366c8" activeBackgroundColor="#8366c8"/>
			<navigator url="/pages/agreement/agreement"  class="navigator">SkinCloud服务协议</navigator>
		</view>
		

		<uni-popup ref="popup"  @change="change" :is-mask-click="mask ? true: false" >
			<view  class="info" >
				<view v-if="cmodel === 'A'">
					<view class="infobar">
						<text style="font-size: 40rpx; color: #755cb5; ">请选择用户</text>
						<view class="personadd">
							<uni-icons type="personadd-filled"  size="36"  :color="toB ? '#8366c8' : '#CCC'"  @click="skipB"></uni-icons>
						</view>
					</view>
					<view :class="cload == 'A'?'infomanA':'infomanB'">
						<view v-if="cload == 'A'" class="limg">
							<image :src="sl?'../../static/loading.gif': '../../static/fail.png'" mode="heightFix" @click="fc" ></image>
						</view>
						<view v-else-if="cload == 'B'">
							<view v-for="(item,index) in infoman" class="itemall" @click="next(item,camorpho,index)">
									<view class="itemu">
										<view>{{item.username.substring(0,1)}}</view>
									</view>
									<view class="itemui">
										<view class="itemn">
											{{item.username}}
										</view>
										<view class="as">
											<view class="half-width">{{item.age}}</view>
											    <view class="separator">|</view>
											    <view class="half-width">{{item.sex}}</view>
											
										</view>
									</view>
							</view>
						</view>
						
					</view>
				</view>
				
				<view v-else-if="cmodel === 'B'">
					<view class="infobara">
						
						<view class="personback">
							<uni-icons type="arrow-left"  size="36"  color="#8366c8"  @click="skipA"></uni-icons>
							<text @click="skipA">返回</text>
						</view>
						<view class="Bicon" v-if="i2t === 'i'">
							<uni-icons type="person-filled"  size="60"  color="#cccccc" ></uni-icons>
						</view>
						<view class="Bicon" v-else-if="i2t === 't'">
							{{form.username.substring(0,1)}}
						</view>
						<view style="display: flex; justify-content: center;  width: 40%; position: absolute; margin-top: 70rpx;">
							<text style="font-size: 32rpx; color: #755cb5; ">添加新用户</text>
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
										<switch color="#ffacd2"  style=" transform:scale(0.7); align-items: center; dispaly: flex;" @change="switchchange"/>
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
								<button  :class="form.username === '' || form.age === '' ? 'noB-bt' : 'B-bt'" @click="adduser">{{Bttext}}
								</button>
							</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script> 

	// 隐藏原生TabBar
  export default {
    data() {
      return {
		form:{
			username: '',
			sex: '男',
			age: '',
			birth: '出生年月',
			is_default : 0
		},
		form1:{
			info_id:'',
			username: '',
			sex: '男',
			age: '',
		},
		count: 0,
		image: true,
		isChecked: true,
		cmodel: 'A',
		infoman: [],
		cload: 'A',
		sl: true,
		mask: true,
		i2t: 'i',
		swc: false,
		currenttime: '',
		year: '',
		Bttext: '创建用户',
		error: false,
		errormessgae: '',
		toB : false,
		camorpho : true,
		time1:null,
		time2:null
      }
    },
    onLoad() {
		
		
    },
	onShow() {
		uni.showTabBar();
		let current = new Date();
		let year = current.getFullYear();
		this.year = year;
		let month = current.getMonth()+1;
		if (month < 10) {
		        month = '0' + month;
		}
		this.currenttime = year + '-' + month;
		this.Count();
		this.time1=setInterval(()=>{
			this.Count();
		},3600000)
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
					uni.navigateTo({
						url:'/pages/login/login'
					})
			}else{
				
			}
			
		});
		this.time2=setInterval(()=>{
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
						uni.navigateTo({
							url:'/pages/login/login'
						})
				}else{
					
				}
			});
		},3600000)
		
	},
	onHide() {
		clearInterval(this.time1);
		clearInterval(this.time2);
		this.time1 = null;
		this.time2 = null;
	},
    methods: {
	  Count(){
		
		  var that = this;
		  uni.request({
		  	url:this.$BASE_URL+'/count',
			method:'GET',
			success: (res) => {
				
				const data = res.data;
				if (data.code = '200'){
					that.count = data.data;
					uni.setStorage({
						key: 'count',
						data: data.data
					})
				}else{
					const count = uni.getStorageSync('count');
					if (count){
						that.count = count.data;
					}else{
						uni.showToast({
							title: data.msg,
							icon:'error'
						})
						
					}
				}
			
			},
			fail: (error) => {
				
				const count = uni.getStorageSync('count');
				if (count){
					that.count = count;
				}else{
					uni.showToast({
						title: '服务器或网络错误',
						icon:'none'
					})
					
				}
			}
		  })
	  },
	  photostart(){
		if (this.isChecked){
			this.image = false;
		}
	  },
	  photoend(){
	  	if (this.isChecked){
	  		this.image = true;
	  	}			 
	  },
	  photo(){
		 if (this.isChecked){
			 this.toB = false;
			 this.camorpho = false;
			 this.$refs.popup.open('bottom');
			 this.getinfo();
		 }
	  },
      camera() {
		  if (this.isChecked){
			this.toB = false;
			this.camorpho = true;
			this.$refs.popup.open('bottom');
			this.getinfo();
			
		  }
		},
		change(e){
			if(e.show){
				uni.hideTabBar();
			}
			else{
				setTimeout(()=>{
						uni.showTabBar();
				},200)
			}
				
			
		},
		skipB(){
			if( this.toB){
				this.cmodel = 'B';
				this.mask = false;
				
				// 开发先注释掉 
				
				// #ifdef H5
					this.$refs.popup.close();
					setTimeout(()=>{
						this.$refs.popup.open('bottom');
					},300)
				// #endif
			}
		},
		skipA(){
			this.cmodel = 'A';
			this.mask = true;
			this.swc = false;
			this.form.sex = '男';
			this.form.username = '';
			this.form.birth = '出生年月';
			this.form.age = '';
			this.i2t = 'i';
			this.error = false;
			this.errormessgae = '';
			// #ifdef H5
				this.$refs.popup.close();
				setTimeout(()=>{
					this.$refs.popup.open('bottom');
				},300)
			// #endif
		},
		fc(){
			if(!this.sl){
				this.sl = true;
				this.getinfo();
			}
			

		},
		getinfo(){
			const userData =   uni.getStorageSync('user');
			if (userData) {
			   // console.log('feaf');
			   var that = this;
			   that.cload = 'A';
			   that.sl = true;
			   uni.request({
			   	url:that.$BASE_URL+'/getinfo',
				header:{Authorization: 'Bearer '+userData.access_token},
			   	method: 'GET',
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
									that.$refs.popup.close();
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
										that.getinfo();
									}, 1000); 
									
									
								}
							},
							fail: (err) => {
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
					}else if (data.code == '200') {
			   			that.infoman = data.data;
			   			// console.log(that.infoman);
			   			setTimeout(() => {
			   					if (that.infoman.length > 0){
			   							that.cload = 'B';
			   							that.toB = true;
			   					}
			   					else{
			   						that.sl = false;
			   						uni.showToast({
			   						  icon: 'none',
			   						  title: '请求失败，请稍后重试'
			   						});
			   					}
			   			}, 1000); 
			   			
			   		}else{
			   			uni.showToast({
			   				icon: 'error',
			   				title: data.msg
			   			});
			   			that.sl = false;
			   			that.cload = 'A';
			
			   		}
			   		
			   		
			   	},
			   	fail: (err) => {
			   		that.sl = false;
			   		that.cload = 'A';
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
			} else {
			    uni.showToast({
			    	icon:'none',
					title:'未登录'
			    });
				this.$refs.popup.close();
				uni.navigateTo({
					url:'/pages/login/login'
				});
			}
						
		},
		next(item,camorphoto,index){
			// console.log(index);
			// console.log(item);
			
			var that = this;
			if (camorphoto){
				uni.chooseImage({
					count: 1,
					sourceType: ['camera'],
						success: res => {
							// console.log('相机',res.tempFilePaths[0])
							uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePaths[0],
								 success: (suc) =>{
									that.Image = suc.path;
									that.skipA();
									uni.showTabBar();
									that.$refs.popup.close();
									uni.navigateTo({
										url: '/pages/detect/detect1?src='+res.tempFilePaths[0]+'&form='+JSON.stringify(item)
									})
									
								},
								fail: (error)  =>{
									uni.showToast({
										title: "没有权限,保存失败",
										icon: "error"
									});
								},
								
							});
						},
						fail: (err) => {
							// console.log(err);
							if (err.errMsg.includes("chooseImage:fail No Permission")) {
										uni.showToast({
												title: "无权限,调用失败",
												icon: "error"
										});
							} else {
									
							}
						}
					});
			}else{
				uni.chooseImage({
					count: 1,
					sourceType: ['album'],
						success: res => {
							// console.log('相册',res.tempFilePaths[0])
							that.skipA();
							uni.showTabBar();
							that.$refs.popup.close();
							uni.navigateTo({
								url: '/pages/detect/detect1?src='+res.tempFilePaths[0]+'&form='+JSON.stringify(item)
							})
						
						},
						fail: (err) => {
							
							if (err.errMsg.includes("chooseImage:fail No Permission")) {
										uni.showToast({
										title: "无权限,调用失败",
										icon: "error"
								});
							} else {
									
							}
						}
					});
			}
			
			        
		
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
			if(this.form.username !=='' && this.form.age !==''){
				const isExist = this.infoman.some(item => item.username === this.form.username);
				if (isExist){
					this.error = true;
					this.errormessgae = '该用户名已经存在，请使用其他用户名';
				}
				else{
					this.form1.age = this.form.age;
					this.form1.sex = this.form.sex;
					this.form1.username = this.form.username;
					this.Bttext = '创建中...';
					var that = this;
					const userData =   uni.getStorageSync('user');
					if(userData){
						uni.request({
							url: this.$BASE_URL+'/adduser',
							header:{Authorization: 'Bearer '+userData.access_token},
							method: 'POST',
							data: this.form,
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
												that.skipA();
												that.Bttext= '创建用户';
												uni.removeStorage({
													key: 'user'
												});
												that.$refs.popup.close();
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
									that.form1.info_id = data.data;
									// console.log(that.form1);
									that.skipA();
									uni.showTabBar();
									that.$refs.popup.close();
									if (that.camorpho){
										uni.chooseImage({
											count: 1,
											sourceType: ['camera'],
												success: res => {
													// console.log('相机',res.tempFilePaths[0])
													uni.saveImageToPhotosAlbum({
													filePath: res.tempFilePaths[0],
														 success: (suc) =>{
															that.Image = suc.path;
														
															uni.navigateTo({
																url: '/pages/detect/detect1?src='+res.tempFilePaths[0]+'&form='+JSON.stringify(that.form1)
															})
															
														},
														fail: (error)  =>{
															uni.showToast({
																title: "没有权限,保存失败",
																icon: "error"
															});
														},
														
													});
												},
												fail: (err) => {
													
													if (err.errMsg.includes("chooseImage:fail No Permission")) {
																uni.showToast({
																title: "无权限,调用失败",
																icon: "error"
														});
													} else {
															
													}
												}
											});
									}else{
										uni.chooseImage({
											count: 1,
											sourceType: ['album'],
												success: res => {
													// console.log('相册',res.tempFilePaths[0])
													
													uni.navigateTo({
														url: '/pages/detect/detect1?src='+res.tempFilePaths[0]+'&form='+JSON.stringify(that.form1)
													})
												
												},
												fail: (err) => {
													if (err.errMsg.includes("chooseImage:fail No Permission")) {
																uni.showToast({
																title: "无权限,调用失败",
																icon: "error"
														});
													} else {
															
													}
												}
											});
									}
									
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
		}
		
		
		
		
		
		
		
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
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.bigtext{
		margin-top: 2%;
		color: #7159af;
		font-size: 24rpx;
		text-align: center;
		/* font-weight: bold; */
		
	}
	#bigtext{
		color: #2b2b2b;

	}
	#indexname{
		font-size: 70rpx;
		color: #8366c8;
		text-align: center;
	}
	#smalltext{
		color: #838383;
		font-size: 28rpx;
		text-align: center;

	}
	.img{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
		padding-top: 1%;
		
	}
	.logo{
		height: 45vh;
	/* 	min-width: 800rpx;
		min-height: 600rpx;
		max-width: 1000rpx;
		max-height: 800rpx; */
	}


	.text-area {
		text-overflow:ellipsis;
		font-size: 26rpx;
		text-align: center;
		color:#8366c8;
		letter-spacing:1rpx; 
		white-space: nowrap;
		text-decoration: overline;
	
	}

	.count2 {
		color:  #8366c8;
		word-break:break-all;
		
	}
	.count1 {
		color:  #838383;
		
	}
	.bt{
		padding-top: 17%;
		width: 100%;
		display: flex;
		
		position: relative;
		align-items: center;
		justify-content: space-around;
	}
	.camera{
		width: 70%;
		
	}
	.camera-bt{
		background-color: #9370DB;
		border-radius: 40rpx; 
		font-size: 28rpx;
		width: 65%;
		color: #fff;
		white-space: nowrap;
		float: right;
		-moz-box-shadow:0px 5rpx 25rpx #7a7a7a;
		-webkit-box-shadow:0px 5rpx 25rpx #7a7a7a;
		box-shadow:0px 5rpx 25rpx #7a7a7a;
		
	}
	.nocamera-bt{
		background-color: #CCC;
		border-radius: 40rpx;
		font-size: 28rpx;
		width: 65%;
		color: #e2e2e2;
		white-space: nowrap;
		float: right;
		-moz-box-shadow:0px 5rpx 25rpx #7a7a7a;
		-webkit-box-shadow:0px 5rpx 25rpx #7a7a7a;
		box-shadow:0px 5rpx 25rpx #7a7a7a;
	}
	.camera-bt-click{
		color:  #e2e2e2;
		/* top: 3rpx; */
	}
	.photo{
		
		width: 20%;
	}
	.photo-bt{
		background-color: #e2e2e2;
		color: #fff;
		float: left;
		border-radius: 25px;
	}
	.photo-bt-click{
		color: #e2e2e2;
	}
	.radius {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		padding-top: 3%;
		width: 100%;

	}
	.radius > view {
	     width: 100%; /* 使视图覆盖整个宽度 */
	     display: flex;
	     justify-content: center;
	     align-items: center;
	}
	.navigator {
		text-decoration: underline !important; 
		background-color: transparent !important; 
		font-size: 26rpx;
		color: #999999 !important; 
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
	.personadd{
		background-color: #ececec;
		color: #fff;
		display: flex;
		justify-content: flex-end;
		margin-left: auto;
		border-radius: 25px;
		position: relative;

	}
	.infomanA{
		padding-left: 3% ;
		padding-right: 3%;
		padding-top:  2%;
		height: 38vh;
		overflow: hidden;
	}
	.infomanB{
		padding-left: 3% ;
		padding-right: 3%;
		padding-top:  2%;
		height: 38vh;
		overflow: auto;
		
	}
	.limg{
		display: flex;
		justify-content: center;
		align-items: center;
		padding: auto;
		transform: scale(0.4);
	}
	.itemall{
		display: flex;
		align-items: center;
		padding-top: 2%;
	}
	.itemu{
		width: 90rpx; 
		height: 90rpx; 
		border-radius: 50%; 
		background-color: #7259b1;
		font-size: 36rpx;
		display: flex;
		margin-right: 6%;
		color: #fff;
		justify-content: center;
		align-items: center; 
		line-height: 1;
	}
	.itemui{
		display: flex;
		align-items: center;
		border-bottom: 2rpx solid #ccc;
		width: calc(100% - 90rpx - 6%);
		height: 90rpx;
	}
	.itemn{
		overflow: hidden; 
		white-space: nowrap; 
		text-overflow: ellipsis;
		font-size:32rpx;
		width: 60%;
	}
	.as{
		background-color: #ececec;
		width: 28%;
		height: 60%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		margin-left: auto;
		white-space: nowrap; 
		text-align: center;
		margin-right: 3%;
		border-radius: 30rpx;
		font-size:25rpx;
	}
	.half-width {
	    width: 50%;
	    text-align: center;
		color: #b6b6b6;
	}
	
	.separator {
	    color: #ccc; 
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
	.personback{
		color: #8366c8;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-right: auto;
		position: relative;
		font-size:36rpx;
		width: 40%;
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