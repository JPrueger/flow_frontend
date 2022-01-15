import axios from "axios";

const laravelUrl = process.env.VUE_APP_API_URL;

const postDataService = {
  /**
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   * Speichert einen neuen Post
   */
  store: (postData) => {
    // hier definieren wir die laravel route, die wir zum Speichern verwenden möchten (wir geben das in eine Konstante, um den eigentlichen Request leserlicher zu machen)
    // das Muster für die korrekten URL routes in Laravel für unsere Route, findet ihr unter https://laravel.com/docs/8.x/controllers#resource-controllers (Tabelle unter "Actions Handled by Resource Controller" - hier steht welcher Pfad zu welcher Action passt. ["photos" ist hier nur ein Beispiel. Bei uns ist es z.Bsp: "posts"])
    const requestUrl = laravelUrl + "/posts";

    // da wir hier nun einen Request an eine api machen, verwenden wir "axios" um die Daten zu holen
    return axios.post(requestUrl, postData).then((res) => {
      // wir bekommen hier von axios ein Objekt mit allen möglichen Infos zum Request + den Daten unter "data" zurück. Da uns nur die Daten interessieren, geben wir nur diese weiter.
      return res.data;
    });
  },

  /**
   *
   *
   *
   *
   *
   *
   *
   *
   *
   * Gibt eine Liste mit allen Posts zurück
   */
  index: () => {
    const requestUrl = laravelUrl + "/posts";

    // bitte beachtet hier, dass wir hier "axios.get" statt wie in der Funktion darüber "axios.post" verwenden (dadurch weiß Laravel, dass wir laut Tabelle unter https://laravel.com/docs/8.x/controllers#resource-controllers die Laravel Aktion "index" aufrufen wollen)
    return axios.get(requestUrl).then((res) => {
      return res.data;
    });
  },

  /**
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   * Gibt nur einen spezifischen Post
   */
  find: (postId) => {
    const requestUrl = laravelUrl + "/posts/" + postId;

    return axios.get(requestUrl).then((res) => {
      return res.data;
    });
  },

  /**
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   * Update einen speziellen Post
   */
  update: (postId, newData) => {
    const requestUrl = laravelUrl + "/posts/" + postId;

    // bitte beachtet hier, dass wir hier "axios.put" statt "axios.get" verwenden (dadurch weiß Laravel, dass wir laut Tabelle unter https://laravel.com/docs/8.x/controllers#resource-controllers die Laravel Aktion "update" aufrufen wollen)
    return axios.put(requestUrl, newData).then((res) => {
      return res.data;
    });
  },

  /**
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   * Löscht einen speziellen Post
   */
  delete: (postId) => {
    const requestUrl = laravelUrl + "/posts/" + postId;

    // bitte beachtet hier, dass wir hier "axios.delete" verwenden
    return axios.delete(requestUrl).then((res) => {
      return res.data;
    });
  },
};

export default postDataService;
