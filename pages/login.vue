<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="w-full max-w-md space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
        </div>
  
        <!-- Error Message -->
        <div v-if="error" class="text-red-600 text-center p-4 rounded bg-red-50">
          {{ error }}
        </div>
  
        <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
          <div class="space-y-4">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
  
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                v-model="form.password"
                type="password"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
  
          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="!loading">Sign in</span>
              <span v-else>Signing in...</span>
            </button>
          </div>
  
          <div class="text-center text-sm text-gray-600">
            Don't have an account?
            <NuxtLink
              to="/register"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Register here
            </NuxtLink>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  const { public: { backendUrl } } = useRuntimeConfig();
  
  const form = reactive({
    email: '',
    password: ''
  });
  
  const loading = ref(false);
  const error = ref('');
  
  const handleLogin = async () => {
    loading.value = true;
    error.value = '';
  
    try {
      const { token } = await $fetch(`${backendUrl}/login`, {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      // Store token in localStorage
      localStorage.setItem('auth_token', token);
      
      // Redirect to dashboard or home page
      await navigateTo('/dashboard');
      
    } catch (err) {
      error.value = err.data?.message || 'Login failed. Please check your credentials.';
    } finally {
      loading.value = false;
    }
  };
  </script>