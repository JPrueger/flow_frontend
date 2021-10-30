<template>
    <div class="signin-form-container">
        <h1>Register:</h1>
        <form action="#">
            <div class="input-flex">
                <label for="signin_name">name:</label>
                <input
                    type="text"
                    id="signin_name"
                    v-model="newUser.name"
                    name="sigin_name"
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
            <SubmitBtn
                text="Login"
                :method="saveUser"
            />       
        </form>
    </div>
</template>

<script>
import SubmitBtn from "../Partials/SubmitBtn";
import axios from "axios";

export default {
  props: {
  },
    name: "",
    components: {
        SubmitBtn,
    },
    data: () => {
        return {
            newUser: {
                name: "",
                email: "",
                password: "",
            },
            errors: [],
            succesSignin: false,
        };
    },

    methods: {
        saveUser() {
            console.log('clicked');
            axios
                .post("http://flow_backend.local/api/user/register", this.newUser)
                .then((response) => {
                    console.log('test hier rein?', this.newUser);
                    console.log('noch mal mikado: ', response);
                    alert("Speichern erfolgreich");
                })
                .then(() => {
                    this.succesSignin = true;
                    // setTimeout(() => {
                        //     window.location.href = "/";
                    // }, 3000);
                })
                // .catch(() => {
                .catch((err) => {
                    alert("Speichern nicht erfolgreich");
                    this.errors = err.response.data.errors;
                    console.log(this.errors);
                });
        },
    },
};
</script>
