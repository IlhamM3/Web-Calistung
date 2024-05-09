<template>
    <RouterLink to="/belajar/menghitung"></RouterLink>
    <div class="flex items-center justify-center w-screen h-screen">
        <div class="bg-white rounded-xl md:w-[800px] md:h-[350px] w-[300px] h-[320px] px-6 py-6 md:py-10 md:px-10 ">
            <button @click="goHome"
                class="flex gap-x-2 items-center justify-center text-base text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-1.5 me-1 mb-1 md:px-5 md:py-2.5 text-center md:me-2 md:mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor"
                    class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                    <path
                        d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                </svg>Back
            </button>
            <div>
                <div class="mt-5 md:mt-8">
                    <ul class="flex items-center justify-center text-3xl font-bold gap-x-5">
                        <!-- Menampilkan pertanyaan -->
                        <li>{{ currentQuestion.a }} + {{ currentQuestion.b }} = ?</li>
                        <button
                            class="text-white bg-gradient-to-r text-xl from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-1.5 me-1 mb-1 md:px-5 md:py-2.5 text-center md:me-2 md:mb-2"
                            @click="nextQuestion"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                class="bi bi-repeat w-5 h-5" viewBox="0 0 16 16">
                                <path
                                    d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z" />
                            </svg></button>
                    </ul>
                </div>
                <!-- Tambahkan input untuk jawaban -->
                <div class="flex flex-col items-center justify-center w-full">
                    <p v-if="showResult" class="mt-2 text-lg text-red-900">{{ resultMessage }}</p>
                    <input v-model="answer" type="text"
                        class="px-4 py-2 mt-4 border border-gray-300 rounded-lg w-64 md:w-96 "
                        placeholder="Masukan Jawaban Anda" required>
                </div>
                <div class="flex justify-center w-full mt-7 item-center">
                    <button type="submit" @click="checkAnswer" class=" flex gap-x-2 items-center justify-center text-base text-white bg-gradient-to-r
                            from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4
                            focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg
                            text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Kirim
                    </button>
                </div>
                <div v-if="message" class="fixed transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                    <img src="../assets/img/benar.png" class=" w-52 h-52 md:w-96 md:h-96" />
                    <audio id="benaraudio" autoplay>
                        <source src="@/assets/sound/tangan.mp3" type="audio/mp3">
                    </audio>
                </div>
                <div v-if="messagesalah" class="fixed transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                    <img src="../assets/img/salah.png" class="w-52 h-52 md:w-96 md:h-96" />
                    <audio id="salahaudio" autoplay>
                        <source src="@/assets/sound/wrong.mp3" type="audio/mp3">
                    </audio>
                </div>

            </div>
        </div>
    </div>
    <audio id="audio" loop autoplay>
        <source src="@/assets/sound/lofi.mp3" type="audio/mp3">
    </audio>
</template>

<script>
import DataHitung from '@/stores/DataHitung';
import { RouterLink } from 'vue-router'
export default {
    components: {
        RouterLink
    },
    data() {
        return {
            answer: '',
            currentIndex: 0,
            currentQuestion: {},
            showResult: false,
            resultMessage: '',
            checkVariable: true,
            message: false,
            messagesalah: false
        };
    },
    mounted() {
        this.loadData();
        const audio = document.getElementById('audio');
        audio.volume = 0.5;
        document.addEventListener('click', () => {
            audio.play();
        }, { once: true });
    },

    methods: {
        goHome() {
            this.$router.go(-1);
        },
        // Renamed checkVariable method to setCheckVariable
        setCheckVariable() {
            this.checkVariable = true;
        },
        async loadData() {
            try {
                const data = DataHitung.data;
                this.currentQuestion = data[this.currentIndex];
            } catch (error) {
                console.error("Failed to load data: ", error);
            }
        },
        checkAnswer() {
            const expectedAnswer = this.currentQuestion.a + this.currentQuestion.b;

            if (parseInt(this.answer) === expectedAnswer) {
                this.message = true;
                setTimeout(() => {
                    const audiobenar = document.getElementById('benaraudio');
                    audiobenar.play();
                }, 1);
                setTimeout(() => {
                    this.message = false;
                    this.currentIndex++;
                    if (this.currentIndex >= DataHitung.data.length) {
                        this.currentIndex = 0;
                    }
                    this.currentQuestion = DataHitung.data[this.currentIndex];
                    this.answer = '';
                    this.resultMessage = '';
                    this.showResult = false; // Pindahkan ini di sini agar hanya dipanggil ketika jawaban benar
                }, 6000);
            } else if (this.answer === '') {
                this.resultMessage = 'Isikan Jawaban Terlebih Dahulu';
            } else {
                this.messagesalah = true;
                setTimeout(() => {
                    const audiosalah = document.getElementById('salahaudio');
                    audiosalah.play();
                }, 1);
                setTimeout(() => {
                    this.messagesalah = false;
                }, 4000);
                this.showResult = false; // Pindahkan ini di sini agar hanya dipanggil ketika jawaban salah
            }
        },


        nextQuestion() {
            this.currentIndex++;
            if (this.currentIndex >= DataHitung.data.length) {
                this.currentIndex = 0;
            }
            this.currentQuestion = DataHitung.data[this.currentIndex];
            this.showResult = false;
            this.answer = '';
            this.resultMessage = '';
        }
    }
}
</script>