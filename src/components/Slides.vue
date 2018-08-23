<template>
    <div>
        <slide-card/>
        <slide-buttons/>
    </div>
</template>

<script>
    import SlideButtons from './SlideComponent/SlideButtons.vue'
    import SlideCard from './SlideComponent/SlideCard.vue'

    export default {
        name      : 'Slides',
        components: {
            SlideButtons,
            SlideCard
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
