// import { Plugin } from '@nuxt/types'
// import { vuexOidcCreateStoreModule } from 'vuex-oidc'
// import { WebStorageStateStore } from 'oidc-client'
// import { dataApi } from '~/static/dataApi'

// const accessor: Plugin = async ({ $axios, store }) => {
//     const { data } = await $axios.get(dataApi.OidcConfiguration)
//     const storeModule = vuexOidcCreateStoreModule(
//         {
//             automaticSilentRenew: true,
//             silentRequestTimeout: 100,
//             userStore: new WebStorageStateStore({ store: window.localStorage }),
//             ...data
//         },
//         {
//             namespaced: true,
//             dispatchEventsOnWindow: true,
//             publicRoutePaths: ['/callback']
//         },

//     )
//     store.registerModule('oidc', storeModule)
// }

// export default accessor
