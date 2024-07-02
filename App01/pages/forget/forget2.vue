<template>
	<view  >

		<view class="forgeti-wrap"> <!-- 200rpx == 100px -->
			<view id="forgetiname">
				忘记密码
			</view>
			<view class="forget2in">
				<uni-easyinput   id="forget2ini" type="text" v-model="form.user" disabled
					prefixIcon="person" suffixIcon="info" :clearable="showClearIcon" placeholder="请输入登录账号"
					 @iconClick="personbt"  />
			</view>
			<view class="forget2in">
				<uni-easyinput   id="forget2ini" type="text" v-model="form.username" :error-message=" errori ? 'errorMessage' : ''"
					:prefixIcon="showpersonIcon ? 'help' : ' '" :suffixIcon="showpersonIcon ? 'clear' : ' '" :clearable="showClearIcon" :placeholder="persontext ? '请输入默认用户名' : ''"
					@focus="personFocus" @blur="personBlur" @iconClick="personbti" @input="personInput" />
			</view>
			<view class="forget2in">
				<uni-easyinput id="forget2inj"  :type="ty ? 'password':'text'" :error-message=" errorj ? 'errorMessage' : ''"
					:passwordIcon="showPasswordIcon"  :clearable="showClearIcon" v-model="form.password"
					:prefixIcon="showeyeIcon ? eyeshow() : ' '" :suffixIcon="showeyeIcon ? 'clear' : ' '" :placeholder="eyetext ? '请输入新登录密码' : ''"
					@focus="eyeFocus" @blur="eyeBlur" @iconClick="eyebt" @input="eyeInput"/>
			</view>
			<view class="forget2in">
				<uni-easyinput id="forget2ink"  :type="tyi ? 'password':'text'" :error-message=" errork ? 'errorMessage' : ''"
					:passwordIcon="showPasswordIcon"  :clearable="showClearIcon" v-model="form.confirm"
					:prefixIcon="showeyeIconi ? eyeshowi() : ' '" :suffixIcon="showeyeIconi ? 'clear' : ' '" :placeholder="eyetexti ? '请确认新登录密码' : ''"
					@focus="eyeFocusi" @blur="eyeBluri" @iconClick="eyebti" @input="eyeInputi"/>
			</view>
			<view class="forget2in">
				<button type="primary" @click="forget1" style="background-color: #99CC99; border-radius: 20px; font-size: 35rpx; word-spacing: 20rpx;">修 改
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
					username: '',
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
				errori: false,
				errorj: false,
				errork: false
			}
		},
		onLoad(e) {
			this.form.user = e.data1;
			
		},
		methods: {

			personFocus() {
				// 输入框获得焦点时触发的函数
				this.persontext = false;
				this.errori=false;
			},
			personInput(e){
				if (e == ''){
					this.showpersonIcon = false;
				}
				else{
					this.showpersonIcon = true;
				}
				const o = e;
				const inputRule = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g;//修改inputRule 的值
				this.$nextTick(function() {
					this.form.username = o.replace(inputRule , '');
					if (this.form.username == '')
					{
						this.showpersonIcon = false;
					}
				})	
			},
			personbt(type){
				if(type === 'suffix'){
					uni.showToast({
						icon:'none',
						title:'账号已锁定,若想更改请返回重新输入'
					})
				}
				else{
					uni.showToast({
						icon:'none',
						title:'此为登录账号'
					})
				}
				
			},
			personbti(type){
				if(type === 'suffix'){
					this.form.username = '';
					this.showpersonIcon = false;
				}
				else{
					uni.showToast({
						icon:'none',
						title:'请输入账号注册时的首默认用户名,仅限中英文数字'
					})
				}
				
			},
			personBlur() {
				// 输入框失去焦点时触发的函数
				if (this.form.username ==''){
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
			forget1() {
				var that = this;
				if( this.form.username === ''  && this.form.password === '' && this.form.confirm === '') {//内容按自己实际的内容填写
						this.errori = true;
						this.errorj = true;
						this.errork = true;
						uni.showToast({
							icon: 'error',
							title: '输入不能为空'
						});			
						return;
					}else if ( this.form.username == '' && this.form.password != '' && this.form.confirm != ''){
						this.errori = true;
						uni.showToast({
							icon: 'error',
							title: '用户名不能为空'
						});
						return;
					}else if ( this.form.username == ''&& this.form.password == '' && this.form.confirm != ''){
						this.errori = true;
						this.errorj = true;
						uni.showToast({
							icon: 'error',
							title: '输入不能为空'
						});
						return;
					}else if ( this.form.username == ''&& this.form.password != '' && this.form.confirm == ''){
						this.errori = true;
						this.errork = true;
						uni.showToast({
							icon: 'error',
							title: '输入不能为空'
						});
						return;
					}
					else if ( this.form.username != ''&& this.form.password == '' && this.form.confirm == ''){
						this.errorj = true;
						this.errork = true;
						uni.showToast({
							icon: 'error',
							title: '密码不能为空'
						});
						return;
					}else if ( this.form.username != '' && this.form.password == '' && this.form.confirm != ''){
						this.errorj = true;
						uni.showToast({
							icon: 'error',
							title: '密码不能为空'
						});
						return;
					}
					else if ( this.form.username != '' && this.form.password != '' && this.form.confirm == ''){
						this.errork = true;
						uni.showToast({
							icon: 'error',
							title: '密码不能为空'
						});
						return;
					}
					else if (this.form.password != this.form.confirm) {
						this.errorj = true;
						this.errork = true;
						uni.showToast({
							icon:'error',
							title:'密码输入不一致'
						});
						return;
					}
				uni.showLoading({
					title:'更新中',
					mask: true
				})
			 var that = this;
			  uni.request({
			    url: that.$BASE_URL+'/forget2',
			    method: 'POST',
			    data: this.form,
			    success: (res) => {
			      const data = res.data;
			      if (data.code == '401') {
					uni.hideLoading()
					that.errori = true;
			        uni.showToast({
			          icon: "error",
			          title: data.msg
			        });
			      } else if (data.code == '200') {
					uni.hideLoading()
			        uni.showToast({
					  icon:'success',
			          title: '成功'
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
			      }
				  else{
					  uni.hideLoading()
					  uni.showToast({
					    icon: "error",
					    title: data.msg
					  });
				  }
			    },
			    fail: (err) => {
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

	.forgeti-wrap {
		width: 80%;
		margin: auto;
		padding-top: 20%;
	}

	#forgetiname {
		margin-bottom: 40rpx;
		font-size: 60rpx;
		color: #99CC99;
		text-align: center;
		padding-bottom: 20%;
	}

	.forget2in {
		margin: 40rpx 0;

	}
	#forget2ini {
		
		text-align: center;
	}
	#forget2inj{
	
		text-align: center;
	}
	#forget2ink{
		
			text-align: center;
	}
</style>