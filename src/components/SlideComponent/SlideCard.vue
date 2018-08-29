<template>
    <div class="fixed flex items-center justify-center h-100 w-100">
        <div class="relative flex flex-column items-center bg-white overflow-auto br4 mh3 mb5 mb0-ns ml5-ns _w5_50 h-75 pa3
        _flex-row-mobile-landscape _w5_75-mobile-landscape
        _h6_12-tablet-portrait
        _flex-row-hd _w6_75-hd
        _flex-row-fullhd _w7_6-fullhd">
            <div @click="goToPrevious"
                 :class="closeClasses"
                 class="button absolute right-0 top-0 ma1 mt0 f2">
                <span class="close"></span>
            </div>
            <div class="justify-center items-start h-50 w-100
                _items-center-mobile-landscape _h-100-mobile-landscape
                _items-center-hd _h-100-hd
                _items-center-fullhd _h-100-fullhd
                f7 _f5-hd _f4-fullhd">
                <slide-card-main/>
            </div>
            <div class="flex justify-center items-start h-50 w-100
                _items-center-mobile-landscape _h-100-mobile-landscape
                _items-center-hd _h-100-hd
                _items-center-fullhd _h-100-fullhd
                f7 _f8-mobile-landscape _f5-hd _f4-fullhd">
                <slide-card-content/>
            </div>
        </div>
    </div>
</template>

<script>
    import SlideCardMain from './SlideCardMain.vue'
    import SlideCardContent from './SlideCardContent.vue'

    import {mapGetters, mapActions} from 'vuex'

    export default {
        name      : "SlideCard",
        components: {
            SlideCardMain,
            SlideCardContent
        },

        methods: {
            ...mapGetters(['cardClose', 'contentDelay']),
            ...mapActions(['goToPreviousPage']),

            goToPrevious() {
                this.goToPreviousPage()
            }
        },

        data() {
            return {
                closeButton: false
            }
        },

        computed: {
            closeClasses() {
                return {
                    'button-disabled': !this.closeButton,
                    'button-hidden'  : !this.closeButton
                }
            },
            computedClose() {
                return this.cardClose()
            }
        },

        created() {
            this.closeButton = this.computedClose
        },

        watch: {
            computedClose() {
                setTimeout(() => {
                    this.closeButton = this.cardClose();
                }, this.contentDelay());
            }
        }

    }
</script>

<style scoped>
    .close {
        font-family: 'PWSmallIcons';
    }

    .close:before {
        content: '”';
    }
</style>