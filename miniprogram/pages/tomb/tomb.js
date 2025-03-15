Page({
  data: {
    images: [
      '/pages/images/hm/hm1.png',
      '/pages/images/hm/hm2.png',
      '/pages/images/hm/hm3.png',
      '/pages/images/hm/hm4.png',
      '/pages/images/hm/hm5.png'
    ],
    maxImages: 9 // 最大图片数量
  },
  chooseImage() {
    const { images, maxImages } = this.data;
    if (images.length >= maxImages) {
      wx.showToast({
        title: `最多只能上传 ${maxImages} 张图片`,
        icon: 'none'
      });
      return;
    }

    wx.chooseImage({
      count: maxImages - images.length, // 计算剩余可上传的图片数量
      success: (res) => {
        const tempFilePaths = res.tempFilePaths; // 获取用户选择的图片路径
        this.setData({
          images: [...images, ...tempFilePaths] // 将新图片添加到数组中
        });
      }
    });
  },
  deleteImage(e) {
    const index = e.currentTarget.dataset.index; // 获取要删除的图片索引
    const images = this.data.images;
    images.splice(index, 1); // 从数组中移除该图片
    this.setData({
      images: images // 更新页面数据
    });
  }
}); 