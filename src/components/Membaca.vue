<template>
    <RouterLink to="/belajar/membaca"></RouterLink>
    <div class="flex items-center justify-center w-screen h-screen">
        <div class="bg-white rounded-xl md:w-[800px] md:h-[350px] w-[300px] h-[340px] px-5 py-5 md:py-10 md:px-10 ">
            <div v-if="showdata">
                <button @click="goHome"
                    class="flex gap-x-2 items-center justify-center text-base text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-house-door-fill" viewBox="0 0 16 16">
                        <path
                            d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
                    </svg>Beranda
                </button>
                <div class="flex flex-wrap items-center justify-center gap-3.5 md:gap-10 md:mt-10 mt-16">
                    <button @click="buttonangka"
                        class="px-8 py-3 mb-2 text-sm text-xl font-medium font-bold text-center text-white rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 me-2">Angka</button>
                    <button @click="buttonhuruf"
                        class="px-8 py-3 mb-2 text-sm text-xl font-medium font-bold text-center text-white rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 me-2">Huruf</button>
                    <button @click="buttonkata"
                        class="px-8 py-3 mb-2 text-sm text-xl font-medium font-bold text-center text-white rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 me-2">Kata</button>
                </div>
            </div>
            <div v-else>
                <button @click="goBack"
                    class="flex gap-x-2 items-center justify-center text-base text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor"
                        class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                        <path
                            d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                    </svg>Kembali
                </button>
                <div class="flex flex-col items-center justify-center">
                    <div class="m-6">
                        <ul id="caption" class="flex text-4xl font-bold gap-x-2">
                            <li v-for="(part, index) in caption" :key="index"
                                :class="{ active: index === activeIndex }">{{ part.text }}
                            </li>
                            <div class="flex gap-x-1" v-if="check">
                                <li class="lowercase" v-for="(item, index) in caption" :key="index"> {{ item.text }}
                                </li>
                            </div>
                        </ul>
                    </div>
                    <div>
                        <h3 v-if="checkHasil" class="text-center mb-2 text-white bg-blue-500 p-1 rounded-lg">Jawaban
                            Kamu: {{
                TextHasil }}</h3>
                        <div id="btnGroup" class="flex gap-x-5">
                            <button id="btnReadCaption"
                                class="flex gap-x-2 items-center justify-center text-xl text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                @click="readCaption" :disabled="!buttonEnabled"><svg xmlns="http://www.w3.org/2000/svg"
                                    width="20" height="20" fill="currentColor" class="bi bi-volume-up-fill"
                                    viewBox="0 0 16 16">
                                    <path
                                        d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z" />
                                    <path
                                        d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z" />
                                    <path
                                        d="M8.707 11.182A4.5 4.5 0 0 0 10.025 8a4.5 4.5 0 0 0-1.318-3.182L8 5.525A3.5 3.5 0 0 1 9.025 8 3.5 3.5 0 0 1 8 10.475zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06" />
                                </svg> Baca</button>
                            <button id="btnChangeImage"
                                class=" flex gap-x-2 items-center justify-center text-white bg-gradient-to-r text-xl from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                @click="changeImage" :disabled="!buttonEnabled"><svg xmlns="http://www.w3.org/2000/svg"
                                    width="20" height="20" fill="currentColor" class="bi bi-repeat" viewBox="0 0 16 16">
                                    <path
                                        d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z" />
                                </svg> Ganti</button>
                        </div>
                    </div>
                    <div class="mt-2">
                        <!-- Tambahkan tombol untuk merekam suara -->
                        <button id="btnRecordVoice"
                            class="flex gap-x-2 items-center justify-center text-white bg-gradient-to-r text-xl from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            @click="startRecording">
                            <svg v-if="micIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="currentColor" class="bi bi-mic" viewBox="0 0 16 16">
                                <path
                                    d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" />
                                <path
                                    d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-mic-fill" viewBox="0 0 16 16">
                                <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0z" />
                                <path
                                    d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" />
                            </svg>
                            Rekam Suara</button>

                    </div>
                </div>
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
            currentImage: "",
            caption: [],
            imageShown: false,
            buttonEnabled: true,
            currentIndex: 0, // Variable untuk melacak indeks gambar saat ini
            activeIndex: -1,
            showdata: true,
            DataText: [],
            lastClickedData: null,
            micIcon: true,
            TextHasil: '',
            checkHasil: true,
            check: true // Menambahkan properti untuk menyimpan data yang terakhir kali diklik
        };
    },
    mounted() {
        this.voice();
    },
    methods: {
        buttonhuruf() {
            const Data = DataMembaca.datahuruf;
            this.lastClickedData = Data; // Menyimpan data yang diklik terakhir kali
            this.loadData(Data);
            this.changeImage(); // Mengubah metode ini tanpa argumen karena menggunakan lastClickedData
            this.showdata = false;
            this.check = true
        },
        buttonkata() {
            const Data = DataMembaca.datakata;
            this.lastClickedData = Data; // Menyimpan data yang diklik terakhir kali
            this.loadData(Data);
            this.changeImage(); // Mengubah metode ini tanpa argumen karena menggunakan lastClickedData
            this.showdata = false;
            this.check = false
        },
        buttonangka() {
            const Data = DataMembaca.dataangka;
            this.lastClickedData = Data; // Menyimpan data yang diklik terakhir kali
            this.loadData(Data);
            this.changeImage(); // Mengubah metode ini tanpa argumen karena menggunakan lastClickedData
            this.showdata = false;
            this.check = false
        },
        // Metode untuk memuat data
        async loadData(data) {
            try {
                this.currentImage = data.image;
                this.caption = data.caption;
            } catch (error) {
                console.error("Gagal memuat data: ", error);
            }
        },
        // Metode untuk membaca keterangan
        async readCaption() {
            try {
                this.buttonEnabled = false; // Menonaktifkan tombol
                this.checkHasil = false;
                const n = this.caption.length;
                for (let i = 0; i < n; i++) {
                    const part = this.caption[i];
                    this.activeIndex = i; // Menetapkan activeIndex sesuai dengan indeks teks yang sedang dibaca
                    part.active = true; // Mengatur bagian saat ini sebagai aktif
                    await this.speakString(part.text);
                    // Tambahkan logika untuk mengubah ukuran teks dan warna di sini
                    part.active = false; // Mengatur bagian saat ini sebagai tidak aktif
                    await this.delay(700); // Jeda selama 0.5 detik antara keterangan
                }
                this.activeIndex = -1; // Mengatur ulang activeIndex ke nilai awal setelah selesai membaca
                this.buttonEnabled = true; // Mengaktifkan tombol setelah membaca semua keterangan
            } catch (error) {
                console.error("Gagal membaca keterangan: ", error);
            }
        },
        // Metode untuk mengubah gambar
        async changeImage() {
            try {
                let Data = this.lastClickedData; // Menggunakan data terakhir yang diklik
                this.checkHasil = false;
                if (!Data) {
                    console.error("Tidak ada data yang tersedia!");
                    return;
                }
                this.buttonEnabled = false; // Menonaktifkan tombol
                const dataLength = Data.length;
                const imageData = Data[this.currentIndex]; // Dapatkan data gambar berdasarkan currentIndex
                console.log(imageData);
                this.caption = imageData.caption.map(text => ({ text, active: false }));
                this.imageShown = false;
                await this.delay(500); // Jeda selama 1 detik sebelum menampilkan gambar baru
                this.imageShown = true;
                this.currentIndex = (this.currentIndex + 1) % dataLength; // Pindah ke indeks gambar berikutnya
                this.buttonEnabled = true; // Mengaktifkan tombol setelah mengubah gambar
            } catch (error) {
                console.error("Gagal mengubah gambar: ", error);
            }
        },

        // Metode untuk membaca string
        speakString(str) {
            return new Promise((resolve, reject) => {
                if (!str) {
                    reject(new Error("Pesan tidak boleh kosong!"));
                }
                const utterThis = new SpeechSynthesisUtterance(str);
                utterThis.onstart = () => resolve();
                utterThis.onend = () => resolve();
                utterThis.onerror = (e) => reject(new Error(`Tidak dapat mengucapkan kata-kata karena: ${e.error}`));
                utterThis.voice = window.speechSynthesis.getVoices().find(voice => voice.name === "Google Bahasa Indonesia");
                window.speechSynthesis.speak(utterThis);
            });
        },
        // Metode untuk menunda
        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },

        // Metode untuk menangani sintesis suara
        voice() {
            const synth = window.speechSynthesis;
            const voiceName = "Google Bahasa Indonesia";
            let voice;

            function setButtonDisabled(disabled) {
                document.getElementById("btnChangeImage").disabled = disabled;
                document.getElementById("btnReadCaption").disabled = disabled;
                document.getElementById("btnRecordVoice").disabled = disabled; // Menonaktifkan tombol rekam suara
            }

            synth.onvoiceschanged = () => {
                // Dapatkan suara
                const voices = synth.getVoices();
                let found = false;
                // Temukan suara yang ditargetkan
                for (let i = 0; i < voices.length; i++) {
                    if (voices[i].name === voiceName) {
                        voice = voices[i];
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    alert(`Suara ${voiceName} tidak ditemukan dalam sistem`);
                    return;
                }
                // Aktifkan tombol
                setButtonDisabled(false);
            }
        },
        goBack() {
            this.showdata = true;
        },
        goHome() {
            this.$router.go(-1);
        },

        // Metode untuk memulai merekam suara
        startRecording() {
            this.micIcon = false;
            if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                const recognition = new SpeechRecognition();
                recognition.lang = 'id-ID';
                recognition.start();
                recognition.onresult = (event) => {
                    const color = event.results[0][0].transcript;
                    this.checkHasil = true;
                    this.micIcon = true
                    this.TextHasil = color;
                    // Lakukan tindakan yang diperlukan dengan hasil suara
                };

                recognition.onnomatch = (event) => {
                    console.log("Saya tidak mengenali kata tersebut.");
                    this.micIcon = true
                };

                recognition.onerror = (event) => {
                    console.error('Terjadi kesalahan dalam pengenalan: ' + event.error);
                    this.micIcon = true
                };
            } else {
                console.error('SpeechRecognition tidak didukung oleh browser ini.');
                this.micIcon = true
            }
        }
    }
}
</script>

<style>
#caption .active {
    font-size: 2em;
    color: red;
}
</style>
