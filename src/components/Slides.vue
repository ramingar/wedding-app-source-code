<template>
    <div>
        <slide-card-blank :class="{'card-in-from-left': cardTransitionPrevious}" class="card-out-left"/>
        <slide-card
                :class="{'card-out-left-from-center': cardTransition, 'card-out-right-from-center': cardTransitionPrevious}"
                class="card-in"/>
        <slide-buttons/>
        <slide-card-blank :class="{'card-in-from-right': cardTransition}" class="card-out-right"/>
        <div class="dn">section -> {{assignSection}}</div>
    </div>
</template>

<script>
    import SlideButtons from './SlideComponent/SlideButtons.vue'
    import SlideCard from './SlideComponent/SlideCard.vue'
    import SlideCardBlank from './SlideComponent/SlideCardBlank.vue'

    import {mapGetters, mapActions} from 'vuex'
    import axios from 'axios'

    export default {
        name      : 'Slides',
        components: {
            SlideButtons,
            SlideCard,
            SlideCardBlank
        },

        data() {
            return {
                section               : '',
                cardTransition        : false,
                cardTransitionPrevious: false
            }
        },

        computed: {
            assignSection() {
                this.section = this.currentSection()
            },
        },

        methods: {
            ...mapGetters(['currentSection', 'userData', 'goingNext', 'goingPrevious', 'contentDelay']),
            ...mapActions([
                'setUserData', 'setUserId', 'setCurrentSection', 'setSections', 'showMenu',
                'setGoingNext', 'setGoingPrevious'
            ])
        },

        watch: {
            section: function (newSection, oldSection) {
                if ('' !== oldSection) {
                    this.cardTransition         = this.goingNext();
                    this.cardTransitionPrevious = this.goingPrevious();
                }

                setTimeout(() => {
                    this.cardTransition         = false;
                    this.cardTransitionPrevious = false;

                    this.setGoingNext({value: false});
                    this.setGoingPrevious({value: false});
                }, this.contentDelay());
            }
        },

        created() {
            const userId = this.$router.history.current.params.id;
            axios
                .get(`/users/${userId}.json`)
                .then(user => {
                    const userData = user.data ? user.data : {};
                    this.setUserData({userData});
                    this.setUserId({userId});
                    return axios.get(`/static-pages/${userData.staticPages}.json`)
                })
                .then(staticPages => {
                    this.setSections({sections: staticPages.data});
                    this.setCurrentSection({section: 'default', addToHistoric: false});
                    if (staticPages.data) {
                        this.showMenu();
                    }
                })
                .then(() => {
                    const questionsPromises = this.userData().questions.map(val => axios.get(`/questions/${val}.json`));
                    return Promise.all(questionsPromises)
                })
                .then(res => {
                    const questions = Object
                        .keys(res)
                        .reduce((acc, key, index) => Object.assign({}, acc, {[`question-${index}`]: res[key].data}), {});
                    this.setSections({sections: questions});  // merging questions to the user's static-pages
                })
                .catch(() => {
                    this.setCurrentSection({section: 'default'})
                })
        }
    }
</script>

<style>
    .card-out-right {
        transform: translateX(200%);
    }

    .card-out-left {
        transform: translateX(-200%);
    }

    .card-in {
        transform: translateX(0);
    }

    .card-out-left-from-center {
        -webkit-animation-name: cardOutLeftFromCenter;
        -moz-animation-name: cardOutLeftFromCenter;
        -o-animation-name: cardOutLeftFromCenter;
        animation-name: cardOutLeftFromCenter;
        animation-duration: .4s;
    }

    .card-out-right-from-center {
        -webkit-animation-name: cardOutRightFromCenter;
        -moz-animation-name: cardOutRightFromCenter;
        -o-animation-name: cardOutRightFromCenter;
        animation-name: cardOutRightFromCenter;
        animation-duration: .4s;
    }

    .card-in-from-right {
        -webkit-animation-name: cardInFromRight;
        -moz-animation-name: cardInFromRight;
        -o-animation-name: cardInFromRight;
        animation-name: cardInFromRight;
        animation-duration: .4s;
    }

    .card-in-from-left {
        -webkit-animation-name: cardInFromLeft;
        -moz-animation-name: cardInFromLeft;
        -o-animation-name: cardInFromLeft;
        animation-name: cardInFromLeft;
        animation-duration: .4s;
    }

    @keyframes cardInFromRight {
        0% {
            transform: translateX(200%);
        }
        100% {
            transform: translateX(0);
        }
    }

    @keyframes cardOutLeftFromCenter {
        0% {
            transform: translateX(0%);
        }
        100% {
            transform: translateX(-200%);
        }
    }

    @keyframes cardInFromLeft {
        0% {
            transform: translateX(-200%);
        }
        100% {
            transform: translateX(0);
        }
    }

    @keyframes cardOutRightFromCenter {
        0% {
            transform: translateX(0%);
        }
        100% {
            transform: translateX(200%);
        }
    }

</style>