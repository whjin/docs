import HardwareServcice from './HardwareService';

// 高拍仪服务（继承基类，封装业务化 API）
class HighCameraService extends HardwareServcice {
  constructor() {
    // 可传入高拍仪专属配置
    super({ wsUrl: 'ws://localhost:8080/high-camera' });
  }
  // 打开摄像头预览
  async openPreview(options = { resolution: '1920x1080' }) {
    console.log('[HighCamera] 打开摄像头预览');
    return this.sendCommand('camera_open_preview');
  }

  /* 
  拍摄照片
  拍摄参数（如是否自动裁剪、旋转）
  */
  async captureImage(options = { autoCrop: true, rotate: 0 }) {
    const result = await this.sendCommand('camera_capture', options);
    // 统一返回 base64 格式图片
    return `data:image/jpeg;base64,${result.imageData}`;
  }

  // 关闭摄像头
  async closePreivew() {
    return this.sendCommand('camera_close_preview');
  }
}

export default new HighCameraService();
