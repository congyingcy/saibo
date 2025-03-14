Page({
  data: {
    years: 0,
    months: 0,
    seconds: 0
  },
  onLoad() {
    const birthDate = new Date('1990-01-01'); // 替换为用户的实际出生日期
    const now = new Date();
    const diff = now - birthDate;

    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const seconds = Math.floor(diff / 1000);

    this.setData({ years, months, seconds });
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