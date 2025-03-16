Page({
  data: {
    builtInImages: [
      '/pages/images/hm/hm1.png',
      '/pages/images/hm/hm2.png',
      '/pages/images/hm/hm3.png',
      '/pages/images/hm/hm4.png'
    ],
    uploadedImages: [],
    maxImages: 9 // 最多允许上传9张图片
  },
  onLoad() {
    // 初始化页面时加载内置图片
    this.setData({
      images: this.data.builtInImages
    });
  },
  chooseImage() {
    const { uploadedImages, maxImages } = this.data;
    const remainingSlots = maxImages - uploadedImages.length;

    if (remainingSlots <= 0) {
      wx.showToast({
        title: '最多只能上传9张图片',
        icon: 'none'
      });
      return;
    }

    wx.chooseImage({
      count: remainingSlots,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const newImages = res.tempFilePaths;
        this.setData({
          uploadedImages: [...uploadedImages, ...newImages]
        });
      }
    });
  },
  deleteImage(event) {
    const index = event.currentTarget.dataset.index;
    const { uploadedImages } = this.data;
    uploadedImages.splice(index, 1);
    this.setData({
      uploadedImages
    });
  }
}); 