<template>
    <div class="absolute flex items-center justify-center h-100 w-100">
        <div class="bg-white overflow-hidden br4 mh3 mb5 mb0-ns ml5-ns _w5_50 _w6_50-l h-75">
            <div class="pa3 _h-40">
                <slide-card-main/>
            </div>
            <div class="pa3 f7">
                <slide-card-content/>
            </div>
        </div>
    </div>
</template>

<script>
    import SlideCardMain from './SlideCardMain.vue'
    import SlideCardContent from './SlideCardContent.vue'

    export default {
        name      : "SlideCard",
        components: {
            SlideCardMain,
            SlideCardContent
        }
    }
</script>

<style scoped>
    ._w5_50 {
        width: 24rem;
    }

    ._h-40 {
        height: 40%;
    }


</style>