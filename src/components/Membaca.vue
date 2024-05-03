<template>
    <div class="flex items-center justify-center w-screen h-screen">
        <div class="bg-white rounded-xl w-[800px] h-[550px] p-10 ">
            <button @click="goBack"
                class="flex gap-x-2 items-center justify-center text-base text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor"
                    class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                    <path
                        d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                </svg>Back
            </button>
            <div class="flex flex-col items-center justify-center">
                <transition name="fade">
                    <img class="w-64 rounded-xl" id="mainImg" v-bind:src="currentImage" v-if="imageShown" />
                </transition>
                <div class="m-10">
                    <ul id="caption" class="flex text-4xl font-bold uppercase gap-x-5">
                        <li v-for="(part, index) in caption" :key="index" :class="{ active: index === activeIndex }">{{
                part.text }}</li>
                    </ul>
                </div>
                <div>
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
            </div>
        </div>
    </div>
</template>

<script>
import DataMembaca from '@/stores/DataMembaca';

export default {
    data() {
        return {
            currentImage: "",
            caption: [],
            imageShown: false,
            buttonEnabled: true,
            currentIndex: 0, // Variable to track the index of the current image
            activeIndex: -1
        };
    },
    mounted() {
        this.loadData();
        this.voice();
        this.changeImage();
    },
    methods: {
        // Method to load data
        async loadData() {
            try {
                const data = DataMembaca;
                this.currentImage = data.image;
                this.caption = data.caption;
            } catch (error) {
                console.error("Failed to load data: ", error);
            }
        },
        // Method to read caption
        async readCaption() {
            try {
                this.buttonEnabled = false; // Disable button
                const n = this.caption.length;
                for (let i = 0; i < n; i++) {
                    const part = this.caption[i];
                    this.activeIndex = i; // Set activeIndex according to the index of the text being read
                    part.active = true; // Set the current part as active
                    await this.speakString(part.text);
                    // Add logic to change text size and color here
                    part.active = false; // Set the current part as inactive
                    await this.delay(700); // Delay for 0.5 second between captions
                }
                this.activeIndex = -1; // Reset activeIndex to its initial value after finishing reading
                this.buttonEnabled = true; // Enable button after reading all captions
            } catch (error) {
                console.error("Failed to read captions: ", error);
            }
        },
        // Method to change image
        async changeImage() {
            try {
                this.buttonEnabled = false; // Disable button
                const dataLength = DataMembaca.data.length;
                const imageData = DataMembaca.data[this.currentIndex]; // Get image data based on currentIndex
                this.currentImage = imageData.image;
                this.caption = imageData.caption.map(text => ({ text, active: false }));
                this.imageShown = false;
                await this.delay(500); // Delay for 1 second before showing new image
                this.imageShown = true;
                this.currentIndex = (this.currentIndex + 1) % dataLength; // Move to the next image index
                this.buttonEnabled = true; // Enable button after changing image
            } catch (error) {
                console.error("Failed to change image: ", error);
            }
        },

        // Method to speak string
        speakString(str) {
            return new Promise((resolve, reject) => {
                if (!str) {
                    reject(new Error("Message must not be empty!"));
                }
                const utterThis = new SpeechSynthesisUtterance(str);
                utterThis.onstart = () => resolve();
                utterThis.onend = () => resolve();
                utterThis.onerror = (e) => reject(new Error(`Unable to utter speech due to: ${e.error}`));
                utterThis.voice = window.speechSynthesis.getVoices().find(voice => voice.name === "Google Bahasa Indonesia");
                window.speechSynthesis.speak(utterThis);
            });
        },
        // Method to introduce delay
        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },

        // Method to handle voice synthesis
        voice() {
            const synth = window.speechSynthesis;
            const voiceName = "Google Bahasa Indonesia";
            let voice;

            function setButtonDisabled(disabled) {
                document.getElementById("btnChangeImage").disabled = disabled;
                document.getElementById("btnReadCaption").disabled = disabled;
            }

            synth.onvoiceschanged = () => {
                // get voices
                const voices = synth.getVoices();
                let found = false;
                // find targetted voice
                for (let i = 0; i < voices.length; i++) {
                    if (voices[i].name === voiceName) {
                        voice = voices[i];
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    alert(`Voice ${voiceName} is not found on the system`);
                    return;
                }
                // enable buttons
                setButtonDisabled(false);
            }
        },
        goBack() {
            this.$router.go(-1);
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