<template>
    <div>
        <!-- STATIC PAGES ------------------------------------------------------ -->
        <p class="kbreindeergames f4 _f2-hd _f2-fullhd tc">{{ title }}</p>
        <span v-html="text"></span>
        <button @click="changeSectionTo('question-0')"
                :class="startButtonClasses">Empezar con las preguntas
        </button>

        <!-- QUESTION CARDS ---------------------------------------------------- -->
        <component v-bind:is="loadAnswersComponent"/>

        <div class="dn">{{computedSection}}</div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    import SlideCardContentAnswer from './SlideCardContentAnswer'

    export default {
        name: "SlideCardContent",

        methods: {
            ...mapGetters(['cardText', 'cardTitle', 'currentSection', 'userData', 'contentDelay']),
            ...mapActions(['setCurrentSection']),
            changeSectionTo: function (section) {
                this.setCurrentSection({section});
            },
        },

        components: {
            SlideCardContentAnswer
        },

        data() {
            return {
                title  : '',
                text   : '',
                loaded : false,
                section: ''
            }
        },

        computed: {
            computedSection() {
                this.section = this.currentSection()
            },
            startButtonClasses() {
                return {
                    dn: !(this.loaded && 'default' === this.currentSection() && this.userData().user)
                }
            },
            loadAnswersComponent() {
                if (this.currentSection().indexOf('question') > -1) {
                    return 'SlideCardContentAnswer'
                }
            }
        },

        created() {
            this.title   = this.cardTitle();
            this.text    = this.cardText();
            this.section = this.currentSection();
        },

        watch: {
            section() {
                this.loaded = false;
                setTimeout(() => {
                    this.title  = this.cardTitle();
                    this.text   = this.cardText();
                    this.loaded = true;
                }, this.contentDelay());
            }
        }
    }
</script>
