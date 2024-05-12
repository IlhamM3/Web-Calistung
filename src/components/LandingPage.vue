<script>
import { RouterLink } from 'vue-router'
export default {
    methods: {
        ButtonPlay() {
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
        <div class="flex flex-col gap-5 mb-10 text-5xl text-center">
            <h3 class="font-semibold text-gray-900 text-[40px] md:text-[70px]">Selamat Datang Digames</h3>
            <span class="text-4xl font-bold text-indigo-900 md:text-6xl">🎉CALISTUNG🎉</span>
        </div>
        <div>
            <button @click="ButtonPlay" class="relative w-36 md:w-48">
                <RouterLink to="/belajar">
                    <img class="object-cover w-full h-full" src="@/assets/img/play.png" alt="Play">
                    <img class="absolute inset-0 object-cover w-full h-full transition-opacity duration-300 opacity-0 hover:opacity-100"
                        src="@/assets/img/hoverplay.png" alt="Hover Play">
                </RouterLink>
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
