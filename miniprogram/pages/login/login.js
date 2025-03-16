Page({
  data: {
    username: '',
    password: '',
    birthDate: ''
  },
  inputUsername(e) {
    this.setData({ username: e.detail.value });
  },
  inputPassword(e) {
    this.setData({ password: e.detail.value });
  },
  inputBirthDate(e) {
    this.setData({ birthDate: e.detail.value });
  },
  login() {
    const { username, password, birthDate } = this.data;

    if (!username || !password || !birthDate) {
      wx.showToast({ title: '请填写完整信息', icon: 'none' });
      return;
    }

    // 验证出生日期格式是否为 yyyymmdd
    if (!this.validateBirthDate(birthDate)) {
      wx.showToast({ title: '出生日期格式应为 yyyymmdd', icon: 'none' });
      return;
    }

    // 直接登录，无需验证
    wx.setStorageSync('currentUser', { username, password, birthDate });
    wx.showToast({ title: '登录成功', icon: 'success' });
    wx.switchTab({ url: '/pages/index/index' });
  },
  validateBirthDate(date) {
    // 验证是否为8位数字，且符合日期格式
    const regex = /^\d{8}$/;
    if (!regex.test(date)) {
      return false;
    }

    const year = parseInt(date.substring(0, 4));
    const month = parseInt(date.substring(4, 6));
    const day = parseInt(date.substring(6, 8));

    if (month < 1 || month > 12 || day < 1 || day > 31) {
      return false;
    }

    return true;
  },
  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`; // 返回 yyyymmdd 格式
  }
}); 