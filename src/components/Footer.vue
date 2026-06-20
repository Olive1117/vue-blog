<template>
  <footer class="footer bg-black text-white p-16 h-128 relative">
    <div class="z-10 flex items-center h-full relative">
      <div class="flex flex-col justify-between h-full flex-2">
        <div>
          <p>OLIVE</p>
          <p>A blog about web development</p>
        </div>
        <p>&copy; 2026 olive</p>
      </div>
      <div class="flex flex-col justify-between h-full ml-16 flex-1">
        <div>
          <p>Contact</p>
        </div>
      </div>
      <div class="flex flex-col justify-between h-full ml-16 flex-1">
        <div>
          <p>Follow Us</p>
        </div>
      </div>
    </div>
    <!-- 装饰角 -->
     <div class="absolute bottom-full left-0 h-12 w-12 bg-black decorative-left"></div>
     <div class="absolute bottom-full right-0 h-12 w-12 bg-black decorative-right"></div>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped>
.decorative-left{
  background: radial-gradient(
    circle at 100% 0,
    transparent 3rem,
    #000 3rem);
}
.decorative-right{
  background: radial-gradient(
    circle at 0 0,
    transparent 3rem,
    #000 3rem);
}
</style>
