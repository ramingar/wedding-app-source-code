import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        submenu : false,
        next    : false,
        previous: false
    },

    mutations: {
        showSubmenu: (state) => {
            state.submenu = true;
        },

        hideSubmenu: (state) => {
            state.submenu = false;
        },

        enableNext: (state) => {
            state.next = true;
        },

        disableNext: (state) => {
            state.next = false;
        },

        enablePrevious: (state) => {
            state.previous = true;
        },

        disablePrevious: (state) => {
            state.previous = false;
        },
    },

    actions: {
        showSubmenu: ({commit}) => {
            commit('showSubmenu');
        },

        hideSubmenu: ({commit}) => {
            commit('hideSubmenu');
        },

        enableNext: ({commit}) => {
            commit('enableNext');
        },

        disableNext: ({commit}) => {
            commit('disableNext');
        },

        enablePrevious: ({commit}) => {
            commit('enablePrevious');
        },

        disablePrevious: ({commit}) => {
            commit('disablePrevious');
        }
    },

    getters: {
        submenu : (state) => state.submenu,
        next    : (state) => state.next,
        previous: (state) => state.previous
    }
})
