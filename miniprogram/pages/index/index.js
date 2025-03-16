Page({
  data: {
    currentTime: '', // 当前时间
    birthDate: '', // 出生年月日
    username: '', // 用户登录名
    totalYears: 0, // 总年数
    totalMonths: 0, // 总月数
    totalDays: 0, // 总天数
    totalHours: 0, // 总小时数
    totalMinutes: 0, // 总分钟数
    epitaph: '我想买张复活劵' // 墓志铭
  },
  onLoad() {
    const user = wx.getStorageSync('currentUser');
    if (!user) {
      wx.redirectTo({ url: '/pages/login/login' });
      return;
    }

    // 将 yyyymmdd 格式的出生日期转换为 Date 对象
    const birthDate = this.parseBirthDate(user.birthDate);
    this.setData({
      birthDate: this.formatDate(birthDate), // 格式化出生日期
      username: user.username // 获取用户登录名
    });
    this.setIntervalUpdate(birthDate);
  },
  setIntervalUpdate(birthDate) {
    setInterval(() => {
      const now = new Date();
      const diff = now - birthDate;

      // 计算当前时间
      const currentTime = this.formatDateTime(now);
      this.setData({ currentTime });

      // 计算总时间
      const totalSeconds = Math.floor(diff / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60); // 总分钟数
      const totalHours = Math.floor(totalMinutes / 60); // 总小时数
      const totalDays = Math.floor(totalHours / 24); // 总天数
      const totalMonths = Math.floor(totalDays / 30); // 总月数
      const totalYears = Math.floor(totalMonths / 12); // 总年数

      this.setData({
        totalYears,
        totalMonths, // 直接显示总月数
        totalDays, // 直接显示总天数
        totalHours, // 直接显示总小时数
        totalMinutes // 直接显示总分钟数
      });
    }, 1000); // 每秒更新一次
  },
  parseBirthDate(dateStr) {
    // 将 yyyymmdd 格式的字符串转换为 Date 对象
    const year = parseInt(dateStr.substring(0, 4));
    const month = parseInt(dateStr.substring(4, 6)) - 1; // 月份从 0 开始
    const day = parseInt(dateStr.substring(6, 8));
    return new Date(year, month, day);
  },
  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // 返回格式化后的日期
  },
  formatDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; // 返回完整的年月日时分秒
  },
  navigateToFriends() {
    wx.navigateTo({ url: '/pages/friends/friends' });
  },
  navigateToTomb() {
    wx.navigateTo({ url: '/pages/tomb/tomb' });
  },
  navigateToProfile() {
    wx.navigateTo({ url: '/pages/profile/profile' });
  }
}); 