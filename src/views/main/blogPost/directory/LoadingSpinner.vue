<template>
  <div class="loading-spinner">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<style scoped>
.loading-spinner {
  display: inline-block;
  position: relative;
  width: 20px;
  height: 20px;
}

.loading-spinner div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 16px;
  height: 16px;
  margin: 2px;
  border: 2px solid currentColor;
  border-radius: 50%;
  animation: loading-spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: currentColor transparent transparent transparent;
}

.loading-spinner div:nth-child(1) {
  animation-delay: -0.45s;
}

.loading-spinner div:nth-child(2) {
  animation-delay: -0.3s;
}

.loading-spinner div:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes loading-spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
