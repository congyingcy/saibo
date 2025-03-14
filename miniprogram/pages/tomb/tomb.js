Page({
  data: {
    images: [
      '/images/tomb1.jpg',
      '/images/tomb2.jpg',
      '/images/tomb3.jpg',
      '/images/tomb4.jpg'
    ]
  },
  chooseImage() {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0];
        this.setData({
          images: [...this.data.images, tempFilePath]
        });
      }
    });
  }
}); 