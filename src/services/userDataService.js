import axiosClient from "./axiosClient";

const userDataService = {
    /**
     * Holt die eingeloggten Userdaten
     */
    me: (userData) => {
      const requestUrl = `${process.env.VUE_APP_API_URL}/user/me`;
  
      return axiosClient().get(requestUrl, userData).then((res) => {
        return res.data.user;
      });
    },

    /**
     * Erstellt einen neuen User Account
     */
    register: (userData) => {
      const requestUrl = `${process.env.VUE_APP_API_URL}/user/register`;
  
      return axiosClient().post(requestUrl, userData).then((res) => {
        return res.data;
      });
    },

    /**
     * Erstellt einen neuen User Account
     */
    login: (userData) => {
      const requestUrl = `${process.env.VUE_APP_API_URL}/user/login`;
  
      return axiosClient().post(requestUrl, userData).then((res) => {
        return res.data;
      });
    },

};

export default userDataService;
