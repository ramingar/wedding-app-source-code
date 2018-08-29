<template>
    <div>
        <div :class="menuClasses"
             class="fixed top-0 right-0 f2 w2 h2 ma1 button">
            <span @click="toggleInfo" class="db info"></span>
        </div>

        <div id="curtain"
             @click="hideMenu"
             :class="curtainClasses"
             class="transition-fast absolute absolute--fill _h0 _w0 o-0" style="background-color: rgb(31, 57, 37);">
        </div>

        <div :class="menuClasses"
             class="absolute bottom-0 justify-center w-100 w3-ns h-100-ns flex-column-ns">
            <button v-bind:disabled="!this.previous()"
                    @click="goBack"
                    :class="previousClasses"
                    class="b--dotted b--black w3 pa2 f2 tc cardboard-button-background button">
                <span class="db previous"></span>
            </button>
            <button @click="toggleMenu"
                    class="b--dotted b--black bt-0-ns _bl-0-s w3 pa2 f2 tc cardboard-button-background button">
                <span class="db menu"></span>
            </button>
            <button v-bind:disabled="!this.next()"
                    @click="goNext"
                    :class="nextClasses"
                    class="b--dotted b--black bt-0-ns _bl-0-s w3 pa2 f2 tc cardboard-button-background button">
                <span class="db next"></span>
            </button>
        </div>

        <div :class="submenuClasses"
             class="transition-fast absolute bottom-0 justify-center flex-column-ns w-100 w3-ns h-100-ns _bottom-2_87 _bottom-inherit-ns _left-2_87-ns">
            <button @click="changeSectionTo('location'); hideMenu();"
                    class="b--dotted b--black w3 pa2 f2 tc cardboard-button-background button">
                <span class="db location"></span>
            </button>
            <button @click="changeSectionTo('parkings'); hideMenu()"
                    class="b--dotted b--black bt-0-ns _bl-0-s w3 pa2 f2 tc cardboard-button-background button">
                <span class="db parking"></span>
            </button>
            <button @click="changeSectionTo('save-the-date'); hideMenu()"
                    class="b--dotted b--black bt-0-ns _bl-0-s w3 pa2 f2 tc cardboard-button-background button">
                <span class="db calendar"></span>
            </button>
            <button @click="changeSectionTo('gift'); hideMenu()"
                    class="b--dotted b--black bt-0-ns _bl-0-s w3 pa2 f2 tc cardboard-button-background button">
                <span class="db present"></span>
            </button>
            <button @click="changeSectionTo('contact'); hideMenu()"
                    class="b--dotted b--black bt-0-ns _bl-0-s w3 pa2 f2 tc cardboard-button-background button">
                <span class="db contact"></span>
            </button>
        </div>

        <div id="curtain2"
             @click="hideCurtainInfo"
             :class="curtain2Classes"
             class="transition-fast absolute absolute--fill _h0 _w0 o-0"
             style="background-color: rgb(31, 57, 37);">
        </div>

        <div :class="infoClasses" class="transition-fast fixed absolute--fill ma3">
            <div @click="hideCurtainInfo"
                 class="bg-center contain dn db-ns _display-fullhd _display-hd _display-mobile-landscape w-100 h-100"
                 style="background-image: url(/img/cards/info-horizontal.jpg)"></div>
            <div @click="hideCurtainInfo"
                 class="bg-center contain dn-ns _no_display-fullhd _no_display-hd _no_display-mobile-landscape h-100 w-100"
                 style="background-image: url(/img/cards/info-vertical.jpg)"></div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "SlideButtons",

        methods: {
            ...mapGetters(['menu', 'submenu', 'info', 'next', 'previous', 'currentSection']),
            ...mapActions([
                'hideSubmenu', 'showSubmenu', 'hideInfo', 'showInfo',
                'setCurrentSection', 'goToPreviousPage', 'goToNextQuestion'
            ]),
            hideMenu() {
                this.hideSubmenu()
            },
            hideCurtainInfo() {
                this.hideInfo()
            },
            toggleMenu() {
                this.submenu() ? this.hideSubmenu() : this.showSubmenu()
            },
            toggleInfo() {
                this.info() ? this.hideInfo() : this.showInfo()
            },
            changeSectionTo(section) {
                this.setCurrentSection({section})
            },
            goBack() {
                this.goToPreviousPage()
            },
            goNext() {
                this.goToNextQuestion()
            }
        },

        computed: {
            curtainClasses() {
                return {
                    displayed: this.submenu()
                }
            },
            curtain2Classes() {
                return {
                    displayed: this.info()
                }
            },
            infoClasses() {
                return {
                    db: this.info(),
                    dn: !this.info()
                }
            },
            menuClasses() {
                return {
                    flex: this.menu(),
                    dn  : !this.menu()
                }
            },
            submenuClasses() {
                return {
                    flex: this.submenu(),
                    dn  : !this.submenu()
                }
            },
            nextClasses() {
                return {
                    'button-disabled': !this.next()
                }
            },
            previousClasses() {
                return {
                    'button-disabled': !this.previous()
                }
            }
        }
    }
</script>

<style scoped>

    .transition-fast {
        -webkit-transition: opacity .2s;
        -moz-transition: opacity .2s;
        -o-transition: opacity .2s;
        transition: opacity .2s;
    }

    /* used by Vue in a computed variable */
    .displayed {
        height: 100%;
        width: 100%;
        opacity: .8;
    }

    .cardboard-button-background {
        background-image: url(../../assets/imgs/slide-component/cardboard-buttons-background.jpg);
    }

    .info {
        font-family: 'PWSmallIcons';
    }

    .info:before {
        content: 'j';
    }

    .location {
        font-family: 'PWSmallIcons';
    }

    .location:before {
        content: '-';
    }

    .parking {
        font-family: 'PWSmallIcons';
    }

    .parking:before {
        content: '¨';
    }

    .calendar {
        font-family: 'PWSmallIcons';
    }

    .calendar:before {
        content: '(';
    }

    .present {
        font-family: 'PWSmallIcons';
    }

    .present:before {
        content: '5';
    }

    .contact {
        font-family: 'PWSmallIcons';
    }

    .contact:before {
        content: 'A';
    }

    .previous {
        font-family: 'PWSmallIcons';
    }

    .previous:before {
        content: 's';
    }

    .next {
        font-family: 'PWSmallIcons';
    }

    .next:before {
        content: 'r';
    }

    .menu {
        font-family: 'PWSmallIcons';
    }

    .menu:before {
        content: '2';
    }

    @media (max-width: 30em) {
        ._bl-0-s {
            border-left: 0;
        }
    }

</style>