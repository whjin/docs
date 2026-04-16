import HardwareServcice from './HardwareService';

// 电子签名板服务
class SignatureService extends HardwareServcice {
  constructor() {
    super({ wsUrl: 'ws://localhost:8888/signature-pad' });
  }
  // 打开签名板
  async openPad() {
    return this.sendCommand('signpad_open');
  }

  /**
   * 开始签名
   * @param {Object} options 笔迹参数（颜色、宽度）
   */

  async startSign(options = { color: '#000000', width: 3 }) {
    return this.sendCommand('signpad_start', options);
  }

  // 结束签名并获取签名图片
  async endSign() {
    const result = await this.sendCommand('signpad_end');
    return `data:image/png;base64,${result.signData}`;
  }

  // 清空签名板
  async clearPad() {
    return this.sendCommand('signpad_clear');
  }

  // 关闭签名板
  async closePad() {
    return this.sendCommand('signpad_close');
  }
}

export default new SignatureService();
