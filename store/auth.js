import { dataApi } from "../static/dataApi"
import { UserRole } from "../infrastructure/enums/UserRole";

export const state = () => ({
    user: null,
    accessToken: null,
    refreshToken: null,
    userRole: null,
});

export const getters = {
    isAuthenticated({ accessToken }) {
        return !!accessToken;
    },
    isAdmin({ user }) {
        return user.role === UserRole.Admin
    },
    user({ user }) {
        return user
    }
};

export const mutations = {
    setTokens(state, { accessToken, refreshToken }) {
        state.accessToken = accessToken;

        if (refreshToken) {
            state.refreshToken = refreshToken;
        }
    },
    setUser(state, user) {
        state.user = user;
    },
    logout(state) {
        state.accessToken = null;
        state.refreshToken = null;
        state.user = null;
    }
};

export const actions = {
    async logout({ commit }) {
        await commit("logout")
    },
    async login({ commit, dispatch }, { email, password }) {
        const data = await this.$axios.$post(dataApi.auth, {
            email,
            password
        });

        commit('setTokens', data);
        await dispatch('getUser');
    },
    async register({ commit, dispatch }, { email, password, confirmPassword }) {
        const data = await this.$axios.$post(`${dataApi.user}/Registration`, {
            email,
            password,
            confirmPassword,
        });
        commit('setTokens', data);
        await dispatch('getUser');
    },
    async getUser({ commit }) {
        const res = await this.$axios.$get(dataApi.getUser);
        commit('setUser', res);
    },
    async refresh({ state, commit }) {
        const data = await this.$axios.$post(dataApi.refreshToken, {
            accessToken: state.accessToken,
            refreshToken: state.refreshToken
        });
        commit('setTokens', data);
    }
};