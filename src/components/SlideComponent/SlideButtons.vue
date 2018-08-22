<template>
    <div class="absolute flex bottom-0 justify-center w-100 w3-ns h-100-ns flex-column-ns">
        <div class="b--dotted w3 pa2 f2 tc previous cardboard-button-background"></div>
        <div class="b--dotted bt-0-ns _bl-0-s w3 pa2 f2 tc menu cardboard-button-background"></div>
        <div class="b--dotted bt-0-ns _bl-0-s w3 pa2 f2 tc next cardboard-button-background"></div>
    </div>
</template>

<script>
    export default {
        name: "SlideButtons"
    }
</script>

<style scoped>

    .cardboard-button-background {
        background-image: url(../../assets/imgs/slide-component/cardboard-buttons-background.jpg);
    }

    .previous {
        font-family: 'PWSmallIcons';
    }

    .previous:before {
        content: 's';
    }

    .next {
        font-family: 'PWSmallIcons';
    }

    .next:before {
        content: 'r';
    }

    .menu {
        font-family: 'PWSmallIcons';
    }

    .menu:before {
        content: '2';
    }

    @media (max-width: 480px) {
        ._bl-0-s {
            border-left: 0;
        }
    }

</style>