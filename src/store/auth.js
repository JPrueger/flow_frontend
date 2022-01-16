import axios from "axios";

export default {

    state: {
        allStates: [
            {
              authenticated: null,
              user: null,
              errors: null,
              success: null,
              showSubmit: true,
              loader: false,
            },

        ],
    },

    getters: {
        authStates: state => state.allStates,
    },

    mutations: {
      SET_AUTHENTICATED (state, value) {
        state.allStates[0].authenticated = value
      },
      SET_USERTOKEN (state, value) {
        state.allStates[0].user = value
      },
      SET_ERROR (state, value) {
        state.allStates[0].errors = value
      },
      SET_SUCCESS (state, value) {
        state.allStates[0].success = value
      },
      SET_SHOWSUBMIT (state, value) {
        state.allStates[0].showSubmit = value
      },
      SET_LOADER (state, value) {
        state.allStates[0].loader = value
      }

    },

    actions: {
        async login({ commit }, credentials) {
            await axios.post(`${process.env.VUE_APP_API_URL}/login`, credentials).then((res) => {
              commit('SET_AUTHENTICATED', true)
              commit('SET_USERTOKEN', res.data)
              commit('SET_SUCCESS', true)            
              commit('SET_ERROR', false)            
              commit('SET_LOADER', false)            
              commit('SET_SHOWSUBMIT', true)            

            }).catch(() => {
              commit('SET_ERROR', true) 
              commit('SET_LOADER', false)            
              commit('SET_SHOWSUBMIT', true)            
           
            });
        },
        async logout({ commit }) {
          await axios.get(`${process.env.VUE_APP_API_URL}/logout`).then(() => {
            commit('SET_AUTHENTICATED', false)
            commit('SET_USER', null)
            commit('SET_SUCCESS', false)            

          }).catch(() => {
            commit('SET_ERROR', true)            
          });
      },

    },
};