/* 
Web 端通过 WebSocket 连接本地硬件驱动
硬件外设统一管理类（单例模式）
*/

class HardwareServcice {
  constructor() {
    if (HardwareServcice.instance) {
      return HardwareServcice.instance;
    }

    this.ws = null;
    this.connected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.baseUrl = 'ws://localhost:8080/hardware';

    HardwareServcice.instance = this;
  }

  // 连接硬件驱动
  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.baseUrl);

      this.ws.onopen = () => {
        console.log('[Hardware] 硬件驱动连接成功');
        this.connected = true;
        this.reconnectAttempts = 0;
        resolve();
      };

      this.ws.onerror = (error) => {
        console.error('[Hardware] 硬件驱动连接失败:', error);
        this.connected = false;
        reject(new Error('硬件驱动连接失败，请检查驱动是否启动'));
      };

      this.ws.onclose = () => {
        console.warn('[Hardware] 硬件驱动连接断开');
        this.connected = false;
        this._attemptReconnect();
      };
    });
  }

  // 断线重连机制
  _attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`[Hardware] 尝试第 ${this.reconnectAttempts} 次重连...`);
      setTimeout(() => this.connect(), 3000);
    } else {
      console.error('[Hardware] 重连失败，请手动重启硬件驱动');
    }
  }

  // 通用发送指令方法
  async _sendCommand(command, params = {}) {
    if (!this.connected) {
      throw new Error('硬件未连接，请先连接硬件驱动');
    }

    return new Promise((resolve, reject) => {
      const messageId = Date.now().toString();
      const request = { id: messageId, command, params };

      // 监听响应
      const handleMessage = (event) => {
        const response = JSON.parse(event.data);
        if (response.id === messageId) {
          this.ws.removeEventListener('message', handleMessage);
          if (response.success) {
            resolve(response.data);
          } else {
            reject(new Error(response.error || '硬件操作失败'));
          }
        }
      };

      this.ws.addEventListener('message', handleMessage);
      this.ws.send(JSON.stringify(request));

      setTimeout(() => {
        this.ws.removeEventListener('message', handleMessage);
        reject(new Error('硬件操作超时，请检查设备连接'));
      }, 10000);
    });
  }
}

// 高拍仪服务（继承自 HardwareService）
class HighCameraService extends HardwareServcice {
  // 打开摄像头预览
  async openPreview() {
    console.log('[HighCamera] 打开摄像头预览');
    return this._sendCommand('camera_open_preview');
  }

  /* 
  拍摄照片
  拍摄参数（如分辨率、是否自动裁剪）
  */
  async captureImage(options = { resolution: '1920x1080', autoCrop: true }) {
    console.log('[HighCamera] 拍摄照片，参数:', options);
    const result = await this._sendCommand('camera_capture', options);
    // 统一返回 base64 格式图片
    return `data:image/jpeg;base64,${result.imageData}`;
  }

  // 关闭摄像头
  async closeCamera() {
    console.log('[HighCamera] 关闭摄像头');
    return this._sendCommand('camera_close');
  }
}

// 电子签名板服务
class SignatureService extends HardwareServcice {
  // 打开签名板
  async openSignPad() {
    console.log('[Signature] 打开签名板');
    return this._sendCommand('signpad_open');
  }

  // 开始签名
  async startSign(options = { color: '#000000', width: 2 }) {
    console.log('[Signature] 开始签名，参数:', options);
    return this._sendCommand('signpad_start', options);
  }

  // 结束签名并获取签名图片
  async endSign() {
    console.log('[Signature] 结束签名');
    const result = await this._sendCommand('signpad_end');
    return `data:image/png;base64,${result.signData}`;
  }

  // 清空签名板
  async clearSignPad() {
    console.log('[Signature] 清空签名板');
    return this._sendCommand('signpad_clear');
  }
}

// 导出单例实例
export const highCameraService = new HighCameraService();
export const signatureService = new SignatureService();
