import axiosClient from "./axiosClient";

const secretDataService = {
  /**
   * Gibt nur einen spezifischen Post
   */
    find: () => {
        const requestUrl = '/secret';

        return axiosClient().get(requestUrl).then((res) => {
            return res.data;
        });
    },
};

export default secretDataService;
