<template>
    <div class="BG-cover">
        <LandingPage />
        <audio id="audio" loop autoplay>
            <source src="@/assets/sound/play.mp3" type="audio/mp3">
        </audio>
    </div>
</template>
<script>
import LandingPage from '@/components/LandingPage.vue';
export default {
    components: {
        LandingPage,
    }
}
</script>
