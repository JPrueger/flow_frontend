<template>
    <div>
        <h1>Test Headline</h1>
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Me",
    data: () => {
      return {
        user: "",
      };
    },
  methods: {
    getUser() {
      axios
        .get(
          "http://flow_backend.local/api/user/me"
        )
        .then((res) => {
          console.log(res.data);
          this.user = res.data;
      });
    },
  },
  created() {
    this.getUser();
  },
};
</script>
