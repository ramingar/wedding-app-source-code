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
                answerRadio: '',
                choices    : [],
                section    : ''
            }
        },

        computed: {
            areChoicesRadio() {
                return 'radio' === this.cardAnswerType()
            }
        },

        created() {
            this.section = this.currentSection();
        },

        mounted() {
            const questionIndex = this.currentSection().split('-')[1];
            const answer        = this.userData().answers[questionIndex] || '';
            this.answerRadio    = answer;
        },

        watch: {
            answerRadio(newValue, oldValue) {
                console.log(newValue);
            },
            section() {
                setTimeout(() => {
                    this.choices = this.cardChoices();
                }, this.contentDelay());
            }
        }
    }
</script>

<style scoped>

</style>