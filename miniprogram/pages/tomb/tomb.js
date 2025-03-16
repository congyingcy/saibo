Page({
  data: {
    builtInImages: [], // 内置图片列表
    uploadedImages: [], // 用户上传的图片列表
    maxImages: 9, // 最多允许上传9张图片
    hmImageCount: 8 // hm 文件夹中的图片数量
  },
  onLoad() {
    // 动态加载 hm 文件夹中的所有图片
    this.loadBuiltInImages();
  },
  loadBuiltInImages() {
    const hmImages = [];
    for (let i = 1; i <= this.data.hmImageCount; i++) {
      hmImages.push(`/pages/images/hm/hm${i}.png`);
    }
    this.setData({
      builtInImages: hmImages
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
  },
  onImageTap(e) {
    const imageUrl = e.currentTarget.dataset.url;

    wx.showModal({
      title: '提示',
      content: '是否更换首页背景图片？',
      success: (res) => {
        if (res.confirm) {
          // 更换首页背景图片
          const pages = getCurrentPages();
          const indexPage = pages.find(page => page.route === 'pages/index/index');
          if (indexPage) {
            indexPage.setData({
              backgroundImage: imageUrl
            });
            wx.setStorageSync('backgroundImage', imageUrl);
            wx.showToast({ title: '更换成功', icon: 'success' });
          } else {
            // 如果首页未找到，切换到首页
            wx.switchTab({
              url: '/pages/index/index',
              success: () => {
                const pages = getCurrentPages();
                const indexPage = pages[pages.length - 1];
                indexPage.setData({
                  backgroundImage: imageUrl
                });
                wx.setStorageSync('backgroundImage', imageUrl);
                wx.showToast({ title: '更换成功', icon: 'success' });
              }
            });
          }
        }
      }
    });
  }
}); 