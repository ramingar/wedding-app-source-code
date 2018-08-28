<template>
    <div :class="{'h-100': 'textarea' === choiceType}" class="w-100">
        <!-- STATIC PAGES ------------------------------------------------------ -->
        <template v-if="!loadAnswersComponent">
            <span class="kbreindeergames db mb3 f4 _f2-hd _f2-fullhd tc">{{ title }}</span>
            <span v-html="text"></span>
            <button @click="changeSectionTo('question-0')"
                    :class="startButtonClasses">Empezar con las preguntas
            </button>
        </template>

        <!-- QUESTION CARDS ---------------------------------------------------- -->
        <component :class="{'h-100': 'textarea' === choiceType}" v-if="loadAnswersComponent"
                   v-bind:is="loadAnswersComponent"/>

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import SlideCardContentAnswer from './SlideCardContentAnswer'

    const updateCard = (self) => {
        self.loaded = false;
        setTimeout(() => {
            self.title      = self.cardTitle();
            self.text       = self.cardText();
            self.choiceType = self.cardAnswerType();
            self.loaded     = true;
        }, self.contentDelay());
    };

    export default {
        name: "SlideCardContent",

        methods: {
            ...mapGetters(['cardText', 'cardTitle', 'cardAnswerType', 'currentSection', 'userData', 'contentDelay']),
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
                title     : '',
                text      : '',
                choiceType: '',
                loaded    : false,
            }
        },

        computed: {
            ...mapGetters({computedSection: 'currentSection'}),
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
            this.title = this.cardTitle();
            this.text  = this.cardText();

            updateCard(this);
        },

        watch: {
            computedSection() {
                updateCard(this)
            }
        }
    }
</script>
