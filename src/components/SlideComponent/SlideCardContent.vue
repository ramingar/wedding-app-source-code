<template>
    <div>
        <p class="kbreindeergames f4 _f2-hd _f2-fullhd tc">{{ title }}</p>
        <span v-html="text"></span>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name    : "SlideCardContent",
        methods : {
            ...mapGetters(['cardText', 'cardTitle'])
        },
        computed: {
            title() {
                return this.cardTitle()
            },
            text() {
                return this.cardText()
            }
        }
    }
</script>
