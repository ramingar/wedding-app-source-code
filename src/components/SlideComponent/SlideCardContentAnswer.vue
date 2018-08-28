<template>
    <div>
        <template v-if="areChoicesRadio" v-for="choice in choices">
            <label class="flex flex-wrap w-100 pa2 pv3-ns">
                <input type="radio"
                       :value="choice.id + '||' + choice.choice"
                       v-model="answerRadio">
                <span class="ml2">{{choice.choice}}</span>
            </label>
        </template>

        <template v-if="areChoicesCheckbox" v-for="choice in choices">
            <label class="flex flex-wrap w-100 pa2 pv3-ns">
                <input type="checkbox"
                       :value="choice.id + '||' + choice.choice"
                       v-model="answerCheckbox">
                <span class="ml2">{{choice.choice}}</span>
            </label>
        </template>
        <div class="dn">{{computedSection}}</div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "slide-card-content-answer",

        methods: {
            ...mapGetters(['cardAnswerType', 'cardChoices', 'cardQuestion', 'userData', 'currentSection', 'contentDelay'])
        },

        data() {
            return {
                answerRadio   : '',
                answerCheckbox: [],
                choices       : [],
                section       : ''
            }
        },

        computed: {
            computedSection() {
                this.section = this.currentSection();
            },
            areChoicesRadio() {
                return 'radio' === this.cardAnswerType()
            },
            areChoicesCheckbox() {
                return 'checkbox' === this.cardAnswerType()
            }
        },

        watch: {
            answerRadio(newValue, oldValue) {
                console.log(newValue);
            },
            answerCheckbox(newValue, oldValue) {
                console.log(newValue);
            },
            section(newValue) {
                setTimeout(() => {
                    this.choices     = this.cardChoices();
                    const answerType = this.cardAnswerType();

                    const ucFirst = text =>
                        text.split('')
                            .map((val, idx) => idx > 0 ? val.toLowerCase() : val.toUpperCase())
                            .join('');

                    const NOTHING_ANSWERS = {
                        'radio'   : '',
                        'checkbox': []
                    };

                    const NOTHING       = NOTHING_ANSWERS[answerType];
                    const questionIndex = this.currentSection().split('-')[1];

                    this['answer' + ucFirst(answerType)] = this.userData().answers[questionIndex] || NOTHING;

                }, this.contentDelay());
            }
        }
    }
</script>

<style scoped>

</style>