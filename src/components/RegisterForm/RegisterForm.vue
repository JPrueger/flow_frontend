<template>
  <div class="mx-auto text-left relative">
    <h1 v-if="headline">{{ headline }}</h1>
    <p v-if="subheadline" class="text-left">{{ subheadline }}</p>
    <div class="flex justify-between Registration Form mt-5">
      <form @submit.prevent class="flex">
        <div class="w-64 mr-6">
          <div>
            <div class="flex flex-col text-left mb-8" type="text">
              <label for="title" class="pb-2">name *</label
              ><input
                v-model="newUser.name"
                id="name"
                type="text"
                placeholder="doe"
                required="required"
                maxlength="255"
                class="InputField"
              />
            </div>
          </div>
          <div>
            <div class="flex flex-col text-left mb-8" type="text">
              <label for="description" class="pb-2">E-Mail Address *</label
              ><input
                id="email"
                v-model="newUser.email"
                type="text"
                placeholder="john.doe@gmail.com"
                required="required"
                maxlength="500"
                class="InputField"
              />
            </div>
          </div>
          <div>
            <div class="flex flex-col text-left mb-8" type="text">
              <label for="description" class="pb-2">Character Name *</label
              ><input
                id="characterName"
                v-model="newUser.characterName"
                type="text"
                placeholder="Casper"
                required="required"
                maxlength="500"
                class="InputField"
              />
            </div>
          </div>
          <div>
            <div class="flex flex-col text-left mb-8 relative" type="text">
              <label for="description" class="pb-2">Password *</label
              ><input
                id="password"
                ref="passwordField"
                v-model="newUser.password"
                type="password"
                placeholder="********"
                required="required"
                maxlength="500"
                class="InputField"
              />
              <button @click="togglePassword">
                <svg class="eye-icon absolute top-10 right-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M320 256a64 64 0 1 1-64-64 64.07 64.07 0 0 1 64 64Zm189.81 9.42C460.86 364.89 363.6 426.67 256 426.67S51.14 364.89 2.19 265.42a21.33 21.33 0 0 1 0-18.83C51.14 147.11 148.4 85.33 256 85.33s204.86 61.78 253.81 161.25a21.33 21.33 0 0 1 0 18.84ZM362.67 256A106.67 106.67 0 1 0 256 362.67 106.79 106.79 0 0 0 362.67 256Z"/></svg>
              </button>
            </div>
          </div>
        </div>
        <div>
          <div class="slider-container">
            <ul class="slider" :style="styleObject">
              <li class="slide slide--image">
                <img src="@/assets/images/dragon.png" alt="">
                  <div class="mt-5 text-center">
                    <label class="ml-2 container" for="dragon">
                      Choose this character
                      <input type="checkbox" id="dragon" name="subscribe" value="1">
                      <span class="checkmark"></span>
                    </label>
                  </div>
              </li>
              <li class="slide slide--image">
                <img src="@/assets/images/ghost.png" alt="">
                  <div class="mt-5 text-center">
                    <label class="ml-2 container" for="ghost">
                      Choose this character
                      <input type="checkbox" id="ghost" name="subscribe" value="2">
                      <span class="checkmark"></span>
                    </label>
                  </div>
              </li>
            </ul>
          </div>
          <ul class="navigate">
            <li @click="changeSlide(1)">1</li>
            <li @click="changeSlide(2)">2</li>
          </ul>
          <div class="grid">
            <input type="submit" @click="saveUser()" value="Submit!" class="Button justify-self-center mt-4" />
          </div>
        </div>
      </form>
      <svg class="absolute -bottom-7 -left-7 form-shape" xmlns="http://www.w3.org/2000/svg" width="70.47" height="68.074"><g data-name="Gruppe 61" fill="none" stroke="#ffb319" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"><g data-name="Gruppe 37"><path data-name="Pfad 27" d="M56.139 32.711c5.135 4.624-3.95 12.932 2.603 18.832"/><path data-name="Pfad 28" d="M34.533 13.258c5.136 4.623-3.948 12.932 2.603 18.831"/><path data-name="Pfad 29" d="M56.139 32.711c-5.136-4.624-12.45 5.278-19.003-.622"/><path data-name="Pfad 31" d="M34.533 13.258c-5.135-4.624-12.448 5.279-19.001-.622"/></g><g data-name="Gruppe 38"><path data-name="Pfad 27" d="M44.139 45.711c5.135 4.624-3.95 12.932 2.603 18.832"/><path data-name="Pfad 28" d="M22.533 26.258c5.136 4.623-3.948 12.932 2.603 18.831"/><path data-name="Pfad 29" d="M44.139 45.711c-5.136-4.624-12.45 5.278-19.003-.622"/><path data-name="Pfad 31" d="M22.533 26.258c-5.135-4.624-12.448 5.279-19.001-.622"/></g></g></svg>
      <!-- <form @submit.prevent="$emit('input', fieldValues)" class="w-64 mr-10">
        <div v-for="field in fields" :key="field.name">
          <keep-alive>
            <Component :is="getComponent(field.type)" v-bind="field" v-model="value[field.name]" />
          </keep-alive>
        </div>
        <input type="submit" :value="submitButton" class="Button" />
      </form>
      <svg class="absolute -bottom-7 -left-7 form-shape" xmlns="http://www.w3.org/2000/svg" width="70.47" height="68.074"><g data-name="Gruppe 61" fill="none" stroke="#ffb319" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"><g data-name="Gruppe 37"><path data-name="Pfad 27" d="M56.139 32.711c5.135 4.624-3.95 12.932 2.603 18.832"/><path data-name="Pfad 28" d="M34.533 13.258c5.136 4.623-3.948 12.932 2.603 18.831"/><path data-name="Pfad 29" d="M56.139 32.711c-5.136-4.624-12.45 5.278-19.003-.622"/><path data-name="Pfad 31" d="M34.533 13.258c-5.135-4.624-12.448 5.279-19.001-.622"/></g><g data-name="Gruppe 38"><path data-name="Pfad 27" d="M44.139 45.711c5.135 4.624-3.95 12.932 2.603 18.832"/><path data-name="Pfad 28" d="M22.533 26.258c5.136 4.623-3.948 12.932 2.603 18.831"/><path data-name="Pfad 29" d="M44.139 45.711c-5.136-4.624-12.45 5.278-19.003-.622"/><path data-name="Pfad 31" d="M22.533 26.258c-5.135-4.624-12.448 5.279-19.001-.622"/></g></g></svg> -->
    </div>
  </div>
