<template>
    <div class="h-screen flex items-center justify-center bg-gray-100">
      <div class="flex flex-col items-center gap-4">
        <div class="animate-spin rounded-full border-4 border-blue-500 border-t-transparent w-12 h-12"></div>
        <p class="text-lg text-gray-700 font-semibold">Redirecting</p>
      </div>
    </div>
  </template>  
  
<script setup>
const router = useRouter()

onMounted(() => {
  router.push('/login')
})
</script>
