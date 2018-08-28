<template>
    <div :class="{'h-100': 'textarea' === choiceType}">
        <div v-if="'radio' === choiceType" v-for="choice in choices" :key="choice.id">
            <label class="flex items-start w-100 pv2">
                <img src="../../assets/imgs/radio-unchecked.png"
                     :class="{dn: (choice.id + '||' + choice.choice) === answerRadio}"
                     class="mt1 w1 h1"/>
                <img src="../../assets/imgs/radio-checked.png"
                     :class="{dn: (choice.id + '||' + choice.choice) !== answerRadio}"
                     class="mt1 w1 h1"/>
                <input type="radio"
                       :value="choice.id + '||' + choice.choice"
                       v-model="answerRadio"
                       class="dn">
                <span class="ml2">{{choice.choice}}</span>
            </label>
        </div>

        <div v-if="'checkbox' === choiceType" v-for="choice in choices" :key="choice.id">
            <label class="flex items-start w-100 pv2 ">
                <img src="../../assets/imgs/check-unchecked.png"
                     :class="{dn: answerCheckbox.indexOf(choice.id + '||' + choice.choice) > -1}"
                     class="mt1 w1 h1"/>
                <img src="../../assets/imgs/check-checked.png"
                     :class="{dn:  answerCheckbox.indexOf(choice.id + '||' + choice.choice) < 0}"
                     class="mt1 w1 h1"/>
                <input type="checkbox"
                       :value="choice.id + '||' + choice.choice"
                       v-model="answerCheckbox"
                       class="dn">
                <span class="ml2">{{choice.choice}}</span>
            </label>
        </div>

        <div v-if="'textarea' === choiceType" class="h-100">
            <label class="flex flex-wrap w-100 h-100
                _h-100-mobile-landscape">
                <textarea v-model="answerTextarea"
                          class="b--dashed _b--green w-100 h-100"
                          placeholder="Escribe aquí la respuesta..."></textarea>
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
            debouncedSave: _.debounce((self, newValue, questionIndex) => {
                self.saveUserData(newValue, questionIndex)
            }, 1000)
        },

        data() {
            return {
                answerRadio   : '',
                answerCheckbox: [],
                answerTextarea: [],
                choices       : [],
                choiceType    : '',
                saveUserData  : (newValue, questionIndex) => {
                    const userId   = this.userId();
                    const userData = this.userData();

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
                this.saveUserData(newValue, getQuestionIndex(this.currentSection()))
            },
            answerCheckbox(newValue) {
                this.saveUserData(newValue, getQuestionIndex(this.currentSection()))
            },
            answerTextarea(newValue) {
                this.debouncedSave(this, newValue, getQuestionIndex(this.currentSection()))
            },
            computedSection() {
                updateAnswers(this)
            }
        }
    }
</script>

<style scoped>
    ._b--green {
        border-color: rgba(27, 75, 36, 1);
    }
</style>
