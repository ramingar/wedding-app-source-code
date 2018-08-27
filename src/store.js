import Vue from 'vue'
import Vuex from 'vuex'

import sections from './sectionStore'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        menu          : true,
        submenu       : false,
        next          : false,
        previous      : false,
        sections      : sections,
        currentSection: 'default',
        historic      : [],
        cardText      : sections.default.text,
        cardTitle     : sections.default.title,
        cardImage     : sections.default.image
    },

    mutations: {

        hideMenu: (state) => {
            state.menu = false
        },

        showSubmenu: (state) => {
            state.submenu = true
        },

        hideSubmenu: (state) => {
            state.submenu = false
        },

        enableNext: (state) => {
            state.next = true
        },

        disableNext: (state) => {
            state.next = false
        },

        enablePrevious: (state) => {
            state.previous = true
        },

        disablePrevious: (state) => {
            state.previous = false
        },

        setCurrentSection: (state, section) => {
            state.cardText       = sections[section].text;
            state.cardTitle      = sections[section].title;
            state.cardImage      = sections[section].image;
            state.currentSection = section;
        },

        pushInHistoric: (state, section) => {
            state.historic = Array.prototype.concat.call([], state.historic, section)
        },

        popFromHistoric: (state) => {
            state.historic = state.historic.filter((val, index, arr) => index < arr.length - 1 ? val : undefined)
        }
    },

    actions: {
        hideMenu: ({commit}) => {
            commit('hideMenu')
        },

        showSubmenu: ({commit}) => {
            commit('showSubmenu')
        },

        hideSubmenu: ({commit}) => {
            commit('hideSubmenu')
        },

        enableNext: ({commit}) => {
            commit('enableNext')
        },

        disableNext: ({commit}) => {
            commit('disableNext')
        },

        enablePrevious: ({commit}) => {
            commit('enablePrevious')
        },

        disablePrevious: ({commit}) => {
            commit('disablePrevious')
        },

        setCurrentSection: ({commit, dispatch, state}, {section}) => {
            commit('setCurrentSection', section);
            commit('pushInHistoric', section);
            dispatch('enablePrevious');
        },

        goToPreviousPage: ({commit, dispatch, state}) => {
            commit('popFromHistoric');  // caution! not immutable
            const section = state.historic.length > 0 ? state.historic[state.historic.length - 1] : 'default';
            commit('setCurrentSection', section);
            'default' === section ? dispatch('disablePrevious') : undefined;
        }
    },

    getters: {
        menu          : (state) => state.menu,
        submenu       : (state) => state.submenu,
        next          : (state) => state.next,
        previous      : (state) => state.previous,
        cardText      : (state) => state.cardText,
        cardTitle     : (state) => state.cardTitle,
        cardImage     : (state) => state.cardImage,
        currentSection: (state) => state.currentSection,
        historic      : (state) => state.historic
    }
})
