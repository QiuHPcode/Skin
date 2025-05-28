<template>
	<view>
		<view class="content-wrap">
			<!-- 判断 v-if onLoad开始上传 onReady后面判断  -->
			<view v-if="isSkin==false" style="display: contents;">
				<view v-if="isdisplay == false" class="image-wrap">
					<view style="border: 2rpx solid #ECEFF1; width: 100%; height: 100%; border-radius: 40rpx; background-color: #fff; display: flex; justify-content: center; align-items: center;">
						<image src="../../static/loading.gif"  style="width: 100%;transform: scale(0.7);"  mode="widthFix"></image>
					</view>
				</view>
				<view v-if="isdisplay == false" style="display: flex; justify-content: center; align-items: center; color: #8366c8; font-size: 30rpx;">
					<text >图片上传中...</text>
				</view>
				<view v-if="isdisplay" class="image-wrap">
					<image  ref="img" id="image" :src="imageUrl"  mode="widthFix" ></image>
				</view>
				<view v-if="isdisplay">
					<uni-popup ref="popup" :is-mask-click="false">
						
						<view v-if="istextresponse==false" style="height: 20vh; width: 100%; background-color: #fff;border-top-left-radius: 2vh; border-top-right-radius: 2vh;">
							<view style="padding-top: 5%; padding-left: 5%; display: flex; justify-content:  flex-start; align-items: center;">
								<image src="../../static/fail1.png" style="width: 70rpx; height: 70rpx; margin-right: 20rpx;"></image>
								<text>这好像不是张皮肤部位的图片</text>
							</view>
							<view style="padding-top: 8%; padding-left: 5%; display: flex; justify-content: flex-start; align-items: center; ">
								<navigator style="margin-left: 90rpx; color: #914DFF;" open-type="switchTab" url="/pages/index/index" >重新上传</navigator>	
								<text style="margin-left: 20rpx; color: #bfbfbf;" @click="textresponse">这是一张皮肤图片</text>
							</view>
						</view>
						<view v-if="istextresponse" style="height: 20vh; width: 100%; background-color: #fff;border-top-left-radius: 2vh; border-top-right-radius: 2vh;">
							<view style="padding-top: 5%; padding-left: 5%; display: flex; justify-content:  flex-start; align-items: center;">
								<image src="../../static/success1.png" style="width: 70rpx; height: 70rpx; margin-right: 20rpx;"></image>
								<text>收到您的反馈，肤测汇会再接再厉</text>
							</view>
							<view style="padding-top: 8%; padding-left: 5%; display: flex; justify-content: flex-start; align-items: center; ">
								<navigator style="margin-left: 90rpx; color: #914DFF;" open-type="switchTab" url="/pages/index/index" >返回到首页</navigator>
							</view>
						</view>
					</uni-popup>
				</view>
			</view>
			<view v-if="isSkin" style="display: contents;">
				<view class="image-wrap">
					<image  ref="img" id="image" :src="imageUrl"  mode="widthFix" @load="imageLoad"  ></image>
					<view v-for="(item,index) in box ">
						<canvas :canvas-id="'myCanvas'+index" :style="{position: 'absolute', left: image.left+'px', top: image.top+ 'px', width: image.displayWidth+'px', height: image.displayHeight+'px'}" ></canvas>
					</view>
					<canvas canvas-id="handCanvas" :style="{position: 'absolute', left: image.left+'px', top: image.top+ 'px', width: image.displayWidth+'px', height: image.displayHeight+'px'}" @touchstart="startDraw" @touchmove="drawRect" @touchend="endDraw"></canvas>
					<view v-if="touchrect.finish" >
						<uni-icons type="clear" color="#ffffff" size="26" :style="{position: 'absolute',  left: image.left+touchrect.x+touchrect.width-12+ 'px', top: image.top-16 + touchrect.y+ 'px'}" @click="clear('handCanvas','HandCanvas')"></uni-icons>
					</view>
				</view>
				<view style="height: 5vh; display: flex; justify-content: center; overflow: hidden; flex-wrap: nowrap; text-overflow:  ellipsis; color: #8366c8 ; font-size: 30rpx; " >
					<view v-if="box.length>0">
						<view v-if="addorchoose == 1 ">
							<text>请在上图圈画出皮损部位</text>
						</view>
						<view v-else-if="addorchoose == 2 && iconnum == -1">
							<text>可删除或修改手动添加的皮损部位</text>
						</view>
						<view v-else>
							<text>请选择一处皮损或手动添加</text>
						</view>
					</view>
					<view v-else>
						<view v-if="addorchoose == 1">
							<text>请在上图圈画出皮损部位</text>
						</view>
						<view v-else-if="addorchoose == 2 && iconnum == -1">
							<text>可删除或修改手动添加的皮损部位</text>
						</view>
						<view v-else>
							<text >未识别皮损区域，请手动标记</text>
						</view>
					</view>
					
				</view>
				<view id="resizecanvas" ref="resizecanvas" style="  height: 8vh;display : flex; justify-content: space-evenly; align-items: center; overflow-y: visible; flex-wrap: wrap;">
					<view v-for="(item,index) in box ">
						<view :style="{width: resizewidth+'px', height: resizewidth+'px','border-radius' :  resizewidth + 'px', border: index==iconnum ? '6rpx solid #8366c8' : ''}" @click="clickresize(index)">
							<canvas :canvas-id="'seeCanvas'+index" :style="{ width: resizewidth+'px', height: resizewidth+'px','border-radius' : resizewidth + 'px',  overflow: 'hidden' }"  ></canvas>
						</view>
					</view>
					<view :style="{width: resizewidth+'px', height: resizewidth+'px','border-radius' :  resizewidth + 'px', border: iconnum==-1 ? '6rpx solid #8366c8' : '2rpx solid #bfbfbf' , display: 'flex', justifyContent: 'center',alignItems: 'center'}" @click="clickresize(-1)">
						<view v-if="addorchoose == 0">
							<uni-icons type="plusempty" color="#bfbfbf" :size="resizewidth*0.5" ></uni-icons>
						</view>
						<view v-if="addorchoose == 1">
							<uni-icons type="arrow-up" color="#8366c8" :size="resizewidth*0.5" ></uni-icons>
						</view>
						<view v-if="addorchoose == 2">
							<canvas canvas-id="HandCanvas" :style="{ width: resizewidth+'px', height: resizewidth+'px','border-radius' : resizewidth + 'px',  overflow: 'hidden' }"  ></canvas>
						</view>
					</view>
				</view>
				
				<view id="resizetext" style=" height: 4.5vh; display : flex; font-size: 26rpx; justify-content: space-evenly; align-items: center; overflow-y: visible; flex-wrap: wrap; text-align: center;">
					<view v-for="(item,index) in box ">
						<view :style="{width: resizewidth+'px' , color:index==iconnum ? '#8366c8' : '#bfbfbf'}">
							<text>皮损</text>
						</view>
					</view>
					<view :style="{width: resizewidth+'px' , color: iconnum == -1 ? '#8366c8' : '#bfbfbf'}">
						<view v-if="addorchoose == 2">
							<text>手动</text>
						</view>
						<view v-else>
							<text>添加</text>
						</view>
					</view>
				</view>
				<view style="margin-top: 1rpx; display : flex; justify-content: center; align-items: center;  text-align: center;">
					<text style="color: #bfbfbf; font-size: 26rpx;">*请在10分钟内完成测评</text>
				</view>
				<view style="margin-top: 1vh; margin-bottom: 1vh;height: 5vh;  display : flex; justify-content: center; align-items: center;  text-align: center;">
					<button :style="{width: '90%' , height: '100%' , color: (box.length>0 && iconnum !=-1) || (iconnum == -1 && addorchoose ==2) ? '#fff' : '#e2e2e2' , '-moz-box-shadow ': (box.length>0 && iconnum !=-1) || (iconnum == -1 && addorchoose ==2) ? ' 0px 5rpx 25rpx #7a7a7a' : '' ,'-webkit-box-shadow': (box.length>0 && iconnum !=-1) || (iconnum == -1 && addorchoose ==2) ?'0px 5rpx 25rpx #7a7a7a' : '' , 'box-shadow': (box.length>0 && iconnum !=-1) || (iconnum == -1 && addorchoose ==2) ?'0px 5rpx 25rpx #7a7a7a' : '', 'white-space': 'nowrap' ,  'border-radius': '40rpx' ,  'background-color': (box.length>0 && iconnum !=-1) || (iconnum == -1 && addorchoose ==2) ?'#9370DB' : '#ccc' , 'text-align': 'center', display: 'flex', 'justify-content': 'center', 'align-items': 'center'}" hover-class='nextbtclick' @click="next"  >继 续</button>
				</view>
			</view>
			

		
		</view>
	</view>
