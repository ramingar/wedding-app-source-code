<template>
    <div>
        <template v-if="'radio' === choiceType" v-for="choice in choices">
            <label class="flex flex-wrap w-100 pa2 pv3-ns">
                <input type="radio"
                       :value="choice.id + '||' + choice.choice"
                       v-model="answerRadio">
                <span class="ml2">{{choice.choice}}</span>
            </label>
        </template>

        <template v-if="'checkbox' === choiceType" v-for="choice in choices">
            <label class="flex flex-wrap w-100 pa2 pv3-ns">
                <input type="checkbox"
                       :value="choice.id + '||' + choice.choice"
                       v-model="answerCheckbox">
                <span class="ml2">{{choice.choice}}</span>
            </label>
        </template>

        <template v-if="'textarea' === choiceType">
            <label class="flex flex-wrap w-100 pa2 pv3-ns">
                <textarea v-model="answerTextarea" placeholder="Escribe aquí..."></textarea>
            </label>
        </template>

        <div class="dn">{{computedSection}}</div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import axios from 'axios'

    const getQuestionIndex = (question) => {
        return question.split('-')[1];
    };

    export default {
        name: "slide-card-content-answer",

        methods: {
            ...mapGetters([
                'cardAnswerType', 'cardChoices', 'cardQuestion', 'userData', 'currentSection', 'contentDelay', 'userId'
            ]),
            ...mapActions(['setUserData']),
            debouncedSave: _.debounce((self, newValue) => {
                self.saveUserData(newValue)
            }, 1000)
        },

        data() {
            return {
                answerRadio   : '',
                answerCheckbox: [],
                answerTextarea: [],
                choices       : [],
                section       : '',
                choiceType    : '',
                saveUserData  : (newValue) => {
                    const userId        = this.userId();
                    const userData      = this.userData();
                    const questionIndex = getQuestionIndex(this.currentSection());

                    userData.answers[questionIndex] = newValue;

                    axios
                        .put(`/users/${userId}.json`, userData)
                        .then((res) => {
                            if (200 === res.status) this.setUserData({userData});
                        })
                        .catch(err => console.log(err))
                    ;
                }
            }
        },

        computed: {
            computedSection() {
                this.section = this.currentSection();
            }
        },

        watch: {
            answerRadio(newValue, oldValue) {
                this.saveUserData(newValue)
            },
            answerCheckbox(newValue, oldValue) {
                this.saveUserData(newValue)
            },
            answerTextarea(newValue, oldValue) {
                this.debouncedSave(this, newValue)
            },
            section(newValue) {
                setTimeout(() => {
                    this.choices     = this.cardChoices();
                    this.choiceType  = this.cardAnswerType();
                    const answerType = this.cardAnswerType();

                    const ucFirst = text =>
                        text.split('')
                            .map((val, idx) => idx > 0 ? val.toLowerCase() : val.toUpperCase())
                            .join('');

                    const NOTHING_ANSWERS = {
                        'radio'   : '',
                        'checkbox': [],
                        'textarea': ''
                    };

                    const NOTHING       = NOTHING_ANSWERS[answerType];
                    const questionIndex = getQuestionIndex(this.currentSection());

                    this['answer' + ucFirst(answerType)] = this.userData().answers[questionIndex] || NOTHING;

                }, this.contentDelay());
            }
        }
    }
</script>

<style scoped>

</style>