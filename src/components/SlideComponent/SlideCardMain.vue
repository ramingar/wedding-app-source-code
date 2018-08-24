<template>
    <div class="h-100 w-100">
        <!--<div class="center background-image h-100 w-100 bg-center cover br--top br4"></div>-->
        <div class="background-image bg-center contain _rotate-355 h-100 w-100"></div>
        <div class="f7"></div>
    </div>
</template>

<script>
    export default {
        name: "SlideCardMain"
    }
</script>

<style scoped>

    .background-image {
        background-image: url('../../assets/imgs/slide-component/cards/01.jpg')
    }

    ._rotate-355 {
        -webkit-transform: rotate(355deg);
        -moz-transform: rotate(355deg);
        transform: rotate(355deg);
    }

</style>