<template>
    <div class="absolute flex justify-center items-center h-100 w-100">
        <div class="flex flex-wrap justify-center items-center br4 bg-white v-mid mb5 mb0-ns ml5-ns w-80 _h-70 _mw-70-xl _mh-65-special-1024-768 _mh-80-special-768-1024">
            <div class="br4 _h-35 _h50-landscape w-100 w-40-ns">
                <slide-card-main/>
            </div>
            <div class="br4 ph3 pb3 f7 tc w-100 w-60-ns">
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

    ._h-35 {
        height: 35%;
    }

    ._h-70 {
        height: 70%;
    }

    @media (orientation: landscape) {
        ._h50-landscape {
            height: 50%;
            max-height: 50%;
        }
    }

    @media (min-width: 1025px) {
        ._mw-70-xl {
            max-width: 70%;
        }
    }

    @media (width: 1024px) and (height: 768px) {
        ._mh-65-special-1024-768 {
            height: 65%;
            max-height: 65%;
        }
    }

    @media (width: 768px) and (height: 1024px) {
        ._mh-80-special-768-1024 {
            height: 80%;
            max-height: 80%;
        }
    }

</style>