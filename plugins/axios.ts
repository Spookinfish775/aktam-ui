import { Plugin } from '@nuxt/types'
import VueRouter from "vue-router"

import { alert } from "devextreme/ui/dialog";

let router: VueRouter

export default function ({ $axios, store }, inject) {
    // if (process.env.NODE_ENV === "production") {
    //     $axios.setBaseURL(document.location.origin);
    // } else {
    const { SERVER_URL }: string | any = process.env
    $axios.setBaseURL(SERVER_URL);

    $axios.onRequest((config) => {
        if (store.state.auth.accessToken) {
            // set the Authorization header using the access token
            config.headers.Authorization = 'Bearer ' + store.state.auth.accessToken;
        }

        return config;
    })

    $axios.onError(async (error) => {
        const statusCode = error.response ? error.response.status : -1;

        if (statusCode === 401 || statusCode === 422) {
            const refreshToken = store.state.auth.refreshToken;
            if (error.response.data.errorCode === 'JWT_TOKEN_EXPIRED' && refreshToken) {
                if (Object.prototype.hasOwnProperty.call(error.config, 'retryAttempts')) {
                    store.commit('auth/logout');
                    // return redirect('/anmelden');
                }
                const config = { retryAttempts: 1, ...error.config };
                try {
                    await store.dispatch('auth/refresh');
                    return Promise.resolve($axios(config));
                } catch (e) {
                    store.commit('auth/logout');
                    router.push("/admin/auth");
                    // return redirect('/anmelden');
                }
            }

            store.commit('auth/logout');
            // return redirect('/anmelden');
        }
        if (error.response.status === 404) {
            router.push("/error/404");
        }

        return Promise.reject(error);
    });
    // }
}

// const accessor: Plugin = ({ $axios, store, app: { i18n } }) => {
//     if (process.env.NODE_ENV === "production") {
//         $axios.setBaseURL(document.location.origin);
//     } else {
//         const { SERVER_URL }: string | any = process.env
//         $axios.setBaseURL(SERVER_URL);
//     }
//     // $axios.interceptors.request.use(
//     //     function (config) {
//     //         config.headers.Authorization =
//     //             "Bearer " + store.getters["oidc/oidcAccessToken"];
//     //         return config;
//     //     },
//     //     function (error) {
//     //         return Promise.reject(error);
//     //     }
//     // );
//     $axios.onError(async error => {
//         if (error.response?.status === 401) {
//             await store.dispatch("oidc/signOutOidc");
//             return;
//         }
//         if (error.response?.status === 404) {
//             await router.push("/error/404");
//             return;
//         }
//         if (
//             error.response.headers["content-type"] ===
//             "application/problem+json; charset=utf-8"
//         ) {
//             var errors = [];
//             var responseDetail;

//             if (error.response.config.responseType == "arraybuffer") {
//                 let responseData = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(error.response.data)));
//                 responseDetail = JSON.parse(responseData.detail);
//             } else {
//                 responseDetail = JSON.parse(error.response.data.detail);
//             }

//             for (const key in responseDetail) {
//                 if (responseDetail.hasOwnProperty(key)) {
//                     responseDetail[key].forEach(element => {
//                         errors.push(element);
//                     });
//                 }
//             }
//             if (errors) {
//                 let header: string = `${i18n.t("errors.title")}`
//                 alert(
//                     `<ul>${errors
//                         .map(el => {
//                             return `<li class="text--error">${el}</li>`;
//                         })
//                         .join(" ")}</ul>`, header
//                 );
//             }
//         }
//         throw error
//     });
// }

// export default accessor