</template>

<script >
	export default {
		data() {
			return {	
		
			    imageUrl: '', 
				x: 0,  // 矩形框的x坐标
				y: 0,  // 矩形框的y坐标
				width: 0,  // 矩形框的宽度
				height: 0,  // 矩形框的高度
				isor : false,
				iconnum : 0,
				image : {
					imageWidth: 0,  // 图片的原始宽度
					imageHeight: 0,  // 图片的原始高度
					displayWidth: 0,  // 图片的显示宽度
					displayHeight: 0 ,// 图片的显示高度 
					left: 0,
					top: 0,
					right: 0,
					bottom: 0
				},
				isSkin: false,
				isdisplay: false,
				loadsucess: true,
				isclear: false,
				tabbarheight: 0,
				resizewidth: 0,
				resizetext: 0,
				isChoose: true,
				box: [],
				touchStartX: 0,
				touchStartY: 0,
				touchEndX: 0,
				touchEndY: 0,
				isDrawing: false,
				istextresponse: false,
				touchrect:{
					x: 0,
					y: 0,
					width: 0,
					height: 0,
					finish:false
				},
				touchrecttrue:{
					x: 0,
					y: 0,
					width: 0,
					height: 0
				},
				form:{
					info_id: 0,
					username: '',
					sex: '',
					age: '',
					x: 0,
					y: 0,
					w: 0,
					h: 0,
					imageUrl: '',
					currenttime: ''
				},
				addorchoose: 0,
				time1:null
			}
		},
		onLoad: function (option) {
			
			var that = this;
			this.imageUrl =  option.src;
			// console.log('feafdfeaf',JSON.parse(option.form));
			// this.isdisplay = false;
			// this.isSkin = true;
			const form = JSON.parse(option.form);
			this.form.info_id = form.info_id;
			this.form.username = form.username;
			this.form.sex = form.sex;
			this.form.age = form.age;
			this.form.imageUrl = option.src;
			this.tabbarheight = uni.getSystemInfoSync().windowTop;
			var currentTime = new Date();
			this.form.currenttime = currentTime.getTime();
			
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
		onReady() {
			const userData =   uni.getStorageSync('user');
			if(this.isdisplay){
				this.$refs.popup.open('bottom');
			}
			uni.uploadFile({
				url: this.$BASE_URL+'/skinrecognition',
				filePath: this.imageUrl, 
				name: 'file',
				header:{Authorization: 'Bearer '+userData.access_token},
				success: (res) => {
						// console.log(res);
						const data = JSON.parse(res.data);
						if(data.code=='200'){
							// console.log(data.data);
							this.box=data.data;
							// console.log(this.box);
							setTimeout(()=>{
								this.isSkin = true;
							},500);
							setTimeout(()=>{
								if (this.isSkin == false){
									return;
								}else{
									if (this.box.length>0){
										this.form.x = this.box[0][0];
										this.form.y = this.box[0][1];
										this.form.w = this.box[0][2];
										this.form.h = this.box[0][3];
									}
									uni.getImageInfo({
										
									      src: this.imageUrl,  
									      success: (res) => {  
									        this.image.imageWidth = res.width;  
									        this.image.imageHeight = res.height;  
											var that = this;
											const query0 = uni.createSelectorQuery().in(this);
											query0.select('#resizecanvas').boundingClientRect(data0 => {
												// console.log('canvas高度:',data0.height);
												that.resizewidth = data0.height;
											}).exec();
											setTimeout(()=>{
												this.box.forEach((item,index)=>{    //js遍历数组
													that.draw(index); //push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
												});
											},400)
											
											
									 	// 	console.log('宽度:',this.image.imageWidth);
											// console.log('高度:',this.image.imageHeight);
											// console.log('实际宽度:',this.image.displayWidth);
											// console.log('实际高度:',this.image.displayHeight);
											// console.log('left:',this.image.left);
											// console.log('top:',this.image.top);
											// console.log('right:',this.image.right);
											// console.log('bootom:',this.image.bottom);
										
										},  
									});
									
								}
							},500)
						}else if (data.code == '201'){
							this.box=data.data;
							setTimeout(()=>{
								this.isSkin = true;
							},500);
							setTimeout(()=>{
								if (this.isSkin == false){
									return;
								}else{
									if (this.box.length>0){
										this.form.x = this.box[0][0];
										this.form.y = this.box[0][1];
										this.form.w = this.box[0][2];
										this.form.h = this.box[0][3];
									}
									uni.getImageInfo({
										
									      src: this.imageUrl,  
									      success: (res) => {  
									        this.image.imageWidth = res.width;  
									        this.image.imageHeight = res.height;  
											var that = this;
											const query0 = uni.createSelectorQuery().in(this);
											query0.select('#resizecanvas').boundingClientRect(data0 => {
												// console.log('canvas高度:',data0.height);
												that.resizewidth = data0.height;
											}).exec();
											setTimeout(()=>{
												this.box.forEach((item,index)=>{    //js遍历数组
													that.draw(index); //push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
												});
											},400)
											
											
									 	// 	console.log('宽度:',this.image.imageWidth);
											// console.log('高度:',this.image.imageHeight);
											// console.log('实际宽度:',this.image.displayWidth);
											// console.log('实际高度:',this.image.displayHeight);
											// console.log('left:',this.image.left);
											// console.log('top:',this.image.top);
											// console.log('right:',this.image.right);
											// console.log('bootom:',this.image.bottom);
										
										},  
									});
									
								}
							},500)
							
						}
						else if (data.code == '300'){
							setTimeout(()=>{
								this.isdisplay = true;
							},500);
							setTimeout(()=>{
								
								this.$refs.popup.open('bottom');
								
							},500)
						}
						else{
							uni.showToast({
							  icon: 'none',
							  title: data.msg
							});
							
							uni.switchTab({
								url:'/pages/index/index'
							});
							
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
					} else {
					  uni.showToast({
					    icon: 'none',
					    title: '请求失败，请稍后重试'
					  });
					  
					}
					
					uni.switchTab({
						url:'/pages/index/index'
					});
					
					
				}
			})
			
			
			
		},
		onHide() {
			clearInterval(this.time1);
			this.time1 = null;
		},
		methods: {
			textresponse(){
				this.istextresponse = true;
				
			},
			next(){
				if ((this.box.length > 0 && this.iconnum !=-1) || (this.iconnum == -1 && this.addorchoose ==2)){
					if (this.iconnum!=-1){
						var index = this.iconnum;
						this.form.x = this.box[index][0];
						this.form.y = this.box[index][1];
						this.form.w = this.box[index][2];
						this.form.h = this.box[index][3];
						uni.navigateTo({
							url:'/pages/detect/detect2?form='+JSON.stringify(this.form)
						})
					}else{
						
						this.form.x = (this.touchrecttrue.x+this.touchrecttrue.width/2)/this.image.imageWidth;
						// console.log(this.touchrecttrue.x);
						// console.log(this.image.imageWidth);
						this.form.y = (this.touchrecttrue.y+this.touchrecttrue.height/2)/this.image.imageHeight;
						this.form.w = this.touchrecttrue.width/this.image.imageWidth;
						// console.log(this.touchrecttrue.width);
						this.form.h = this.touchrecttrue.height/this.image.imageHeight;
						uni.navigateTo({
							url:'/pages/detect/detect2?form='+ JSON.stringify(this.form)
						})
					}
					// console.log(this.form);
					// uni.navigateTo({
					// 	url:'/pages/detect/detect2?form='+this.form
					// })
					
				}
				
			},
			clear(id1,id2){
				if (this.iconnum == -1)
				{
					this.addorchoose = 1;
				}else{
					this.addorchoose = 0;
				}
				
				this.touchrect = {
					x: 0,
					y: 0,
					width: 0,
					height: 0,
					finish: false,
					
				};
				this.isclear = true;
				this.touchrecttrue = {
					x: 0,
					y: 0,
					width: 0,
					height: 0
				};
				const context = uni.createCanvasContext(id1, this);
				context.clearRect(0, 0, this.image.displayWidth, this.image.displayHeight);
				context.draw();
				const ctx1 = uni.createCanvasContext(id2,this);
				ctx1.clearRect(0,0,this.resizewidth,this.resizewidth );
				ctx1.draw();
				
			
			},
			clickresize(index0){
				// console.log('点击了');
				this.iconnum = index0;
				if(this.iconnum == -1 && !this.touchrect.finish){
					this.addorchoose = 1;
				}else if(this.iconnum == -1 && this.touchrect.finish){
					this.addorchoose = 2;
				}else if (this.iconnum != -1&& !this.touchrect.finish ){
					this.addorchoose = 0;
				}
				if (!this.isclear&&this.touchrect.finish){
					
					this.handdraw(-1);
				}
				var that = this;
				
				this.box.forEach((item,index)=>{    //js遍历数组
					that.draw(index);
					 //push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
				});
				// 提交按钮 代码先写到这里
				
			},
			imageLoad: function(e) {
				var that = this;
				const query = uni.createSelectorQuery().in(this);
				query.select('#image').boundingClientRect(data => {
					that.image.displayWidth = data.width;
					that.image.displayHeight = data.height;
					that.image.left = data.left;
					that.image.top = data.top;
					that.image.right = data.right;
					that.image.bottom = data.bottom;
				}).exec();
			},
			draw(index){
				  var context = uni.createCanvasContext('myCanvas'+index, this);
				  var color = this.iconnum==index ? '#51458B' : '#fff';  // 根据条件选择颜色
				  context.setStrokeStyle(color);  // 使用选择的颜色 
				  context.setLineWidth(2);  // 设置矩形框的线宽
				  var fill = this.iconnum==index ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0)';
				  context.setFillStyle(fill);  // 设置填充颜色为半透明的白色
				  var width = this.box[index][2] * this.image.displayWidth;
				  var height = this.box[index][3] * this.image.displayHeight;
				  var centerX = this.box[index][0] * this.image.displayWidth;  // 矩形框中心点的x坐标
				  var centerY = this.box[index][1] * this.image.displayHeight;// 矩形框中心点的y坐标
				  // this.x = centerX - width / 2;	   
				  // this.y =  centerY - height / 2;
				  // this.width = width;
				  // this.height = height;
				  context.fillRect(centerX - width / 2, centerY - height / 2, width, height);  // 画矩形框
				  context.strokeRect(centerX - width / 2, centerY - height / 2, width, height);
				  context.draw();  // 绘制到canvas上
				  const ctx = uni.createCanvasContext('seeCanvas'+index, this);
				  var width = this.box[index][2] * this.image.imageWidth;
				  var height = this.box[index][3] * this.image.imageHeight;
				  var centerX = this.box[index][0] * this.image.imageWidth;  // 矩形框中心点的x坐标
				  var centerY = this.box[index][1] * this.image.imageHeight;// 矩形框中心点的y坐标
				  var x = centerX - width / 2;	  
				  var y =  centerY - height / 2;
				  var width = width;
				  var height = height;
				  ctx.drawImage(this.imageUrl, x, y,width, height,0,0,this.resizewidth,this.resizewidth );
				  ctx.draw();
			},
			chose(){
				// console.log('切换');
				this.isChoose = !this.isChoose;
				// console.log(this.isChoose);
				this.draw();
				const ctx = uni.createCanvasContext('seeCanvas'+index, this);
				var width = this.box[0][2] * this.image.imageWidth;
				var height = this.box[0][3] * this.image.imageHeight;
				var centerX = this.box[0][0] * this.image.imageWidth;  // 矩形框中心点的x坐标
				var centerY = this.box[0][1] * this.image.imageHeight;// 矩形框中心点的y坐标
				var x = centerX - width / 2;	  
				var y =  centerY - height / 2;
				var width = width;
				var height = height;
				ctx.drawImage(this.imageUrl, x, y,width, height,0,0,this.resizewidth,this.resizewidth );
				
				ctx.draw();
				
				// setTimeout(() => {
				//        uni.canvasToTempFilePath({
				//            canvasId: 'seeCanvas'+index,
				//            success: (res) => {
				               // console.log(res.tempFilePath);
				               // TODO: 将图片路径缓存起来，你可以使用uni.setStorage()方法
								// uni.saveImageToPhotosAlbum({
								// 	filePath: res.tempFilePath,
								// 		 success: (suc) =>{
											
										
											
								// 		},
								// 		fail: (error)  =>{
								// 			uni.showToast({
								// 				title: "没有权限,保存失败",
								// 				icon: "error"
								// 			});
								// 		},
										
								// 	});
				   //         },
				   //         fail: (err) => {
				   //             console.error('canvasToTempFilePath failed:', err);
				   //         }
				   //     }, this);
				   // }, 1000);
			},
		    startDraw(event) {
				if(this.iconnum == -1){
					this.isclear = false;
					this.touchStartX = event.touches[0].x ;
					// console.log(this.touchStartX);
					this.touchStartY = event.touches[0].y ;
					// console.log(this.touchStartY);
					this.isDrawing = true;
					
				}
				
			},
			drawRect(event) {
				if(this.iconnum == -1){
					this.touchrect.finish = false;
					if (!this.isDrawing) return;
					const touchMoveX = event.touches[0].x;
					const touchMoveY = event.touches[0].y;
					this.touchEndX = touchMoveX;
					this.touchEndY = touchMoveY;
					this.handdraw(-1);
					
				}
			
				
			},
			handdraw(index) {
				
				if(index == -1){
					
					const context = uni.createCanvasContext('handCanvas', this);
					context.clearRect(0, 0, this.image.displayWidth, this.image.displayHeight);
					if (this.touchEndX > this.image.displayWidth){
						this.touchEndX =  this.image.displayWidth;
					}else if(this.touchEndX < 0){
						this.touchEndX =  0;
					}
					if (this.touchEndY > this.image.displayHeight){
						this.touchEndY = this.image.displayHeight;
					}else if(this.touchEndY < 0){
						this.touchEndY =  0;
					}
					const x = Math.min(this.touchStartX, this.touchEndX);
					const y = Math.min(this.touchStartY, this.touchEndY);
					const width = Math.abs(this.touchEndX - this.touchStartX);
					const height = Math.abs(this.touchEndY - this.touchStartY);
					this.touchrect.x = x;
					this.touchrect.y = y;
					this.touchrect.width = width;
					this.touchrect.height = height;
					var fill =  this.iconnum == -1  ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0)';
					context.setFillStyle(fill);
					var color = this.iconnum  == -1 ? '#51458B' : '#fff';
					context.setStrokeStyle(color);
								
					context.setLineWidth(2);
					context.fillRect(x, y, width, height);
					context.strokeRect(x, y, width, height);
					context.draw();
					this.touchrecttrue.x = x/this.image.displayWidth * this.image.imageWidth;
					this.touchrecttrue.y = y/this.image.displayHeight * this.image.imageHeight;
					this.touchrecttrue.width = width/this.image.displayWidth * this.image.imageWidth;
					this.touchrecttrue.height = height/this.image.displayHeight * this.image.imageHeight;
					// console.log(this.touchrecttrue);
					// console.log(this.image);
				}
				
			},
			endDraw() {
				if(this.iconnum == -1){
					
					if(this.touchrecttrue.width>0 && this.touchrecttrue.height >0)
					{
						this.addorchoose = 2;
						this.isDrawing = false;
						const ctx1 = uni.createCanvasContext('HandCanvas',this);
						ctx1.drawImage(this.imageUrl, this.touchrecttrue.x,this.touchrecttrue.y,this.touchrecttrue.width, this.touchrecttrue.height,0,0,this.resizewidth,this.resizewidth );
						this.touchrect.finish = true;
						setTimeout(()=>{
							ctx1.draw();
							
						},100)
						
					}
			
					
				}
				
			},
		// 	cutimage(id){
		// 		var ctx = uni.createCanvasContext(id);
		// 		console.log('裁剪');
		// 		const imageWidth = this.width;
		// 		const imageHight = this.height;
		// 		const x = this.x;
		// 		const y = this.y;
		// 		console.log(x,y);
		// 		var that = this;
		// 		ctx.drawImage(this.imageUrl,x,y,imageWidth,imageHight);
		// 		ctx.draw(false,setTimeout(() =>{
		// 		        uni.canvasToTempFilePath({
		// 		          canvasId: id,
		// 		          fileType: 'jpg',
		// 		          success: (res) => {
							
		// 					uni.saveImageToPhotosAlbum({
		// 					filePath: res.tempFilePath,
		// 						 success: (suc) =>{
		// 							that.Image = suc.path;
									
									
		// 						},
		// 						fail: (error)  =>{
		// 							uni.showToast({
		// 								title: "没有权限,保存失败",
		// 								icon: "error"
		// 							});
		// 						},
								
		// 					});
		// 		          },
		// 		          fail: (err) => {
		// 					console.log('失败');
		// 		          }
		// 		        }, this);
		// 			}, 1000));
		
		// 	}
		}
	}
</script>

<style>
	.content-wrap{
		height: 90vh; 
		background: linear-gradient(0deg, #fff 65%, #8366c8 35%);
	}
	.image-wrap{
		height: 65%; 
		margin-left: 8%; 
		margin-right: 8%; 
		padding-top: 10%;  
		margin-bottom: 1vh;  
		display: flex; 
		align-items: center; 
		justify-content: center;
	}
	#image{
		max-height: 100%;
		border-radius: 25rpx;
	}
	.nextbtclick{
		color:  #e2e2e2 !important;
	}
</style>
