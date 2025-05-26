// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 添加页面加载动画
    document.body.classList.add('loaded');
    
    // 平滑滚动导航
    setupSmoothScrolling();
    
    // 响应式导航菜单控制
    setupMobileMenu();
    
    // 图片画廊交互
    if (document.querySelector('.gallery-item')) {
        setupGallery();
    }

    // 视频控制功能
    setupVideoControls();

    // 主题控制功能
    setupThemeControls();
});

// 视频控制功能
function setupVideoControls() {
    // 处理主页面的视频
    document.querySelectorAll('.video-wrapper').forEach(wrapper => {
        const video = wrapper.querySelector('video');
        const playBtn = wrapper.querySelector('.play-btn');
        
        if (video && playBtn) {
            // 播放/暂停按钮点击事件
            playBtn.addEventListener('click', function() {
                if (video.paused) {
                    // 暂停所有其他视频
                    document.querySelectorAll('video').forEach(v => {
                        if (v !== video) {
                            v.pause();
                            const otherBtn = v.closest('.video-wrapper')?.querySelector('.play-btn');
                            if (otherBtn) {
                                otherBtn.textContent = '播放';
                            }
                        }
                    });
                    
                    // 播放当前视频
                    video.play();
                    playBtn.textContent = '暂停';
                } else {
                    video.pause();
                    playBtn.textContent = '播放';
                }
            });

            // 视频结束时重置按钮文本
            video.addEventListener('ended', function() {
                playBtn.textContent = '播放';
            });

            // 视频错误处理
            video.addEventListener('error', function() {
                console.error('视频加载失败:', video.src);
                playBtn.disabled = true;
                playBtn.textContent = '加载失败';
            });
        }
    });

    // 处理模态框中的视频
    document.querySelectorAll('.modal').forEach(modal => {
        const modalVideo = modal.querySelector('video');
        if (modalVideo) {
            // 模态框打开时暂停主页面的视频
            modal.addEventListener('show.bs.modal', function() {
                document.querySelectorAll('.video-wrapper video').forEach(video => {
                    video.pause();
                    const playBtn = video.closest('.video-wrapper')?.querySelector('.play-btn');
                    if (playBtn) {
                        playBtn.textContent = '播放';
                    }
                });
            });

            // 模态框关闭时暂停模态框中的视频
            modal.addEventListener('hidden.bs.modal', function() {
                modalVideo.pause();
            });
        }
    });
}



// 图片画廊交互
function setupGallery() {
    // 动态加载图片和视频
    fetch('https://api.example.com/media') // 假设有一个API提供媒体资源
        .then(response => response.json())
        .then(data => {
            const galleryContainer = document.querySelector('.gallery-container');
            if (!galleryContainer) return;

            data.forEach(item => {
                const mediaElement = document.createElement(item.type === 'image' ? 'img' : 'video');
                mediaElement.src = item.src;
                mediaElement.classList.add('gallery-item');
                galleryContainer.appendChild(mediaElement);

                // 调整媒体样式
                adjustMedia(mediaElement);
            });
        })
        .catch(error => console.error('Error loading media:', error));
}

// createReplaceButton函数已移除

// 调整媒体样式（图片和视频通用）
function adjustMedia(mediaElement) {
    const aspectRatio = getAspectRatio(mediaElement);

    if (Math.abs(aspectRatio - 1) < 0.1) { // 宽高比接近1:1
        mediaElement.style.width = 'auto'; // 不强制设置宽度
        mediaElement.style.height = 'auto'; // 不强制设置高度
    } else {
        mediaElement.style.width = '200px'; // 固定宽度
        mediaElement.style.height = '200px'; // 固定高度
        mediaElement.style.objectFit = 'cover'; // 裁剪内容以保持比例
        mediaElement.style.objectPosition = 'center'; // 居中显示
    }
}

// 主题控制功能
function setupThemeControls() {
    // 初始化主题
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(savedTheme + '-theme');

    // 主题切换按钮
    const themeBtn = document.getElementById('changeThemeBtn');
    if (themeBtn) {
        themeBtn.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            document.body.classList.toggle('light-theme');
            localStorage.setItem('theme', 
                document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        });
    }

    // 动态更新主题样式
    const isDarkTheme = document.body.classList.contains('dark-theme');
    if (isDarkTheme) {
        document.body.style.background = 'linear-gradient(135deg, #1a1a1a, #2a2a2a)';
    } else {
        document.body.style.background = '#f5f5f5';
    }
}

// 平滑滚动功能
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 移动端菜单控制
function setupMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
        
        // 点击菜单项后自动关闭菜单(移动端)
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth < 992) {
                    navbarCollapse.classList.remove('show');
                }
            });
        });
    }
}

// 添加加载完成样式
document.addEventListener('readystatechange', function() {
    if (document.readyState === 'complete') {
        document.body.classList.add('loaded');
    }
});

// 替换按钮功能已移除
function setupReplaceButtons() {
    // 此功能已完全移除
    console.log('替换按钮功能已被移除');
}

// 替换媒体元素功能已移除

// 获取媒体宽高比
function getAspectRatio(mediaElement) {
    if (mediaElement.tagName.toLowerCase() === 'img') {
        return getImageAspectRatio(mediaElement);
    } else if (mediaElement.tagName.toLowerCase() === 'video') {
        return getVideoAspectRatio(mediaElement);
    }
}

// 获取图片宽高比
function getImageAspectRatio(imgElement) {
    const img = new Image();
    img.src = imgElement.src;
    return img.width / img.height;
}

// 获取视频宽高比
function getVideoAspectRatio(videoElement) {
    return videoElement.videoWidth / videoElement.videoHeight;
}

// 保存和加载媒体信息功能已移除