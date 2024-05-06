<template>
    <div class="flex items-center justify-center w-screen h-screen">
        <div class="bg-white rounded-xl w-[800px] h-[550px] p-10 relative">
            <button @click="goBack"
                class="flex gap-x-2 items-center justify-center text-base text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor"
                    class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                    <path
                        d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                </svg>Back
            </button>
            <!-- Teks yang akan ditampilkan di belakang canvas -->
            <div class="absolute w-[400] h-[400] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <img src="../assets/img/test.png" alt="">
            </div>
            <!-- Canvas untuk menggambar -->
            <canvas id="canvas" width="400" height="400"
                class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"></canvas>
            <!-- Tombol dan hasil -->
            <button id="clearButton" @click="clearCanvas">Hapus</button>
            <div class="mt-2">
                <button @click="increaseLineWidth">Tambah Ketebalan</button>
                <button @click="decreaseLineWidth">Kurangi Ketebalan</button>
                <span>Ketebalan Garis: {{ lineWidth }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import DataMenulis from '@/stores/DataMenulis';
import { createWorker } from 'tesseract.js';

export default {
    data() {
        return {
            Menulis: [],
            isDrawing: false,
            lastX: 0,
            lastY: 0,
            examplePath: [], // Jalur gambar referensi
            exampleDrawn: false,
            lineWidth: 5, // Ketebalan garis awal
            isEraser: false // Apakah sedang menggunakan penghapus atau tidak
        }
    },
    async mounted() {
        this.canvas();
        const worker = await createWorker('eng');
        const ret = await worker.recognize(this.Menulis);
        console.log(ret.data.text);
        console.log(ret.data.symbols)
        const data = ret.data.symbols
        data.forEach(data => {
            console.log(data.text)

        });
        await worker.terminate();
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        canvas() {
            this.Menulis = DataMenulis;
            let canvas = document.getElementById("canvas");
            let ctx = canvas.getContext("2d");
            canvas.width = 400;
            canvas.height = 400;

            canvas.addEventListener("mousedown", this.startDrawing);
            canvas.addEventListener("touchstart", this.startDrawing);
            canvas.addEventListener("mousemove", this.draw);
            canvas.addEventListener("touchmove", this.draw);
            canvas.addEventListener("mouseup", this.stopDrawing);
            canvas.addEventListener("touchend", this.stopDrawing);

            // Mendapatkan jalur gambar referensi saat gambar telah dimuat
            let img = new Image();
            img.onload = () => {
                let tempCanvas = document.createElement("canvas");
                tempCanvas.width = img.width;
                tempCanvas.height = img.height;
                let tempCtx = tempCanvas.getContext("2d");
                tempCtx.drawImage(img, 0, 0);
                let tempData = tempCtx.getImageData(0, 0, img.width, img.height).data;
                for (let i = 0; i < tempData.length; i += 4) {
                    let brightness = (tempData[i] + tempData[i + 1] + tempData[i + 2]) / 3;
                    if (brightness < 128) {
                        let pixelX = (i / 4) % img.width;
                        let pixelY = Math.floor(i / 4 / img.width);
                        let key = `${pixelX},${pixelY}`;
                        this.examplePath.push(key);
                    }
                }
                this.exampleDrawn = true;
            };
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
                // If using the eraser tool, clear the content instead of drawing with black stroke
                ctx.strokeStyle = "white"; // Set the stroke color to white
                ctx.lineWidth = this.lineWidth + 2; // Increase line width to ensure content is erased
            } else {
                // If using the pencil tool, draw with black stroke
                ctx.strokeStyle = "black";
                ctx.lineWidth = this.lineWidth;
            }
            ctx.lineCap = "round";
            ctx.stroke();
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
        }
    }
}
</script>

<style>
canvas {
    border: 1px solid black;
    margin-bottom: 10px;
    cursor: url('../assets/img/cursor.png'), auto;
}
</style>