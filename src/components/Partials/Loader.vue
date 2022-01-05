<template>
  <div class="flex loader-wrapper items-center justify-center">
    <div class="loader">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loader",
};
</script>

<style lang="scss" scoped>
// styling of loading animation
.loader-wrapper {
  height: 40vh;
}
.loader {
  position: relative;
  width: 80px;
  height: 30px;
  margin-bottom: 40px;
}
.loader div {
  position: absolute;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #ffb319;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.loader div:nth-child(1) {
  left: 4px;
  animation: loader1 0.6s infinite;
}
.loader div:nth-child(2) {
  left: 4px;
  animation: loader2 0.6s infinite;
}
.loader div:nth-child(3) {
  left: 28px;
  animation: loader2 0.6s infinite;
}
.loader div:nth-child(4) {
  left: 52px;
  animation: loader3 0.6s infinite;
}
@keyframes loader1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes loader3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes loader2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
</style>
