<template>
    <div class="BG-cover">
        <BelajarVue />
        <audio id="audio" loop autoplay>
            <source src="@/assets/sound/play.mp3" type="audio/mp3">
        </audio>
    </div>
</template>
<script>
import BelajarVue from '@/components/Belajar.vue'
export default {
    components: {
        BelajarVue
    }
}
</script>