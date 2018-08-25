<template>
    <div>
        <div class="fixed top-0 right-0 f2 w2 h2 ma1 button">
            <span class="db info"></span>
        </div>

        <div id="curtain"
             @click="hideMenu"
             :class="curtainClasses"
             class="transition-fast absolute absolute--fill _h0 _w0 o-0" style="background-color: rgb(31, 57, 37);">
        </div>

        <div class="absolute flex bottom-0 justify-center w-100 w3-ns h-100-ns flex-column-ns">
            <button v-bind:disabled="!this.previous()"
                    :class="previousClasses"
                    class="b--dotted b--black w3 pa2 f2 tc cardboard-button-background button">
                <span class="db previous"></span>
            </button>
            <button @click="toggleMenu"
                    class="b--dotted b--black bt-0-ns _bl-0-s w3 pa2 f2 tc cardboard-button-background button">
                <span class="db menu"></span>
            </button>
            <button v-bind:disabled="!this.previous()"
                    :class="nextClasses"
                    class="b--dotted b--black bt-0-ns _bl-0-s w3 pa2 f2 tc cardboard-button-background button">
                <span class="db next"></span>
            </button>
        </div>

        <div :class="submenuClasses"
             class="transition-fast absolute bottom-0 justify-center flex-column-ns w-100 w3-ns h-100-ns _bottom-2_87 _bottom-inherit-ns _left-2_87-ns">
            <button class="b--dotted b--black w3 pa2 f2 tc cardboard-button-background button">
                <span class="db location"></span>
            </button>
            <button class="b--dotted b--black bt-0-ns _bl-0-s w3 pa2 f2 tc cardboard-button-background button">
                <span class="db parking"></span>
            </button>
            <button class="b--dotted b--black bt-0-ns _bl-0-s w3 pa2 f2 tc cardboard-button-background button">
                <span class="db calendar"></span>
            </button>
            <button class="b--dotted b--black bt-0-ns _bl-0-s w3 pa2 f2 tc cardboard-button-background button">
                <span class="db present"></span>
            </button>
            <button class="b--dotted b--black bt-0-ns _bl-0-s w3 pa2 f2 tc cardboard-button-background button">
                <span class="db contact"></span>
            </button>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "SlideButtons",

        methods: {
            ...mapGetters(['submenu', 'next', 'previous']),
            ...mapActions(['hideSubmenu', 'showSubmenu']),
            hideMenu  : function () {
                this.hideSubmenu()
            },
            toggleMenu: function () {
                this.submenu() ? this.hideSubmenu() : this.showSubmenu()
            }
        },

        computed: {
            curtainClasses() {
                return {
                    displayed: this.submenu()
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

    .button.button-disabled:hover {
        cursor: default;
    }

    .button-disabled span {
        border-color: black;
        color: rgba(129, 100, 59, .4);
        -webkit-animation-name: none;
        -moz-animation-name: none;
        -o-animation-name: none;
        animation-name: none;
    }

    .transition-fast {
        -webkit-transition: opacity .2s;
        -moz-transition: opacity .2s;
        -o-transition: opacity .2s;
        transition: opacity .2s;
    }

    /* used by Vue in a computed variable */
    #curtain.displayed {
        height: 100%;
        width: 100%;
        opacity: .8;
    }

    .cardboard-button-background {
        background-image: url(../../assets/imgs/slide-component/cardboard-buttons-background.jpg);
    }

    .button:hover {
        cursor: pointer;
        color: rgba(27, 75, 36, 1);
        border-color: black;
    }

    .button:active span {
        color: rgba(23, 134, 44, 1);
    }

    .button.button-disabled:active span {
        color: rgba(129, 100, 59, .4);
    }

    @keyframes hovered {
        0% {
            -webkit-transform: rotate(0) scale(1.4);
            -moz-transform: rotate(0) scale(1.4);
            -ms-transform: rotate(0) scale(1.4);
            -o-transform: rotate(0) scale(1.4);
            transform: rotate(0) scale(1.4);
        }
        33% {
            -webkit-transform: rotate(-5deg) scale(1.4);
            -moz-transform: rotate(-5deg) scale(1.4);
            -ms-transform: rotate(-5deg) scale(1.4);
            -o-transform: rotate(-5deg) scale(1.4);
            transform: rotate(-5deg) scale(1.4);
        }
        66% {
            -webkit-transform: rotate(5deg) scale(1.4);
            -moz-transform: rotate(5deg) scale(1.4);
            -ms-transform: rotate(5deg) scale(1.4);
            -o-transform: rotate(5deg) scale(1.4);
            transform: rotate(5deg) scale(1.4);
        }
        100% {
            -webkit-transform: rotate(0) scale(1.4);
            -moz-transform: rotate(0) scale(1.4);
            -ms-transform: rotate(0) scale(1.4);
            -o-transform: rotate(0) scale(1.4);
            transform: rotate(0) scale(1.4);
        }
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

    @media (min-width: 75rem) and (max-width: 86rem) and (min-height: 600px) {
        .button:hover span {
            -webkit-animation-name: hovered;
            -moz-animation-name: hovered;
            -o-animation-name: hovered;
            animation-name: hovered;

            -webkit-animation-duration: .2s;
            -moz-animation-duration: .2s;
            -o-animation-duration: .2s;
            animation-duration: .2s;
            animation-iteration-count: 4;

            -webkit-transform: rotate(0) scale(1.4);
            -moz-transform: rotate(0) scale(1.4);
            -ms-transform: rotate(0) scale(1.4);
            -o-transform: rotate(0) scale(1.4);
            transform: rotate(0) scale(1.4);
        }

        .button.button-disabled:hover span {
            -webkit-animation-name: none;
            -moz-animation-name: none;
            -o-animation-name: none;
            animation-name: none;

            -webkit-transform: none;
            -moz-transform: none;
            -ms-transform: none;
            -o-transform: none;
            transform: none;
        }
    }

    @media (min-width: 86rem) and (min-height: 600px) {
        .button:hover span {
            -webkit-animation-name: hovered;
            -moz-animation-name: hovered;
            -o-animation-name: hovered;
            animation-name: hovered;

            -webkit-animation-duration: .2s;
            -moz-animation-duration: .2s;
            -o-animation-duration: .2s;
            animation-duration: .2s;
            animation-iteration-count: 4;

            -webkit-transform: rotate(0) scale(1.4);
            -moz-transform: rotate(0) scale(1.4);
            -ms-transform: rotate(0) scale(1.4);
            -o-transform: rotate(0) scale(1.4);
            transform: rotate(0) scale(1.4);
        }

        .button.button-disabled:hover span {
            -webkit-animation-name: none;
            -moz-animation-name: none;
            -o-animation-name: none;
            animation-name: none;

            -webkit-transform: none;
            -moz-transform: none;
            -ms-transform: none;
            -o-transform: none;
            transform: none;
        }
    }

</style>