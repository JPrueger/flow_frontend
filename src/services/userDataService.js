import axiosClient from "./axiosClient";

const userDataService = {
    /**
     * Holt die eingeloggten Userdaten
     */
    me: (userData) => {
      const requestUrl = "/user/me";
  
      return axiosClient().get(requestUrl, userData).then((res) => {
        return res.data.user;
      });
    },

    /**
     * Erstellt einen neuen User Account
     */
    register: (userData) => {
      const requestUrl = "/user/register";
  
      return axiosClient().post(requestUrl, userData).then((res) => {
        return res.data;
      });
    },

    /**
     * Erstellt einen neuen User Account
     */
    login: (userData) => {
      const requestUrl = "/user/login";
  
      return axiosClient().post(requestUrl, userData).then((res) => {
        return res.data;
      });
    },

};

export default userDataService;
