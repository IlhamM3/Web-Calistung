<script>
import { RouterLink } from 'vue-router'
export default {
    data() {
        return {
            Played: false
        }
    },
    methods: {
        ButtonPlay() {
            this.Played = true
            const audio = document.getElementById('audio');
            audio.play();
        }
    },
    components: {
        RouterLink
    }
}
</script>

<template>
    <div class="flex flex-col items-center justify-center h-screen ">
        <div class="flex flex-col gap-5 mb-10 text-center text-5xl">
            <h3 class="font-semibold">Selamat Datang Digames</h3>
            <span class="text-6xl font-bold text-indigo-700">🎉CALISTUNG🎉</span>
        </div>
        <div v-if="Played" class="flex gap-10 flex-wrap">
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
        <div v-else>
            <button @click="ButtonPlay" class="w-48 relative">
                <img class="w-full h-full object-cover" src="@/assets/img/play.png" alt="Play">
                <img class="absolute inset-0 w-full h-full object-cover opacity-0 hover:opacity-100 transition-opacity duration-300"
                    src="@/assets/img/hoverplay.png" alt="Hover Play">
            </button>
        </div>
    </div>
</template>

<style>
/* Style untuk hover effect */
button img {
    transition: opacity 0.5s ease-in-out;
}

/* Saat tombol dihover */
button:hover img:first-child {
    opacity: 0;
}

button:hover img:last-child {
    opacity: 1;
}
</style>
