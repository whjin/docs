/* 
硬件外设统一基类（单例模式）
处理 WebSocket 连接、断线重连、通用指令发送、超时控制
*/

export default class HardwareServcice {
  constructor(config = {}) {
    if (HardwareServcice.instance) {
      return HardwareServcice.instance;
    }

    // 配置项（可由子类覆盖）
    this.config = {
      wsUrl: 'ws://localhost:8080/hardware-driver',
      reconnectInterval: 3000,
      maxReconnectAttempts: 5,
      requestTimeout: 10000,
      ...config,
    };

    this.ws = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.pendingRequests = new Map();

    HardwareServcice.instance = this;
  }

  // 连接硬件驱动
  async connect() {
    return new Promise((resolve, reject) => {
      if (this.isConnected) {
        resolve();
        return;
      }

      console.log(`[Hardware] 正在连接硬件驱动: ${this.config.wsUrl}`);
      this.ws = new WebSocket(this.config.wsUrl);

      this.ws.onopen = () => {
        console.log('[Hardware] 硬件驱动连接成功');
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this._clearAllPendingRequests(); // 清空所有未完成的请求
        resolve();
      };

      this.ws.onerror = (error) => {
        console.error('[Hardware] 硬件驱动连接失败:', error);
        this.isConnected = false;
        reject(new Error('硬件驱动连接失败，请检查驱动是否启动'));
      };

      this.ws.onclose = () => {
        console.warn('[Hardware] 硬件驱动连接断开');
        this.isConnected = false;
        this._attemptReconnect();
      };

      // 监听服务端响应
      this.ws.onmessage = (event) => {
        this._handleReponse(event.data);
      };
    });
  }

  // 断线重连机制
  _attemptReconnect() {
    if (this.reconnectAttempts < this.config.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`[Hardware] 尝试第 ${this.reconnectAttempts} 次重连...`);
      setTimeout(() => this.connect(), this.config.reconnectInterval);
    } else {
      console.error('[Hardware] 重连失败，请手动重启硬件驱动');
      this._clearAllPendingRequests(new Error('硬件连接已断开，请重试'));
    }
  }

  // 通用发送指令方法
  sendCommand(command, params = {}) {
    return new Promise((resolve, reject) => {
      if (!this.isConnected) {
        reject(new Error('硬件未连接，请先连接硬件驱动'));
        return;
      }
      // 生成唯一消息 ID（用于匹配请求和响应）
      const messageId = `${command}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      const request = { id: messageId, command, params };

      // 超时处理
      const timer = setTimeout(() => {
        this.pendingRequests.delete(messageId);
        reject(new Error(`指令 "${command}" 超时，请检查设备连接`));
      }, this.config.requestTimeout);

      // 保存请求的 resolve/reject
      this.pendingRequests.set(messageId, { resolve, reject, timer });

      // 发送指令
      console.log(`[Hardware] 发送指令: ${command}`, params);
      this.ws.send(JSON.stringify(request));
    });
  }

  _handleReponse(data) {
    try {
      const response = JSON.parse(data);
      const { id, success, result, error } = response;

      // 查找对应的待处理请求
      const pending = this.pendingRequests.get(id);
      if (!pending) return;

      if (success) {
        console.log(`[Hardware] 指令成功: ${id}`, result);
        pending.resolve(result);
      } else {
        console.error(`[Hardware] 指令失败: ${id}`, error);
        pending.reject(new Error(error || '硬件操作失败'));
      }
    } catch (error) {
      console.log('[Hardware] 解析响应失败:', error);
    }
  }

  // 清空所有待处理请求（可选：传入错误对象 reject 所有请求）
  _clearAllPendingRequests(error = null) {
    this.pendingRequests.forEach((pending) => {
      clearTimeout(pending.timer);
      if (error) pending.reject(error);
    });
    this.pendingRequests.clear();
  }

  // 断开连接
  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
      this.isConnected = false;
      this._clearAllPendingRequests();
      HardwareServcice.instance = null;
    }
  }
}
