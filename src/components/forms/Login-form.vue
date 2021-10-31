<template>
    <div class="login-form-container">
        <h3>Login</h3>
        <form action="#">
            <div class="input-flex">
                <label for="login_email">Email:</label>
                <input
                    type="email"
                    id="login_email"
                    name="login_email"
                    v-model="credentials.email"
                />
            </div>
            <div class="input-flex">
                <label for="login_password">Password:</label>
                <input
                    type="password"
                    id="login_password"
                    name="login_password"
                    v-model="credentials.password"
                />
            </div>
            <SubmitBtn text="Login" :method="loginUser" />
        </form>
    </div>
</template>

<script>
import userDataService from "@/services/userDataService";
import SubmitBtn from "../Partials/SubmitBtn";

export default {
    name: "loginform",
    components: {
        SubmitBtn,
    },
    data: () => ({
        credentials: {},
        loading: false,
        error: null,
        token: null,
        success: false,
        editMode: false,
    }),

    methods: {
        loginUser: function(e) {
            e.preventDefault();
            this.loading = true;

            userDataService
                .login(this.credentials)
                .then((loginData) => {
                    this.success = true;
                    this.token = loginData.token;
                    localStorage.setItem("token", loginData.token);
                    this.loading = false;

                    setTimeout(() => {
                        window.location.href = "/";
                    }, 3000);
                })
                .catch(async (error) => {
                    alert("Error: " + error.response.data.message);
                    this.loading = false;
                });
        },
    },
};
</script>
