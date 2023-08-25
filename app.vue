<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
.router-link-active,
.router-link-exact-active {
  color: rgb(255, 255, 255);
  font-weight: 700;
  background-image: linear-gradient(to right, #68d391, #34d399, #22d3ee);
}

@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
</style>