</template>
<script>
import { formFieldComponents } from "@/data/formFields.js";
import axios from "axios";

export default {
  data() {
    return {
      fieldValues: {},
      activeSlide: 1,
      newUser: {
        name: "",
        email: "",
        password: "",
        characterName: "",
      },
    };
  },
  props: {
    value: {
      type: Object,
      required: true
    },
    headline: {
      type: String,
      required: false
    },
    subheadline: {
      type: String,
      required: false
    },
    submitButton: {
      type: String,
      required: false,
      default: "Anmelden"
    },
    fields: {
      type: Array,
      required: true
    }
  },
  computed: {
    styleObject: function() {
      const width = 0 - ((this.activeSlide-1) * 400)
      return {
        transform: 'translateX('+width+'px)'
      }
    }
  },
  created() {
    this.fieldValues = this.value;
  },
  methods: {
    getComponent(name) {
      return formFieldComponents[name] ?? null;
    },
    changeSlide: function(num) {
      this.activeSlide = num
    },
    nextSlide: function() { 
      if(this.activeSlide < 2) this.activeSlide++
    },
    prevSlide: function() {
      if(this.activeSlide > 1) this.activeSlide--
    },
    togglePassword() {
      let passwordField = this.$refs.passwordField;
      if (passwordField.getAttribute('type') === 'password')
        passwordField.setAttribute('type', 'text');
      else passwordField.setAttribute('type', 'password');
    },
    saveUser() {
      axios
        .post("http://flow_backend.local/api/user/register", this.newUser)
        .then(() => {
          this.$toasted.show('Hey there! Successfully registered.', {
            duration: 5000,
            type: 'success',
            position: 'top-center',
          });
        })
        .then(() => {
          this.succesSignin = true;
        })
        .catch(() => {
          this.$toasted.show('Seems like something went wrong. Please try again!', {
            duration: 5000,
            type: 'error',
            position: 'top-center',
          });
        });
    },
  },
  watch: {
    value(newVal) {
      this.fieldValues = newVal;
    }
  }
};
</script>

<style lang="scss">
.Registration.Form {
  max-width: unset;
}

.eye-icon {
  fill: #99154E;
  @apply h-4 w-4;
}
</style>
