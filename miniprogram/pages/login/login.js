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

    // 直接保存用户信息
    const user = {
      username,
      birthDate,
      epitaph
    };

    // 保存当前用户信息
    wx.setStorageSync('currentUser', user);
    wx.switchTab({ url: '/pages/index/index' });
  }
}); 