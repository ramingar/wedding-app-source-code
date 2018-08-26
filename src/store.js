import Vue from 'vue'
import Vuex from 'vuex'

import sections from './sectionStore'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        submenu       : false,
        next          : false,
        previous      : false,
        sections      : sections,
        currentSection: 'default',
        cardText      : sections.default.text,
        cardTitle     : sections.default.title,
        cardImage     : sections.default.image
    },

    mutations: {
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
            state.cardText  = sections[section].text;
            state.cardTitle = sections[section].title;
            state.cardImage = sections[section].image;
            state.currentSection = section;
        }
    },

    actions: {
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

        setCurrentSection: ({commit}, {section}) => {
            commit('setCurrentSection', section)
        }
    },

    getters: {
        submenu       : (state) => state.submenu,
        next          : (state) => state.next,
        previous      : (state) => state.previous,
        cardText      : (state) => state.cardText,
        cardTitle     : (state) => state.cardTitle,
        cardImage     : (state) => state.cardImage,
        currentSection: (state) => state.currentSection
    }
})
