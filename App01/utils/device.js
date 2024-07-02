export function device(callback){
	 
	  const userData =   uni.getStorageSync('user');
	  if (userData){
		const deviceid = uni.getDeviceInfo().deviceId;
		var that = this;
		uni.request({
			url:this.$BASE_URL+'/devicelogin',
			method:'POST',
			header:{Authorization: 'Bearer '+userData.access_token},
			data: {'deviceid': deviceid},
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
								uni.removeStorage({
									key: 'user'
								});
								callback(4);
							}else if(data.code == '200'){
								console.log(data.data);
								uni.setStorageSync('user',data.data)
								uni.setStorage({
									key: 'user',
									data:{
										refresh_token: userData.refresh_token,
										access_token: data.data,
									}
								});
								setTimeout(() => {
									that.device();
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
							callback(0);
						}
					})
				}else if(data.code=='200'){
					
					 callback(1);
				}else if(data.code == '300'){
					
					
					uni.removeStorage({
						key: 'user'
					});
					
					callback(2);
				}
				
			},fail: (err) => {
				
				
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
				callback(0);
			}
		})
	  }else{
		 
		  callback(0);
	  }
}
