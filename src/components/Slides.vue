<template>
    <div>
        <slide-card :class="{'card-out-left-from-center': cardTransition}" class="card-in"/>
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
                section       : '',
                cardTransition: false
            }
        },

        computed: {
            assignSection() {
                this.section = this.currentSection()
            },
        },

        methods: {
            ...mapGetters(['currentSection']),
            ...mapActions(['setUserData', 'setCurrentSection', 'setSections', 'showMenu'])
        },

        watch: {
            section: function (newSection, oldSection) {
                '' !== oldSection ? this.cardTransition = true : null;
                setTimeout(() => {
                    this.cardTransition = false;
                }, 500);
            }
        },

        created() {
            const id = this.$router.history.current.params.id;
            axios
                .get(`/users/${id}.json`)
                .then(user => {
                    const userData = user.data ? user.data : {};
                    this.setUserData({userData});
                    return axios
                        .get(`/static-pages/${userData.staticPages}.json`)
                        .then(staticPages => {
                            this.setSections({sections: staticPages.data});
                            this.setCurrentSection({section: 'default', addToHistoric: false});
                            if (staticPages.data) {
                                this.showMenu();
                            }
                        })
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

    .card-in-from-right {
        -webkit-animation-name: cardInFromRight;
        -moz-animation-name: cardInFromRight;
        -o-animation-name: cardInFromRight;
        animation-name: cardInFromRight;
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

</style>