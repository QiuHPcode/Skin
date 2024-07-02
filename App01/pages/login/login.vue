<template>
	<view  >

		<view class="login-wrap"> <!-- 200rpx == 100px -->
			<view id="logname">
				登录
			</view>
			<view class="login">
				<uni-easyinput   id="logini" type="text"  v-model="form.user" :error-message=" errori ? 'errorMessage' : ''"
					:prefixIcon="showpersonIcon ? 'person' : ' '" :suffixIcon="showpersonIcon ? 'clear' : ' '" :clearable="showClearIcon" :placeholder="persontext ? '请输入登录账号' : ''"
					@focus="personFocus" @blur="personBlur" @iconClick="personbt" @input="personInput" />
			</view>

			<view class="login">
				<uni-easyinput id="loginj"  :type="ty ? 'password':'text'" :error-message=" errorj ? 'errorMessage' : ''"
					:passwordIcon="showPasswordIcon"  :clearable="showClearIcon" v-model="form.password"
					:prefixIcon="showeyeIcon ? eyeshow() : ' '" :suffixIcon="showeyeIcon ? 'clear' : ' '" :placeholder="eyetext ? '请输入登录密码' : ''"
					@focus="eyeFocus" @blur="eyeBlur" @iconClick="eyebt" @input="eyeInput"/>
			</view>

			<view class="login">
				<button type="primary" @click="login" style="background-color: #9370DB; border-radius: 20px; font-size: 35rpx; word-spacing: 20rpx;">登
					录</button>
			</view>
			
			<view class="sz">
				<navigator id="toreg" url="/pages/register/register" >前往注册</navigator>
				<navigator id="tofor" :url="'/pages/forget/forget?value=' + form.user" >忘记密码?</navigator>	
			</view>
			
			<!-- 	<label class="checkbox d-flex a-center" >
							<checkbox :checked="check" />
							<text class="text-light-muted font">已阅读并同意XXXXX协议</text>
			</label> -->

			<view class="login">
				<uni-popup ref="popup"  style="height: 100rpx;" @change="change">
					<view  class="radius" >
						<!-- <input type="checkbox" />	 -->
						<checkbox :checked="isChecked" @click="isChecked=!isChecked" color="#ffffff" border-color="#8366c8"  activeBorderColor="#8366c8" activeBackgroundColor="#8366c8"/>
						<text style="color: #999999;">我同意</text>
						<navigator url="/pages/agreement/agreement"  class="navigator">SkinCloud服务协议</navigator>
						
					</view>
				</uni-popup>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					user: '',
					password: '',
					deviceid: ''
				},
				showPasswordIcon: false,
				showClearIcon: false,
				showeyeIcon: false,
				persontext: true,
				showpersonIcon: false,
				eyetext: true,
				ty :true, 
				showeye :true,
				errori :false,
				errorj :false,
				isChecked : true
				
			}
		},
		// mounted() {
		// 	// #ifdef H5
		// 	var webH5 = document.getElementsByClassName('uni-page-head-btn')[0];
		// 	webH5.style.display = 'none';
		// 	// #endif

		// },
		methods: {
			personFocus() {
				// 输入框获得焦点时触发的函数
				this.persontext = false;
				this.errori = false;
			},
			personInput(e){
				if (e == ''){
					this.showpersonIcon = false;
				}else{
					
					this.showpersonIcon = true;
				}
				const o = e;
				const inputRule = /[\W_]/g;//修改inputRule 的值
				this.$nextTick(function() {
					this.form.user = o.replace(inputRule , '');
					if (this.form.user == '')
					{
						this.showpersonIcon = false;
					}
				})	
			},
			personBlur() {
				// 输入框失去焦点时触发的函数
				if (this.form.user == ''){
					this.showpersonIcon = false;
				}
				this.persontext = true;
			},
			personbt(type){
				if(type === 'suffix'){
					this.form.user = '';
					this.showpersonIcon = false;
				}
				else{
					uni.showToast({
						icon:'none',
						title:'账号至少为6位,英文数字均可'
					})
				}
			},
			eyeFocus() {
				// 输入框获得焦点时触发的函数
				
				this.eyetext = false;
				this.errorj = false;
			},
			eyeInput(e){
				if (e == ''){
					this.showeyeIcon = false;
				}
				this.showeyeIcon = true;
				const o = e;
				const inputRule = /[\u4E00-\u9FA5\s]/g;//修改inputRule 的值
				this.$nextTick(function() {
					this.form.password = o.replace(inputRule , '');
					if (this.form.password == '')
					{
						this.showeyeIcon = false;
					}
				})	
				
			},
			eyeBlur() {
				// 输入框失去焦点时触发的函数
				
				if (this.form.password ==''){
					this.showeyeIcon = false;
				}
				this.eyetext = true;
			},
			eyebt(type) {
				if (type === 'prefix'){
					this.ty = !this.ty;
					this.showeye = !this.showeye;
				}else{
					this.form.password = '';
					this.showeyeIcon = false;
				}
				
			},
			eyeshow() {
				
				return this.showeye ? 'eye-slash' : 'eye' ;
			},
			login() {
			  if( this.form.user == '' && this.form.password == '') {//内容按自己实际的内容填写
					this.errori = true;
					this.errorj = true;
					uni.showToast({
						icon: 'error',
			  			title: '输入不能为空'	
			  		});
			  		return;
			  	}else if ( this.form.user == ''){
					this.errori = true;
					uni.showToast({
						icon: 'error',
						title: '账号不能为空'
					});
					return;
				}
				else if ( this.form.password == ''){
					this.errorj = true;
					uni.showToast({
						icon: 'error',
						title: '密码不能为空'
					});
					return;
				}else if (this.form.user.length < 6){
					this.errori = true;
					uni.showToast({
							title: '账号至少为6位',
							icon: 'error'
					});
					return;
				}else{
				
					this.$refs.popup.open('bottom');
					return;
				} 
				
			
			},
			change(e){
				if (!e.show){
					if (this.isChecked==true){
						this.loginfinish();
					}
				}
			},
			loginfinish(){
				uni.showLoading({
					title:'登录中',
					mask: true
				});
				this.form.deviceid= uni.getDeviceInfo().deviceId;
				// console.log(this.form.deviceid);
				var that = this;
				uni.request({
				    url: that.$BASE_URL+'/login',
				    method: 'POST',
				    data: this.form,
				    success: (res) => {
					  uni.hideLoading();
				      const data = res.data;
				      if (data.code == '401') {
						that.errori = true;
						that.errorj = true;
				        uni.showToast({
				          icon: "none",
				          title: data.msg
				        });
				      } else if (data.code == '200') {
				        uni.showToast({
				          title: '登录成功'
				        });
				        //存储用户的数据到storge
						// console.log(data.data);
				        uni.setStorage({
				        	key: 'user',
							data: data.data
				        })
						
				        //跳转页面
				        uni.reLaunch({
				          url: '/pages/index/index'
				        });
				      }else{
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
					  
				      // console.error('Request Error:', err);
				    }
				  });
			}
			
		}
	}
</script>

<style>
	

	.login-wrap {
		width: 80%;
		margin: auto;
		padding-top: 30%;
	}

	#logname {
		margin-bottom: 70rpx;
		font-size: 60rpx;
		color: #9370DB;
		text-align: center;
		padding-bottom: 10%;
	}

	.login {
		margin: 40rpx 0;

	}
	#logini {
		
		text-align: center;
	}
	 #loginj{
	
		text-align: center;
	 }
	 .sz{
		 letter-spacing: 1rpx;
	 }
	 #toreg{
		 color: #999999;
		 margin: 0 50rpx;
		 float: left;
		 
	 }
	 #tofor{
		 color: #999999;
		 margin: 0 50rpx;
		 float: right;
		 
		 
	 }
	.radius {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 15rpx;
		height: 100rpx;
		background-color: #fff;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		position: relative;
	}
	 
	.navigator {
		text-decoration: underline !important; 
		background-color: transparent !important; 
		color: #999999 !important; 
	}
</style>