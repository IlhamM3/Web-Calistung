<template>
    <div class="flex items-center justify-center w-screen h-screen">
        <div class="bg-white rounded-xl md:w-[800px] md:h-[350px] w-[300px] h-[600px] px-3 py-5 md:py-10 md:px-10 ">
            <div v-if="checkVariable">
                <button @click="goHome"
                    class="flex gap-x-2 items-center justify-center text-base text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-house-door-fill" viewBox="0 0 16 16">
                        <path
                            d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
                    </svg>Home
                </button>
                <div class="flex flex-wrap items-center justify-center gap-10 mt-10">
                    <button
                        class="px-6 py-3 mb-2 text-sm text-xl font-medium font-bold text-center text-white rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 me-2"
                        @click="selectOperator('+')">Penjumlahan(+)</button>
                    <button
                        class="px-6 py-3 mb-2 text-sm text-xl font-medium font-bold text-center text-white rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 me-2"
                        @click="selectOperator('-')">Pengurangan(-)</button>
                    <button
                        class="px-10 py-3 mb-2 text-sm text-xl font-medium font-bold text-center text-white rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 me-2"
                        @click="selectOperator('*')">Perkalian(x)</button>
                    <button
                        class="px-8 py-3 mb-2 text-sm text-xl font-medium font-bold text-center text-white rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 me-2"
                        @click="selectOperator('/')">Pembagian(:)</button>
                </div>
            </div>
            <div v-else>
                <button @click="goBack"
                    class="flex gap-x-2 items-center justify-center text-base text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor"
                        class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                        <path
                            d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                    </svg>Back
                </button>
                <div class="mt-5 md:mt-8">
                    <ul class="flex items-center justify-center text-3xl font-bold gap-x-5">
                        <!-- Menampilkan pertanyaan -->
                        <li>{{ currentQuestion.a }} {{ operator }} {{ currentQuestion.b }} = ?</li>
                        <button
                            class="text-white bg-gradient-to-r text-xl from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            @click="nextQuestion"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                fill="currentColor" class="bi bi-repeat" viewBox="0 0 16 16">
                                <path
                                    d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z" />
                            </svg></button>
                    </ul>
                </div>
                <!-- Tambahkan input untuk jawaban -->
                <div class="flex flex-col items-center justify-center w-full">
                    <p v-if="showResult" class="mt-2 text-lg text-red-900">{{ resultMessage }}</p>
                    <input v-model="answer" type="text" class="px-4 py-2 mt-4 border border-gray-300 rounded-lg w-96 "
                        placeholder="Masukan Jawaban Anda" required>
                </div>
                <div class="flex justify-center w-full mt-7 item-center">
                    <button type="submit" @click="checkAnswer" class=" flex gap-x-2 items-center justify-center text-base text-white bg-gradient-to-r
                            from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4
                            focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg
                            text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Check Answer
                    </button>
                </div>
                <div v-if="message" class="fixed transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                    <iframe src="https://giphy.com/embed/uVpPvvpU3nip5pBkPD" width="580" height="366" frameBorder="0"
                        class="giphy-embed" allowFullScreen></iframe>
                    <audio id="benaraudio" autoplay>
                        <source src="@/assets/sound/tangan.mp3" type="audio/mp3">
                    </audio>
                </div>
                <div v-if="messagesalah" class="fixed transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                    <iframe src="https://giphy.com/embed/giid5FskDmHbtLU72g" width="480" height="480" frameBorder="0"
                        class="giphy-embed" allowFullScreen></iframe>
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

export default {
    data() {
        return {
            answer: '',
            currentIndex: 0,
            currentQuestion: {},
            showResult: false,
            resultMessage: '',
            checkVariable: true,
            operator: '',
            message: false,
            messagesalah: false
        };
    },
    mounted() {
        this.loadData();
    },
    methods: {
        goBack() {
            this.checkVariable = true;
        },
        goHome() {
            this.$router.go(-1);
        },
        // Renamed checkVariable method to setCheckVariable
        setCheckVariable() {
            this.checkVariable = true;
        },
        selectOperator(operator) {
            this.operator = operator;
            this.checkVariable = false;
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
            let expectedAnswer;
            switch (this.operator) {
                case '+':
                    expectedAnswer = this.currentQuestion.a + this.currentQuestion.b;
                    break;
                case '-':
                    expectedAnswer = this.currentQuestion.a - this.currentQuestion.b;
                    break;
                case '*':
                    expectedAnswer = this.currentQuestion.a * this.currentQuestion.b;
                    break;
                case '/':
                    expectedAnswer = this.currentQuestion.a / this.currentQuestion.b;
                    break;
            }
            if (parseInt(this.answer) === expectedAnswer) {
                this.message = true;
                const audiobenar = document.getElementById('benaraudio');
                setTimeout(() => {
                    this.message = false;
                }, 8000);
                audiobenar.play();

            } else if (this.answer === '') {
                this.resultMessage = 'Isikan Jawaban Terlebih Dahulu';
            } else {
                this.messagesalah = true;
                const audiosalah = document.getElementById('salahaudio');
                setTimeout(() => {
                    this.messagesalah = false;
                }, 4000);
                audiosalah.play();
            }
            this.showResult = true
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