<template>
  <main
    class="flex flex-col min-h-screen justify-start items-center text-center pt-[15vh]"
  >
    <h1 class="text-3xl font-bold mb-8">404 Not Found :(</h1>
    <div class="flex gap-4">
      <button
        class="btn btn-neutral btn-lg hover:bg-white hover:text-black transition-colors duration-200"
        @click="$router.back()"
      >
        Go Back
      </button>
      <button
        class="btn btn-neutral btn-lg hover:bg-white hover:text-black transition-colors duration-200"
        @click="$router.push('/')"
      >
        Start Over
      </button>
    </div>
  </main>
</template>

<script setup></script>

<style lang="scss" scoped></style>
