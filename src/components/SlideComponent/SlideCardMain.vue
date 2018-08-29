<template>
    <div class="flex flex-column justify-center items-center h-100 w-100">
        <div :style="image"
             v-if="!question"
             class="bg-center contain _rotate-355 h-100 w-100 mw4 _mw5-hd _mw5-full-hd"></div>
        <div v-if="question" class="flex items-center justify-center h-100 w-100 pr2">
            <div v-html="question"></div>
        </div>
        <div class="dn">{{computedSection}}</div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "SlideCardMain",

        methods: {
            ...mapGetters(['cardImage', 'cardQuestion', 'currentSection', 'contentDelay']),
        },

        data() {
            return {
                section : '',
                image   : '',
                question: '',
                baseUrl : '/img/cards'
            }
        },

        computed: {
            ...mapGetters({computedSection: 'currentSection'})
        },

        created: function () {
            this.image = {'background-image': `url(${this.baseUrl}/${this.cardImage()})`}
        },

        watch: {
            computedSection: function () {
                setTimeout(() => {
                    this.image    = {'background-image': `url(${this.baseUrl}/${this.cardImage()})`};
                    this.question = this.cardQuestion();
                }, this.contentDelay());
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