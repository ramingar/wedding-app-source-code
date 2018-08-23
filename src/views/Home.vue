<template>
    <div class="home">
        <slides/>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Slides from '@/components/Slides.vue'

    export default {
        name      : 'home',
        components: {
            Slides
        }
    }
</script>
