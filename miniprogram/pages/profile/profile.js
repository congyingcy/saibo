Page({
  logout() {
    wx.removeStorageSync('userInfo'); // 清除用户信息
    wx.redirectTo({
      url: '/pages/login/login'
    });
  }
}); 