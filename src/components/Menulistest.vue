<template>
    <RouterLink to="/belajar/menulis"></RouterLink>
    <div class="flex items-center justify-center w-screen h-screen">
        <div class="bg-white rounded-xl w-[350px] h-[630px] md:w-[1080px] md:h-[550px] p-5 md:p-10 relative">
            <button @click="goBack"
                class="flex gap-x-2 items-center justify-center text-base text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor"
                    class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                    <path
                        d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                </svg>Back
            </button>
            <h3 class="block text-base font-bold md:hidden">silakan pilih Tulisan yang ingin ditulis</h3>
            <div class="flex flex-row mt-4 md:flex-col md:mt-0">
                <h3 class="hidden mb-2 text-xl font-bold md:block ">Silakan pilih tulisan:</h3>
                <div class="flex items-center ">
                    <button @click="buttonangka"
                        class="px-2 py-2 mb-2 text-sm font-medium font-bold text-center text-white rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 me-2">Angka</button>
                    <button @click="buttonhuruf"
                        class="px-2 py-2 mb-2 text-sm font-medium font-bold text-center text-white rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 me-2">Huruf</button>
                </div>
                <h3 class="hidden mb-2 text-xl font-bold md:block">Ganti Angka/Huruf</h3>
                <button id="btnChangeImage"
                    class="flex px-2 py-2 mb-2 text-sm font-medium font-bold text-center text-white rounded-md md:w-20 gap-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 me-2"
                    @click="changeImage">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                        class="bi bi-repeat" viewBox="0 0 16 16">
                        <path
                            d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z" />
                    </svg><span class="hidden md:block">Ganti</span></button>
            </div>
            <!-- Teks yang akan ditampilkan di belakang canvas -->
            <div
                class="absolute w-[300px] md:w-[700px] z-10 transform -translate-y-1/2 top-2/3 md:top-1/2 left-32 md:left-1/2 -translate-x-1/3">
                <h3 class="text-center text-[210px] md:text-[400px] raleway-dots-regular"
                    v-for="(part, index) in caption" :key="index">
                    {{
                part.text }}</h3>
            </div>
            <!-- Canvas untuk menggambar -->
            <canvas id="canvas"
                class="absolute z-20 transform -translate-y-1/2 -translate-x-1/3 top-2/3 md:top-1/2 left-32 md:left-1/2"></canvas>
            <!-- Tombol dan hasil -->
            <div class="flex flex-row gap-2 mt-2 md:flex-col ">
                <h3 class="hidden my-2 text-xl font-bold md:block">Mengatur ketebalan garis</h3>
                <span class="w-56 py-1 text-base font-bold text-center text-white bg-blue-500 rounded-lg">Ketebalan
                    Garis: {{ lineWidth }} %</span>
                <div class="flex gap-x">
                    <button @click="increaseLineWidth"
                        class="w-8 p-2 mb-2 text-sm text-base font-medium font-bold text-center text-white rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 me-2"><svg
                            xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-plus" viewBox="0 0 16 16">
                            <path
                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                        </svg></button>
                    <button @click="decreaseLineWidth"
                        class="w-8 p-2 mb-2 text-sm text-base font-medium font-bold text-center text-white rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 me-2"><svg
                            xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-dash" viewBox="0 0 16 16">
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                        </svg></button>
                </div>
            </div>
            <div class="flex flex-col mt-4 md:mt-0 gap-x-1">
                <h3 class="hidden mb-4 text-xl font-bold md:block">Alat yang digunakan</h3>
                <div class="text-base font-semibold">Ganti ke: <button
                        class="px-2 py-2 mb-2 text-sm font-medium font-bold text-center text-white rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 me-2"
                        @click="toggleTool">{{ isEraser ? 'Pensil' : 'Penghapus' }}</button></div>

            </div>
        </div>
    </div>
</template>

