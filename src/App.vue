<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style>
    @font-face {
        font-family: KBREINDEERGAMES;
        src: url(./assets/fonts/KBREINDEERGAMES.ttf);
    }

    @font-face {
        font-family: PWSmallIcons;
        src: url(./assets/fonts/PWSmallIcons.ttf);
    }

    @font-face {
        font-family: Tofino-book;
        src: url(./assets/fonts/tofino-personal/TofinoPersonal-Book.ttf);
    }

    @font-face {
        font-family: Phones;
        src: url(./assets/fonts/phones/PHONES.TTF);
    }

    .kbreindeergames {
        font-family: 'KBREINDEERGAMES';
    }

    .tofino-icon {
        font-family: 'PWSmallIcons';
    }

    .phone-icon {
        font-family: 'Phones';
    }

    #app {
        font-family: 'Tofino-book', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    body {
        background-image: url(./assets/imgs/slide-component/corrugated_texture.jpg);
        background-attachment: fixed;
        background-repeat: no-repeat;
        -webkit-background-size: auto;
        -moz-background-size: auto;
        -o-background-size: auto;
        background-size: auto;
    }

    @media (min-width: 1024px) {
        body {
            background: url(./assets/imgs/slide-component/corrugated_texture-big.jpg) no-repeat center center fixed;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
        }
    }

    @media (min-height: 768px) {
        body {
            background: url(./assets/imgs/slide-component/corrugated_texture-big.jpg) no-repeat center center fixed;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
        }
    }

</style>
