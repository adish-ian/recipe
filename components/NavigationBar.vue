<template>
  <nav class="bg-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Left Side: Logo and Links -->
        <div class="flex items-center">
          <NuxtLink to="/" class="flex-shrink-0">
            <img
              class="h-8 w-auto"
              src="https://placehold.co/150x50"
              alt="Logo"
            />
          </NuxtLink>
          <div class="hidden md:flex md:space-x-8 md:ml-10">
            <NuxtLink
              to="/"
              class="text-gray-900 hover:text-indigo-600 inline-flex items-center px-1 pt-1 text-sm font-medium"
            >
              Home
            </NuxtLink>
            <NuxtLink
              to="/recipes"
              class="text-gray-900 hover:text-indigo-600 inline-flex items-center px-1 pt-1 text-sm font-medium"
            >
              Recipes
            </NuxtLink>
          </div>
        </div>

        <!-- Right Side: Auth Links or User Dropdown -->
        <div class="flex items-center">
          <template v-if="!isUserAuthenticated">
            <NuxtLink
              to="/login"
              class="text-gray-900 hover:text-indigo-600 inline-flex items-center px-3 py-2 text-sm font-medium"
            >
              Login
            </NuxtLink>
            <NuxtLink
              to="/register"
              class="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Register
            </NuxtLink>
          </template>

          <template v-else>
            <div class="relative ml-3">
              <button
                @click="toggleDropdown"
                class="flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://placehold.co/40x40"
                  alt="User Avatar"
                />
                <span class="ml-2 text-gray-700">{{ user?.name }}</span>
                <ChevronDownIcon class="ml-1 h-4 w-4 text-gray-500" />
              </button>

              <!-- Dropdown Menu -->
              <div
                v-if="isDropdownOpen"
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="py-1">
                  <NuxtLink
                    to="/profile"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </NuxtLink>
                  <button
                    @click="handleLogout"
                    class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
import { useRuntimeConfig } from '#app';

const router = useRouter();
const config = useRuntimeConfig();

const isDropdownOpen = ref(false);
const user = ref(null);
const isUserAuthenticated = computed(() => typeof window !== 'undefined' && localStorage.getItem('auth_token') !== null);

const fetchUserData = async () => {
  if (!isUserAuthenticated.value) return;

  try {
    const response = await fetch(`${config.public.backendUrl}/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) throw new Error('Failed to fetch user');

    const data = await response.json();
    user.value = data; // Expecting { name: "User Name" }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

const handleLogout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
  router.push('/dashboard');
};

onMounted(() => {
  fetchUserData();
});

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
</script>


