<template>
    <div>
        <slides-card/>
        <slides-buttons/>
    </div>
</template>

<script>
    import SlidesButtons from './SlidesComponent/SlidesButtons.vue'
    import SlidesCard from './SlidesComponent/SlidesCard.vue'

    export default {
        name      : 'Slides',
        components: {
            SlidesButtons,
            SlidesCard
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
