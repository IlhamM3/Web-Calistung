<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <div class="flex flex-col gap-5 mb-10 text-5xl text-center">
            <h3 class="font-semibold text-gray-900 text-[40px] md:text-[70px]">Selamat Datang Digames</h3>
            <span class="text-4xl font-bold text-indigo-900 md:text-6xl">🎉CALISTUNG🎉</span>
            <div class="flex flex-wrap justify-center gap-x-10 gap-y-5 align-center">
                <button type="button"
                    class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl hover:ring-4 hover:outline-none hover:ring-cyan-300 dark:hover:ring-cyan-800 font-medium rounded-lg text-2xl px-5 py-2.5 text-center me-2 mb-2">
                    <RouterLink to="/belajar/membaca">
                        Membaca
                    </RouterLink>
                </button>
                <button type="button"
                    class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl hover:ring-4 hover:outline-none hover:ring-cyan-300 dark:hover:ring-cyan-800 font-medium rounded-lg text-2xl px-5 py-2.5 text-center me-2 mb-2">
                    <RouterLink to="/belajar/menulis">
                        Menulis
                    </RouterLink>
                </button>
                <button type="button"
                    class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl hover:ring-4 hover:outline-none hover:ring-cyan-300 dark:hover:ring-cyan-800 font-medium rounded-lg text-2xl px-5 py-2.5 text-center me-2 mb-2">
                    <RouterLink to="/belajar/menghitung">
                        Menghitung
                    </RouterLink>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';
export default {
    components: {
        RouterLink,
    }
}
</script>