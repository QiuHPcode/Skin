<template>
	<view>

		<view class="forget-wrap"> <!-- 200rpx == 100px -->
			<view id="forgetname">
				忘记密码
			</view>
			<view class="forgetin">
				<uni-easyinput   id="forgetini" type="text" v-model="form.user" :error-message=" error ? 'errorMessage' : ''"
					:prefixIcon="showpersonIcon ? 'person' : ' '" :suffixIcon="showpersonIcon ? 'clear' : ' '" :clearable="showClearIcon" :placeholder="persontext ? '请输入登录账号' : ''"
					@focus="personFocus" @blur="personBlur" @iconClick="personbt" @input="personInput" />
			</view>
			

			<view class="forgetin">
				<button type="primary" @click="forget" style="background-color: #99CC99; border-radius: 20px; font-size: 35rpx; word-spacing: 20rpx;">下一步
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
					user: ''
				},
				showClearIcon: false,
				persontext: true,
				showpersonIcon: false,
				error: false
			}
		},
		onLoad(e) {
			if (e.value){
				this.form.user = e.value;
			}
			if ( !this.form.user ){
				this.showpersonIcon = false;
			}else{
				this.showpersonIcon = true;
			}
			
		},
		methods: {

			personFocus() {
				// 输入框获得焦点时触发的函数
				this.persontext = false;
				this.error = false;
			},
			personInput(e){
				if (e == ''){
					this.showpersonIcon = false;
				}
				else{
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
			forget() {
				if( !this.form.user) {//内容按自己实际的内容填写
						this.error = true;
						uni.showToast({
							icon: 'error',
							title: '账号不能为空'
						});			
						return;
					}else if (this.form.user.length < 6){
						this.error = true;
						uni.showToast({
								title: '账号至少为6位',
								icon: 'error'
						});
						return;
					}
				uni.showLoading({
					title:'上传中',
					mask: true
				});
				var that = this;
				uni.request({
					url: that.$BASE_URL+'/forget',
					method: 'POST',
					data: this.form,
					success: (res) => {
					uni.hideLoading();
					const data = res.data;
					if (data.code !== '200') {
						uni.showToast({
						icon: "error",
						title: data.msg
						});
					} else {
			        //存储用户的数据到storge
					// console.log(data.msg);
			   //      uni.setStorage({
			   //      	key: 'foget',
						// data: data.msg
			   //      })
						uni.navigateTo({
							url: '/pages/forget/forget2?data1='+ that.form.user
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

	.forget-wrap {
		width: 80%;
		margin: auto;
		padding-top: 20%;
	}

	#forgetname {
		margin-bottom: 40rpx;
		font-size: 60rpx;
		color: #99CC99;
		text-align: center;
		padding-bottom: 10%;
	}

	.forgetin {
		margin: 60rpx 0;

	}
	#forgetini {
		
		text-align: center;
	}
</style>