# 个人网站使用指南

## 替换照片和视频

### 替换照片
1. 将您的照片放入`images`文件夹
2. 支持的格式：JPG, PNG, GIF
3. 推荐尺寸：
   - 头像照片：500x500像素
   - 作品照片：800x600像素或相同比例
4. 修改HTML文件中的图片路径：
   ```html
   <!-- 在index.html中替换头像 -->
   <img src="images/your-new-profile.jpg" alt="个人照片">
   
   <!-- 在gallery.html中替换作品 -->
   <img src="images/your-new-work1.jpg" alt="作品1">
   ```

### 替换视频
1. 将您的视频放入`videos`文件夹
2. 支持的格式：MP4, WebM
3. 修改HTML文件中的视频路径：
   ```html
   <video controls>
     <source src="videos/your-new-video.mp4" type="video/mp4">
   </video>
   ```

## 注意事项
1. 保持文件名简洁，不要使用空格和特殊字符
2. 替换后请刷新浏览器查看效果
3. 如需添加更多作品，复制现有的HTML结构并修改路径