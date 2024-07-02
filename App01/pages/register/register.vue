<template>
	<view  >

		<view class="register-wrap"> <!-- 200rpx == 100px -->
			<view id="regname">
				注册
			</view>
			<view class="regin">
				<uni-easyinput   id="regini" type="text" v-model="form.user" :error-message=" errori ? 'errorMessage' : ''"
					:prefixIcon="showpersonIcon ? 'person' : ' '" :suffixIcon="showpersonIcon ? 'clear' : ' '" :clearable="showClearIcon" :placeholder="persontext ? '请设置登录账号' : ''"
					@focus="personFocus" @blur="personBlur" @iconClick="personbt" @input="personInput" />
			</view>

			<view class="regin">
				<uni-easyinput id="reginj"  :type="ty ? 'password':'text'" :error-message=" errorj ? 'errorMessage' : ''"
					:passwordIcon="showPasswordIcon"  :clearable="showClearIcon" v-model="form.password"
					:prefixIcon="showeyeIcon ? eyeshow() : ' '" :suffixIcon="showeyeIcon ? 'clear' : ' '" :placeholder="eyetext ? '请设置登录密码' : ''"
					@focus="eyeFocus" @blur="eyeBlur" @iconClick="eyebt" @input="eyeInput"/>
			</view>
			
			<view class="regin">
				<uni-easyinput id="regink"  :type="tyi ? 'password':'text'" :error-message=" errork ? 'errorMessage' : ''"
					:passwordIcon="showPasswordIcon"  :clearable="showClearIcon" v-model="form.confirm"
					:prefixIcon="showeyeIconi ? eyeshowi() : ' '" :suffixIcon="showeyeIconi ? 'clear' : ' '" :placeholder="eyetexti ? '请确认登录密码' : ''"
					@focus="eyeFocusi" @blur="eyeBluri" @iconClick="eyebti" @input="eyeInputi"/>
			</view>

			<view class="regin">
				<button type="primary" @click="register" style="background-color: #99CCCC; border-radius: 20px; font-size: 35rpx; word-spacing: 20rpx;">注 册
				</button>
			</view>		
			<!-- 	<label class="checkbox d-flex a-center" >
							<checkbox :checked="check" />
							<text class="text-light-muted font">已阅读并同意XXXXX协议</text>
			</label> -->

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
					confirm: ''
				},
				showPasswordIcon: false,
				showClearIcon: false,
				showeyeIcon: false,
				showeyeIconi: false,
				persontext: true,
				showpersonIcon: false,
				eyetext: true,
				eyetexti: true,
				ty :true,
				tyi :true,
				showeye :true,
				showeyei :true,
				errori :false,
				errorj :false,
				errork :false
			}
		},
		methods: {

			personFocus() {
				// 输入框获得焦点时触发的函数
				this.persontext = false;
				this.errori = false;
			},
			personInput(e){
				if (e == ''){
					this.showpersonIcon = false;
				}
				this.showpersonIcon = true;
				const o = e;
				const inputRule = /[\W_]/g;//修改inputRule 的值
				this.$nextTick(function() {
					this.form.user = o.replace(inputRule , '');
				})	
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
			personBlur() {
				// 输入框失去焦点时触发的函数
				if (this.form.user ==''){
					this.showpersonIcon = false;
				}
				this.persontext = true;
				return;
				
			},
		
			eyeFocus() {
				// 输入框获得焦点时触发的函数
				
				this.eyetext = false;
				this.errorj = false;
			},
			eyeFocusi() {
				// 输入框获得焦点时触发的函数
				
				this.eyetexti = false;
				this.errork = false;
				
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
			eyeInputi(e){
				if (e == ''){
					this.showeyeIconi = false;
				}
				this.showeyeIconi = true;
				const o = e;
				const inputRule = /[\u4E00-\u9FA5\s]/g;//修改inputRule 的值
				this.$nextTick(function() {
					this.form.confirm = o.replace(inputRule , '');
					if (this.form.confirm == '')
					{
						this.showeyeIconi = false;
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
			eyeBluri() {
				// 输入框失去焦点时触发的函数
				
				if (this.form.confirm ==''){
					this.showeyeIconi = false;
				}
				this.eyetexti = true;
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
			eyebti(type) {
				if (type === 'prefix'){
					this.tyi = !this.tyi;
					this.showeyei = !this.showeyei;
				}else{
					this.form.confirm = '';
					this.showeyeIconi = false;
				}
				
			},
			eyeshow() {
				
				return this.showeye ? 'eye-slash' : 'eye' ;
			},
			eyeshowi() {
				
				return this.showeyei ? 'eye-slash' : 'eye' ;
			},
			register() {
				if( this.form.user === '' && this.form.password === '' && this.form.confirm === '') {//内容按自己实际的内容填写
						this.errori = true;
						this.errorj = true;
						this.errork = true;
						uni.showToast({
							icon: 'error',
							title: '输入不能为空'
						});			
						return;
					}else if ( this.form.user == '' && this.form.password != '' && this.form.confirm != ''){
						this.errori = true;
						uni.showToast({
							icon: 'error',
							title: '账号不能为空'
						});
						return;
					}
					// else {
					// 	this.errori = (this.form.user == ''&& this.form.password == '' && this.form.confirm != '') || ( this.form.user == ''&& this.form.password != '' && this.form.confirm == '') ;
					// 	this.errorj = this.form.user == ''&& this.form.password == '' && this.form.confirm != '';
					// 	this.errork =  this.form.user == ''&& this.form.password != '' && this.form.confirm == ''
					// 	uni.showToast({
					// 			icon: 'error',
					// 	 		title: '输入不能为空'
					// 	});
					// }
					else if ( this.form.user == ''&& this.form.password == '' && this.form.confirm != ''){
						this.errori = true;
						this.errorj = true;
						uni.showToast({
							icon: 'error',
							title: '输入不能为空'
						});
						return;
					}else if ( this.form.user == ''&& this.form.password != '' && this.form.confirm == ''){
						this.errori = true;
						this.errork = true;
						uni.showToast({
							icon: 'error',
							title: '输入不能为空'
						});
						return;
					}
					else if ( this.form.user != ''&& this.form.password == '' && this.form.confirm == ''){
						this.errorj = true;
						this.errork = true;
						uni.showToast({
							icon: 'error',
							title: '密码不能为空'
						});
						return;
					}else if ( this.form.user != '' && this.form.password == '' && this.form.confirm != ''){
						this.errorj = true;
						uni.showToast({
							icon: 'error',
							title: '密码不能为空'
						});
						return;
					}
					else if ( this.form.user != '' && this.form.password != '' && this.form.confirm == ''){
						this.errork = true;
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
					}else if (this.form.password != this.form.confirm) {
						this.errorj = true;
						this.errork = true;
						uni.showToast({
							icon:'error',
							title:'密码输入不一致'
						});
						return;
					}
					else{
						var that = this;
						uni.showLoading({
							title:'注册中',
							mask: true
						});
						uni.request({
						    url: that.$BASE_URL+'/register',
						    method: 'POST',
						    data: this.form,
						    success: (res) => {
							  uni.hideLoading();
						      const data = res.data;
						      if (data.code == '401') {
								that.errori = true; 
						        uni.showToast({
						          icon: "error",
						          title: data.msg
						        });
						      } else if (data.code == '200') {
						        uni.showToast({
								  icon:'success',
						          title: '注册成功'
						        });
						  //       //存储用户的数据到storge
								// console.log(data.data);
						  //       uni.setStorage({
						  //       	key: 'user',
								// 	data: data.data
						  //       })
						        //跳转页面
						        uni.reLaunch({
						          url: '/pages/login/login'
						        });
						      }else{
								 uni.showToast({
								   icon: "error",
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
						          title: '服务器错误，请稍后重试'
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
	}
</script> 

<style>

	.uni-easyinput__content {
		
		border-radius: 30rpx !important;
		
		/* -webkit-border-radius: 36px;
		-moz-border-radius: 36px; */
	}
	>>>.uni-easyinput__content {
		
		border-radius: 30rpx !important;
		
		/* -webkit-border-radius: 36px;
		-moz-border-radius: 36px; */
	}

	.register-wrap {
		width: 80%;
		margin: auto;
		padding-top: 30%;
	}

	#regname {
		margin-bottom: 50rpx;
		font-size: 60rpx;
		color: #99CCCC;
		text-align: center;
		padding-bottom: 10%;
	}

	.regin {
		margin: 40rpx 0;

	}
	#regini {
		
		text-align: center;
	}
	#reginj{
	
		text-align: center;
	}
	#regink{
		
			text-align: center;
	}
</style>