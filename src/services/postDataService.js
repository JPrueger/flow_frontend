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
    // ACHTUNG: wir verwenden hier Promise nur, um aus LocalStorage auch ein "Promise" zu machen (damit haben wir dann sowohl bei Laravel, als auch LocalStorage genau den gleichen Funktionsaufruf)
    // würden wir nicht beide Aufbauten gleichzeitig machen, könnte man sich das ganze Promise/resolve, ... sparen und es einfach direkt wieder zurückgeben
    return new Promise((resolve) => {
      // holen wir uns die aktuellen posts aus localStorage
      const allPosts = JSON.parse(localStorage.getItem("posts")) || [];

      // jeder Eintrag benötigt eine eindeutige id
      // normalerweise macht das Laravel automatisch. Mit Localstorage müssen wir uns hier händisch etwas ausdenken, dass sich nie wiederholen kann bzw. eher unwahrscheinlich ist -> zufällige Zahl
      postData.id = Math.random();

      // nun fügen wir diesen neuen Post an das Ende all unserer Posts
      allPosts.push(postData);

      // speichere die Daten in localstorage
      // Da localStorage nur "strings" speichern kann und keine echten Javascript Objekte, müssen wir es mit JSON.stringify in einen String verwandeln
      localStorage.setItem("posts", JSON.stringify(allPosts));

      // gib die neu gespeicherten Daten (alle Posts inklusive dem Neuen) an das "Promise" zurück
      return resolve(allPosts);
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
    return new Promise((resolve) => {
      // hol die posts aus localStorage (und verwandel sie mit JSON.parse ) vom String wieder in ein Javascript Objekt
      const posts = JSON.parse(localStorage.getItem("posts"));

      // wenn noch nichts im localstorage ist -> würden wir "null" returnen. Wir wollen hier aber sichergehen, dass immer ein Array zurückgegeben wird. Daher setzen wir es in diesem Fall als leeres Array
      if (!posts) {
        return [];
      }

      // übergib sie mit resolve an das "Promise"
      return resolve(posts);
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
    return new Promise((resolve, reject) => {
      // hol alle posts aus localStorage (und verwandel sie mit JSON.parse ) vom String wieder in ein Javascript Objekt
      const posts = JSON.parse(localStorage.getItem("posts"));

      let theCorrectPost = null;

      // Das hier ist jetzt nur etwas komplexer, da wir hier eigentlich die Arbeit machen, die sonst Laravel machen würden
      // wir müssen aus allen Posts, die wir haben den richtigen Post mit der korrekten id finden
      posts.map((post) => {
        if (post.id == postId) {
          theCorrectPost = post;
        }

        return;
      });

      // falls wir den Post gefunden haben -> löse das Versprechen ein (resolve)
      if (theCorrectPost) {
        resolve(theCorrectPost);
        return;
      }

      // Ansonsten, falls der Post nicht gefunden wurde -> gib einen Fehler zurück
      reject("Der Post " + postId + " wurde nicht gefunden!");
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
    return new Promise((resolve, reject) => {
      // hol alle posts aus localStorage (und verwandel sie mit JSON.parse ) vom String wieder in ein Javascript Objekt
      const posts = JSON.parse(localStorage.getItem("posts"));

      let theCorrectPost = null;

      // Das hier ist jetzt nur etwas komplexer, da wir hier eigentlich die Arbeit machen, die sonst Laravel machen würden
      // wir müssen aus allen Posts, die wir haben den richtigen Post mit der korrekten id finden
      const updatedPosts = posts.map((post) => {
        // falls es der Post ist, den wir haben wollen -> tausche die Daten durch die neuen Datenn aus
        if (post.id == postId) {
          theCorrectPost = newData;
          return newData;
        }

        // ansonsten gib genau den zurück, der auch im Array steht
        return post;
      });

      // speicher das gesamte neue Posts array in localstorage ab
      localStorage.setItem("posts", JSON.stringify(updatedPosts));

      // falls wir den Post gefunden haben -> löse das Versprechen ein (resolve)
      if (theCorrectPost) {
        resolve(theCorrectPost);
        return;
      }

      // Ansonsten, falls der Post nicht gefunden wurde -> gib einen Fehler zurück
      reject("Der Post " + postId + " wurde nicht gefunden!");
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
    return new Promise((resolve) => {
      // hol alle posts aus localStorage (und verwandel sie mit JSON.parse ) vom String wieder in ein Javascript Objekt
      const posts = JSON.parse(localStorage.getItem("posts"));

      // Das hier ist jetzt nur etwas komplexer, da wir hier eigentlich die Arbeit machen, die sonst Laravel machen würden
      // wir müssen aus allen Posts, die wir haben den richtigen Post mit der korrekten id finden und mit Hilfe der "filter" Methode aus dem Array entfernen
      const updatedPosts = posts.filter((post) => {
        return post.id != postId;
      });

      // speicher das gesamte neue Posts array in localstorage ab
      localStorage.setItem("posts", JSON.stringify(updatedPosts));

      resolve(true);
    });
  },
};

export default postDataService;