<script>
import DataMembaca from '@/stores/DataMembaca';
import { RouterLink } from 'vue-router'
export default {
    components: {
        RouterLink
    },
    data() {
        return {
            Menulis: [],
            isDrawing: false,
            lastX: 0,
            lastY: 0,
            examplePath: [], // Jalur gambar referensi
            exampleDrawn: false,
            lineWidth: 10, // Ketebalan garis awal
            isEraser: false,
            lastClickedData: null,
            caption: [],
            imageShown: false,
            currentIndex: 0,
            checkcurrent: false,
            checkdata: true
        }
    },
    async mounted() {
        this.canvas();
        if (this.checkdata) {
            let data = DataMembaca.dataawal;
            this.lastClickedData = data; // Menyimpan data yang diklik terakhir kali
            this.loadData(data);
            const currentData = this.lastClickedData;
            const imageData = currentData[this.currentIndex];
            this.caption = imageData.caption.map(text => ({ text }));
        }

    },
    methods: {
        buttonhuruf() {
            this.buttonHandler('huruf');
        },
        buttonangka() {
            this.buttonHandler('angka');
        },

        buttonHandler(dataType) {
            this.checkdata = false
            let data;
            switch (dataType) {
                case 'huruf':
                    data = DataMembaca.datahuruf;
                    this.currentIndex = 0
                    this.checkcurrent = true
                    this.clearCanvas()
                    break;
                case 'angka':
                    data = DataMembaca.dataangka;
                    this.currentIndex = 0
                    this.checkcurrent = true
                    this.clearCanvas()
                    break;
                default:
                    console.error("Jenis data tidak valid");
                    return;
            }
            this.lastClickedData = data; // Menyimpan data yang diklik terakhir kali
            this.loadData(data);
            const currentData = this.lastClickedData;
            const imageData = currentData[this.currentIndex]; // Dapatkan data gambar berdasarkan currentIndex
            this.caption = imageData.caption.map(text => ({ text }));
        },
        async loadData(data) {
            try {
                this.caption = data.caption;
            } catch (error) {
                console.error("Gagal memuat data: ", error);
            }
        },
        async changeImage() {
            this.checkdata = false
            this.clearCanvas();
            try {
                let Data = this.lastClickedData; // Menggunakan data terakhir yang diklik
                if (this.checkcurrent) {
                    this.currentIndex = 1
                    this.checkcurrent = false
                }
                if (!Data) {
                    console.error("Tidak ada data yang tersedia!");
                    return;
                }
                const dataLength = Data.length;
                const imageData = Data[this.currentIndex]; // Dapatkan data gambar berdasarkan currentIndex
                this.caption = imageData.caption.map(text => ({ text }));
                this.imageShown = false;
                await this.delay(500); // Jeda selama 1 detik sebelum menampilkan gambar baru
                this.imageShown = true;
                this.currentIndex = (this.currentIndex + 1) % dataLength; // Pindah ke indeks gambar berikutnya
            } catch (error) {
                console.error("Gagal mengubah gambar: ", error);
            }
        },
        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        goBack() {
            this.$router.go(-1);
        },
        canvas() {
            let canvas = document.getElementById("canvas");
            let ctx = canvas.getContext("2d");
            console.log(innerWidth)
            if (window.innerWidth <= 400) {
                canvas.width = 300; // Atur lebar canvas menjadi 150px
                canvas.height = 310; // Atur tinggi canvas menjadi 200px
            } else {
                canvas.width = window.innerWidth * 0.5; // Menggunakan 50% dari lebar layar
                canvas.height = window.innerHeight * 0.6; // Menggunakan 60% dari tinggi layar
            }

            canvas.addEventListener("mousedown", this.startDrawing);
            canvas.addEventListener("touchstart", this.startDrawing);
            canvas.addEventListener("mousemove", this.draw);
            canvas.addEventListener("touchmove", this.draw);
            canvas.addEventListener("mouseup", this.stopDrawing);
            canvas.addEventListener("touchend", this.stopDrawing);


        },
        startDrawing(e) {
            this.isDrawing = true;
            [this.lastX, this.lastY] = this.getMousePos(e);
        },
        draw(e) {
            if (!this.isDrawing) return;
            e.preventDefault();
            let [x, y] = this.getMousePos(e);
            let ctx = document.getElementById("canvas").getContext("2d");
            ctx.beginPath();
            ctx.moveTo(this.lastX, this.lastY);
            ctx.lineTo(x, y);
            if (this.isEraser) {
                // If using the eraser tool, clear the content instead of drawing
                let eraserSize = this.lineWidth + 10; // Determine eraser size
                ctx.clearRect(x - eraserSize / 2, y - eraserSize / 2, eraserSize, eraserSize); // Clear a square area

            } else {
                // If using the pencil tool, draw with the current stroke color
                ctx.strokeStyle = this.strokeColor;
                ctx.lineWidth = this.lineWidth;
                ctx.lineCap = "round";
                ctx.stroke();
            }
            [this.lastX, this.lastY] = [x, y];

        },

        stopDrawing() {
            this.isDrawing = false;
        },
        getMousePos(e) {
            let rect = document.getElementById("canvas").getBoundingClientRect();
            let touch = e.touches ? e.touches[0] : e;
            return [touch.clientX - rect.left, touch.clientY - rect.top];
        },
        increaseLineWidth() {
            this.lineWidth += 1; // Menambah ketebalan garis
        },
        decreaseLineWidth() {
            if (this.lineWidth > 1) {
                this.lineWidth -= 1; // Mengurangi ketebalan garis (minimal 1)
            }
        },
        toggleTool() {
            this.isEraser = !this.isEraser; // Mengubah status antara pensil dan penghapus
            this.updateCursor();
        },
        updateCursor() {
            const canvas = document.getElementById("canvas");
            if (this.isEraser) {
                canvas.classList.add("hapus");
                canvas.classList.remove("pensil");
            } else {
                canvas.classList.add("pensil");
                canvas.classList.remove("hapus");
            }
        },
        clearCanvas() {
            let canvas = document.getElementById("canvas");
            let ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        },
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway+Dots&display=swap');

.raleway-dots-regular {
    font-family: "Raleway Dots", sans-serif;
    font-weight: 400;
    font-style: normal;
}

canvas {
    border: 1px solid black;
    margin-bottom: 10px;
    cursor: url('../assets/img/cursor.png'), auto;
}

.pensil {
    cursor: url('../assets/img/cursor.png'), auto;
}

.hapus {
    cursor: url('../assets/img/hapus.png'), auto;
}
</style>