<template>
    <div>
        <div v-if="'radio' === choiceType" v-for="choice in choices" :key="choice.id">
            <label class="flex flex-wrap w-100 pa2 pv3-ns">
                <input type="radio"
                       :value="choice.id + '||' + choice.choice"
                       v-model="answerRadio">
                <span class="ml2">{{choice.choice}}</span>
            </label>
        </div>

        <div v-if="'checkbox' === choiceType" v-for="choice in choices" :key="choice.id">
            <label class="flex flex-wrap w-100 pa2 pv3-ns">
                <input type="checkbox"
                       :value="choice.id + '||' + choice.choice"
                       v-model="answerCheckbox">
                <span class="ml2">{{choice.choice}}</span>
            </label>
        </div>

        <div v-if="'textarea' === choiceType">
            <label class="flex flex-wrap w-100 pa2 pv3-ns">
                <textarea v-model="answerTextarea" placeholder="Escribe aquí..."></textarea>
            </label>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import axios from 'axios'
    import _ from 'lodash'

    const getQuestionIndex = (question) => {
        return question.split('-')[1];
    };

    const updateAnswers = (self) => {
        setTimeout(() => {
            self.choices     = self.cardChoices();
            self.choiceType  = self.cardAnswerType();
            const answerType = self.cardAnswerType();

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
            const questionIndex = getQuestionIndex(self.currentSection());

            self['answer' + ucFirst(answerType)] = self.userData().answers[questionIndex] || NOTHING;

        }, self.contentDelay());
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
                        .catch()
                    ;
                }
            }
        },

        computed: {
            ...mapGetters({computedSection: 'currentSection'})
        },

        created() {
            updateAnswers(this)
        },

        watch: {
            answerRadio(newValue) {
                this.saveUserData(newValue)
            },
            answerCheckbox(newValue) {
                this.saveUserData(newValue)
            },
            answerTextarea(newValue) {
                this.debouncedSave(this, newValue)
            },
            computedSection() {
                updateAnswers(this)
            }
        }
    }
</script>
