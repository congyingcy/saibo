Page({
  data: {
    username: '',
    birthDate: '',
    epitaph: ''
  },
  inputUsername(e) {
    this.setData({ username: e.detail.value });
  },
  inputBirthDate(e) {
    this.setData({ birthDate: e.detail.value });
  },
  inputEpitaph(e) {
    this.setData({ epitaph: e.detail.value });
  },
  login() {
    const { username, birthDate, epitaph } = this.data;

    // 假设用户登录成功
    const userInfo = {
      username,
      birthDate,
      epitaph
    };
    wx.setStorageSync('userInfo', userInfo); // 保存用户信息
    wx.switchTab({
      url: '/pages/index/index'
    });
  }
}); 