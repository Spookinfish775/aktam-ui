// import { ROUTES } from "~/infrastructure/constants/routes.js";
import axios from "axios";
axios.defaults.baseURL = `${process.env}/api`;

export const state = () => ({
    innerWidth: "",
    selectedSliderItem: {},
});

export const getters = {
    GetInnerWidth(state) {
        return state.innerWidth;
    },
    GetSelectedSliderItem(state) {
        return state.selectedSliderItem;
    },
};

export const mutations = {
    SetInnerWidth(state, value) {
        state.innerWidth = value;
    },

    SetSelectedSliderItem(state, value) {
        state.selectedSliderItem = value;
    },
};

export const actions = {
    GoTo({ }, { route }) {
        this.$router.push(route);
    },


    async nuxtClientInit({ state, commit, dispatch }) {
        const cookie = this.$cookies.get('auth');
        if (cookie) {
            commit('auth/setTokens', cookie.auth)
        }
        const { accessToken, refreshToken } = state.auth
        if (accessToken && refreshToken) {
            try {
                await dispatch('auth/refresh');
                await dispatch('auth/getUser');
            } catch (e) {
                commit('auth/logout')
            }
        }
    },


    // async nuxtServerInit({ state, commit, dispatch }) {
    //     const cookie = this.$cookies.get('auth');
    //     if (cookie) {
    //         commit('auth/setTokens', cookie.auth);
    //     }
    //     const { accessToken, refreshToken } = state.auth;
    //     if (accessToken && refreshToken) {
    //         try {
    //             await dispatch('auth/refresh');
    //             await dispatch('auth/getUser')
    //         } catch (e) {
    //             commit('auth/logout');
    //         }
    //     }
    // }
};
