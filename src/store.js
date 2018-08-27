import Vue from 'vue'
import Vuex from 'vuex'

import sectionsStore from './sectionStore'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userData      : {},
        menu          : false,
        submenu       : false,
        next          : false,
        previous      : false,
        sections      : sectionsStore,
        currentSection: 'loading',
        historic      : [],
        cardText      : sectionsStore.loading.text,
        cardTitle     : sectionsStore.loading.title,
        cardImage     : sectionsStore.loading.image
    },

    mutations: {

        setUserData: (state, userData) => {
            state.userData = userData
        },

        showMenu: (state) => {
            state.menu = true
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
            state.cardText       = state.sections[section].text;
            state.cardTitle      = state.sections[section].title;
            state.cardImage      = state.sections[section].image;
            state.currentSection = section;
        },

        setSections: (state, sections = {}) => {
            state.sections = Object.assign({}, state.sections, sections);
        },

        pushInHistoric: (state, section) => {
            state.historic = Array.prototype.concat.call([], state.historic, section);
        },

        popFromHistoric: (state) => {
            state.historic = state.historic.filter((val, index, arr) => index < arr.length - 1 ? val : undefined)
        }
    },

    actions: {
        setUserData: ({commit}, {userData}) => {
            commit('setUserData', userData)
        },

        showMenu: ({commit}) => {
            commit('showMenu')
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

        setCurrentSection: ({commit, dispatch, state}, {section, addToHistoric = true}) => {
            commit('setCurrentSection', section);
            if (addToHistoric) {
                commit('pushInHistoric', section);
                dispatch('enablePrevious');
            }
        },

        setSections: ({commit}, {sections}) => {
            commit('setSections', sections)
        },

        goToPreviousPage: ({commit, dispatch, state}) => {
            commit('popFromHistoric');  // caution! not immutable
            const section = state.historic.length > 0 ? state.historic[state.historic.length - 1] : 'default';
            commit('setCurrentSection', section);
            'default' === section ? dispatch('disablePrevious') : undefined;
        }
    },

    getters: {
        userData      : (state) => state.userData,
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
