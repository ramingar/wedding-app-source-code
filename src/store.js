import Vue from 'vue'
import Vuex from 'vuex'

import sectionsStore from './sectionStore'

Vue.use(Vuex);

const getSection = (state) => {
    return state.historic.length > 0 ? state.historic[state.historic.length - 1] : 'default'
};

const getCurrentQuestionIndex = (state) => {
    return state.currentSection.split('-')[1];
};

const areMoreQuestions = (state) => {
    const currentIndex = getCurrentQuestionIndex(state);
    const questions    = state.userData.questions;
    return currentIndex < (questions.length - 1);
};

const canNextButtonBeEnabled = (state) => {
    return state.currentSection.indexOf('question') > -1 && areMoreQuestions(state)
};

export default new Vuex.Store({
    state: {
        userData      : {},
        userId        : '',
        menu          : false,
        submenu       : false,
        info          : false,
        next          : false,
        previous      : false,
        sections      : sectionsStore,
        currentSection: 'loading',
        historic      : [],
        cardText      : sectionsStore.loading.text,
        cardTitle     : sectionsStore.loading.title,
        cardImage     : sectionsStore.loading.image,
        cardAnswerType: sectionsStore.loading.answerType,
        cardChoices   : sectionsStore.loading.choices,
        cardQuestion  : sectionsStore.loading.question,
        contentDelay  : 200
    },

    mutations: {

        setUserData: (state, userData) => {
            state.userData = userData
        },

        setUserId: (state, userId) => {
            state.userId = userId
        },

        showMenu: (state) => {
            state.menu = true
        },

        showSubmenu: (state) => {
            state.submenu = true
        },

        showInfo: (state) => {
            state.info = true
        },

        hideSubmenu: (state) => {
            state.submenu = false
        },

        hideInfo: (state) => {
            state.info = false
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
            state.cardText  = state.sections[section].text;
            state.cardTitle = state.sections[section].title;
            state.cardImage = state.sections[section].image;

            state.cardAnswerType = state.sections[section].answerType;
            state.cardChoices    = state.sections[section].choices;
            state.cardQuestion   = state.sections[section].question;

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

        setUserId: ({commit}, {userId}) => {
            commit('setUserId', userId)
        },

        showMenu: ({commit}) => {
            commit('showMenu')
        },

        showSubmenu: ({commit}) => {
            commit('showSubmenu')
        },

        showInfo: ({commit}) => {
            commit('showInfo')
        },

        hideSubmenu: ({commit}) => {
            commit('hideSubmenu')
        },

        hideInfo: ({commit}) => {
            commit('hideInfo')
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

            dispatch('disableNext');
            if (canNextButtonBeEnabled(state)) {
                dispatch('enableNext')
            }
        },

        setSections: ({commit}, {sections}) => {
            commit('setSections', sections)
        },

        goToPreviousPage: ({commit, dispatch, state}) => {
            commit('popFromHistoric');  // caution! not immutable
            const section = getSection(state);
            commit('setCurrentSection', section);

            if ('default' === section) {
                dispatch('disablePrevious')
            }

            dispatch('disableNext');
            if (canNextButtonBeEnabled(state)) {
                dispatch('enableNext')
            }
        },

        goToNextQuestion: ({dispatch, state}) => {
            const currentIndex = getCurrentQuestionIndex(state);
            dispatch('setCurrentSection', {section: 'question-' + (parseInt(currentIndex) + 1)});
        }
    },

    getters: {
        userData      : (state) => state.userData,
        userId        : (state) => state.userId,
        menu          : (state) => state.menu,
        submenu       : (state) => state.submenu,
        info          : (state) => state.info,
        next          : (state) => state.next,
        previous      : (state) => state.previous,
        cardText      : (state) => state.cardText,
        cardTitle     : (state) => state.cardTitle,
        cardImage     : (state) => state.cardImage,
        cardAnswerType: (state) => state.cardAnswerType,
        cardChoices   : (state) => state.cardChoices,
        cardQuestion  : (state) => state.cardQuestion,
        currentSection: (state) => state.currentSection,
        historic      : (state) => state.historic,
        contentDelay  : (state) => state.contentDelay
    }
})
