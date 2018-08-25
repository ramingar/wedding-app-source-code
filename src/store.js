import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        submenu: false
    },

    mutations: {
        showSubmenu: (state) => {
            state.submenu = true;
        },
        hideSubmenu: (state) => {
            state.submenu = false;
        }
    },

    actions: {
        showSubmenu: ({commit}) => {
            commit('showSubmenu');
        },
        hideSubmenu: ({commit}) => {
            commit('hideSubmenu');
        }
    },

    getters: {
        submenu: (state) => state.submenu
    }
})
