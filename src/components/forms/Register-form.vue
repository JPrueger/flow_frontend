<template>
    <div class="signin-form-container">
        <h1>Register:</h1>
        <form action="#">
            <div class="input-flex">
                <label for="signin_username">Username:</label>
                <input
                    type="text"
                    id="signin_username"
                    v-model="newUser.username"
                    name="sigin_username"
                />
            </div>
            <div class="input-flex">
                <label for="signin_email">Email:</label>
                <input
                    type="email"
                    id="signin_email"
                    v-model="newUser.email"
                    name="signin_email"
                />
            </div>
            <div class="input-flex">
                <label for="signin_password">Password:</label>
                <input
                    type="password"
                    id="signin_password"
                    v-model="newUser.password"
                    name="signin_password"
                />
            </div>
            <button type="submit">Submit!</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "",
    data: () => {
        return {
            newUser: {
                username: "",
                email: "",
                password: "",
                password_confirmation: "",
                is_admin: "0",
            },

            errors: [],

            succesSignin: false,

            showSubmit: true,

            loader: false,
        };
    },

    methods: {
        saveUser() {
            axios
                .post("http://api.ipito.local/api/user/register", this.newUser)
                .then(() => {
                    this.succesSignin = true;
                    this.loader = false;
                    this.showSubmit = true;
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 3000);
                })
                .catch((err) => {
                    this.errors = err.response.data.errors;
                    this.loader = false;
                    this.showSubmit = true;
                });
        },

        showLoader() {
            this.loader = true;
            this.showSubmit = false;
        },
    },
};
</script>
