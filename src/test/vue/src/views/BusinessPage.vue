<template>
  <div class="container">
    <button @click="handleOpenCamera" :disabled="cameraLoading">
      打开摄像头
    </button>
    <button @click="handleCapture" :disabled="cameraLoading">拍摄照片</button>
    <button @click="handleCloseCamera" :disabled="cameraLoading">
      关闭摄像头
    </button>
    <img
      v-if="capturedImage"
      :src="capturedImage"
      alt="拍摄照片"
      style="width: 400px; margin-top: 10px"
    />

    <button @click="handleOpenSignPad" :disabled="signLoading">
      打开签名板
    </button>
    <button @click="handleStartSign" :disabled="signLoading">开始签名</button>
    <button @click="handleEndSign" :disabled="signLoading">结束签名</button>
    <button @click="handleClearSign" :disabled="signLoading">清空签名</button>
    <img
      v-if="signatureImage"
      :src="signatureImage"
      alt="签名"
      style="width: 400px; margin-top: 10px; border: 1px solid #ccc"
    />
  </div>
</template>

<script setup name="BusinessPage">
import { ref, onMounted } from 'vue';
import highCameraService from '@/services/hardware/HighCameraService';
import signatureService from '@/services/hardware/SignatureService';

let cameraLoading = ref(false);
let signLoading = ref(false);
let capturedImage = ref('');
let signatureImage = ref('');

async function handleOpenCamera() {
  cameraLoading.value = true;
  try {
    await highCameraService.connect();
    await highCameraService.openPreview();
    alert('摄像头预览已打开');
  } catch (error) {
    alert(error);
  } finally {
    cameraLoading.value = false;
  }
}

async function handleCapture() {
  cameraLoading.value = true;
  try {
    capturedImage.value = await highCameraService.captureImage({
      autoCrop: true,
    });
  } catch (error) {
    alert(error.message);
  } finally {
    cameraLoading.value = false;
  }
}

async function handleCloseCamera() {
  cameraLoading.value = true;
  try {
    await highCameraService.closePreview();
    capturedImage.value = '';
    alert('摄像头已关闭');
  } catch (error) {
    alert(error.message);
  } finally {
    this.cameraLoading = false;
  }
}

async function handleOpenSignPad() {
  signLoading.value = true;
  try {
    await signatureService.connect();
    await signatureService.openPad();
    alert('签名板已打开');
  } catch (error) {
    alert(error.message);
  } finally {
    this.signLoading = false;
  }
}

async function handleStartSign() {
  signLoading.value = true;
  try {
    await signatureService.startSign({ color: '#0066cc', width: 2 });
    alert('请在签名板上签名');
  } catch (error) {
    alert(error.message);
  } finally {
    this.signLoading = false;
  }
}

async function handleEndSign() {
  signLoading.value = true;
  try {
    signatureImage = await signatureService.endSign();
  } catch (error) {
    alert(error.message);
  } finally {
    this.signLoading = false;
  }
}

async function handleClearSign() {
  signLoading.value = true;
  try {
    await signatureService.clearPad();
    signatureImage.value = '';
  } catch (error) {
    alert(error.message);
  } finally {
    this.signLoading = false;
  }
}

onMounted(() => {});
</script>

<style scoped lang="less">
button {
  margin-right: 1em;
}
</style>
