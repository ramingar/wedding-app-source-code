<template>
    <div class="absolute flex justify-center items-center h-100 w-100">
        <div class="br4 bg-white v-mid mb5 mb0-ns ml5-ns w-80 _h-70 _mw-70-xl _mh-65-special-1024-768 _mh-80-special-768-1024">

        </div>
    </div>
</template>

<script>
    export default {
        name: "SlideCard"
    }
</script>

<style scoped>
    ._h-70 {
        height: 70%;
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