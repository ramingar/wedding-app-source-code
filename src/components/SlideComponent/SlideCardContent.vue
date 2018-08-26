<template>
    <div>
        <p class="kbreindeergames f4 _f2-hd _f2-fullhd tc">{{ title }}</p>
        <span v-html="text"></span>
        <div class="dn">{{computedSection}}</div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "SlideCardContent",

        methods: {
            ...mapGetters(['cardText', 'cardTitle', 'currentSection'])
        },

        data() {
            return {
                title  : '',
                text   : '',
                section: ''
            }
        },

        computed: {
            computedSection() {
                this.section = this.currentSection()
            }
        },

        created: function () {
            this.title   = this.cardTitle();
            this.text    = this.cardText();
            this.section = this.currentSection();
        },

        watch: {
            section: function () {
                setTimeout(() => {
                    this.title = this.cardTitle();
                    this.text  = this.cardText();
                }, 400);
            }
        }
    }
</script>
