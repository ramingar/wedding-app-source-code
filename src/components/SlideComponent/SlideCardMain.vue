<template>
    <div class="h-100 w-100">
        <!--<div class="center background-image h-100 w-100 bg-center cover br--top br4"></div>-->
        <div :style="image"
             class="bg-center contain _rotate-355 h-100 w-100"></div>
        <div class="f7"></div>
        <div class="dn">{{computedSection}}</div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "SlideCardMain",

        methods: {
            ...mapGetters(['cardImage', 'currentSection']),
        },

        data() {
            return {
                section: '',
                image  : '',
                baseUrl: '/img/cards'
            }
        },

        computed: {
            computedSection() {
                this.section = this.currentSection()
            }
        },

        created: function () {
            this.image = {'background-image': `url(${this.baseUrl}/${this.cardImage()})`}
        },

        watch: {
            section: function () {
                setTimeout(() => {
                    this.image = {'background-image': `url(${this.baseUrl}/${this.cardImage()})`}
                }, 400);
            }
        }
    }
</script>

<style scoped>

    ._rotate-355 {
        -webkit-transform: rotate(355deg);
        -moz-transform: rotate(355deg);
        transform: rotate(355deg);
    }

</style>