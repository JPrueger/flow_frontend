<template>
  <div class="mx-auto text-left relative">
    <h1 v-if="headline">{{ headline }}</h1>
    <p v-if="subheadline" class="text-left Subheadline">{{ subheadline }}</p>
    <div v-if="easterEggActive" class="my-4 Container--easteregg">
      <h1 class="mb-1">Titankiller!?</h1>
      <h3 class="mb-5">Das kann nur jmd bestimmtes sein! :D</h3>
      <p>Wunderbärchen, dass du dich anmeldest. <strong>Danke(!)</strong> nochmal Alex für deine Unterstützung in unserem Projekt. Ohne dich wär es nur halb-so-lustig, und vermutlich auch nur halb-so-fertig geworden. Ein kleiner (sneaky) Screenshot von unserer ersten Datenbank Struktur Session (wo wir alle schon sichtlich müde waren haha) & jetzt ist schon alles live! Wohooo! :)</p>
      <img class="Wunderbaerchen my-3" src="@/assets/images/alex.png" alt="easteregg alex">
    </div>
    <div class="Registration shadow p-6 rounded bg-white mt-5">
      <form @submit.prevent class="Registration--form">
        <div class="Register--Inputs">
          <div>
            <div class="flex flex-col text-left mb-8" type="text">

              <span v-if="v$.newUser.name.$error" class="text-pink-main font-medium text-sm">
                    {{ v$.newUser.name.$errors[0].$message }}
              </span>

              <label for="name" class="pb-2">Name *</label
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

              <span v-if="v$.newUser.email.$error" class="text-pink-main font-medium text-sm">
                    {{ v$.newUser.email.$errors[0].$message }}
              </span>

              <label for="email" class="pb-2">E-Mail Address *</label
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
              <span v-if="v$.newUser.characterName.$error" class="text-pink-main font-medium text-sm">
                    {{ v$.newUser.characterName.$errors[0].$message }}
              </span>
              <label for="characterName" class="pb-2">Character Name *</label
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
              <span v-if="v$.newUser.password.$error" class="text-pink-main font-medium text-sm">
                    {{ v$.newUser.password.$errors[0].$message }}
              </span>

              <label for="password" class="pb-2">Password *</label
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
                <svg
                  class="eye-icon absolute top-10 right-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M320 256a64 64 0 1 1-64-64 64.07 64.07 0 0 1 64 64Zm189.81 9.42C460.86 364.89 363.6 426.67 256 426.67S51.14 364.89 2.19 265.42a21.33 21.33 0 0 1 0-18.83C51.14 147.11 148.4 85.33 256 85.33s204.86 61.78 253.81 161.25a21.33 21.33 0 0 1 0 18.84ZM362.67 256A106.67 106.67 0 1 0 256 362.67 106.79 106.79 0 0 0 362.67 256Z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div class="grid Submit--button">
            <input
              type="submit"
              @click="saveUser()"
              value="Submit!"
              class="Button justify-self-start mt-1"
            />
          </div>
        </div>
        <div class="Character--picker">
          <label class="Label--character pb-2">Pick a character *</label>
          <div class="slider-container">
            <ul class="slider" :style="styleObject">
              <li class="slide slide--image">
                <video src="@/assets/videos/dragon.mp4" type="video/mp4" autoplay="true" loop="true" muted  />
                <div class="mt-1 text-center">
                  <label class="ml-2 container" for="dragon">
                    Dragon
                    <input
                      v-model="newUser.characterId"
                      type="radio"
                      id="dragon"
                      name="subscribe"
                      value="1"
                    />
                    <span class="checkmark"></span>
                  </label>
                </div>
              </li>
              <li class="slide slide--image">
                <video src="@/assets/videos/ghost.mp4" type="video/mp4" autoplay="true" loop="true" muted  />
                <div class="mt-2 text-center">
                  <label class="ml-2 container" for="ghost">
                    Ghost
                    <input
                      v-model="newUser.characterId"
                      type="radio"
                      id="ghost"
                      name="subscribe"
                      value="2"
                    />
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
        </div>
      </form>
      <svg
        class="absolute -bottom-7 -left-7 form-shape"
        xmlns="http://www.w3.org/2000/svg"
        width="70.47"
        height="68.074"
      >
        <g
          data-name="Gruppe 61"
          fill="none"
          stroke="#ffb319"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="5"
        >
          <g data-name="Gruppe 37">
            <path
              data-name="Pfad 27"
              d="M56.139 32.711c5.135 4.624-3.95 12.932 2.603 18.832"
            />
            <path
              data-name="Pfad 28"
              d="M34.533 13.258c5.136 4.623-3.948 12.932 2.603 18.831"
            />
            <path
              data-name="Pfad 29"
              d="M56.139 32.711c-5.136-4.624-12.45 5.278-19.003-.622"
            />
            <path
              data-name="Pfad 31"
              d="M34.533 13.258c-5.135-4.624-12.448 5.279-19.001-.622"
            />
          </g>
          <g data-name="Gruppe 38">
            <path
              data-name="Pfad 27"
              d="M44.139 45.711c5.135 4.624-3.95 12.932 2.603 18.832"
            />
            <path
              data-name="Pfad 28"
              d="M22.533 26.258c5.136 4.623-3.948 12.932 2.603 18.831"
            />
            <path
              data-name="Pfad 29"
              d="M44.139 45.711c-5.136-4.624-12.45 5.278-19.003-.622"
            />
            <path
              data-name="Pfad 31"
              d="M22.533 26.258c-5.135-4.624-12.448 5.279-19.001-.622"
            />
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import useVuelidate from '@vuelidate/core';
import { required, email,helpers } from '@vuelidate/validators';

export default {
  setup () {
    return {
      v$: useVuelidate(),
      newUser: {
        name: "",
        email: "",
      },
    }
  },
  data() {
    return {
      fieldValues: {},
      activeSlide: 1,
      newUser: {
        name: "",
        email: "",
        password: "",
        characterName: "",
        characterId: 1,
      },
      easterEggActive: false,
      search: 'titankiller',
    };
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
    headline: {
      type: String,
      required: false,
    },
    subheadline: {
      type: String,
      required: false,
    },
    submitButton: {
      type: String,
      required: false,
      default: "Anmelden",
    },
    fields: {
      type: Array,
      required: false,
    },
  },

  validations () {
    return {
      newUser: {
        name: {
          required: helpers.withMessage('Please enter a username', required)
        },
        email: {
          required: helpers.withMessage('Please enter a email', required),
          email
        },
        characterName: {
          required: helpers.withMessage('Please give your character a name', required)
        },
        password: {
          required: helpers.withMessage('Please enter a password', required)
        },
      }
    }
  },
  computed: {
    /**
     * Styles width of slider for chosing between the two characters.
     */
    styleObject: function () {
      const width = 0 - (this.activeSlide - 1) * 400;
      return {
        transform: "translateX(" + width + "px)",
      };
    },
  },
  created() {
    this.fieldValues = this.value;
  },
  methods: {
    /**
     * Functionality to add scroll behaviour to slider.
     */
    changeSlide: function (num) {
      this.activeSlide = num;
    },
    nextSlide: function () {
      if (this.activeSlide < 2) this.activeSlide++;
    },
    prevSlide: function () {
      if (this.activeSlide > 1) this.activeSlide--;
    },

    /**
     * Toggles visiblity of Password.
     */
    togglePassword() {
      let passwordField = this.$refs.passwordField;
      if (passwordField.getAttribute("type") === "password")
        passwordField.setAttribute("type", "text");
      else passwordField.setAttribute("type", "password");
    },

    /**
     * Saves created user to database.
     */
    saveUser() {
      this.v$.$validate() // checks all inputs
      if (!this.v$.$error) {
        // submit form when there are no errors occurring
        axios
          .post(`${process.env.VUE_APP_API_URL}/user/register`, this.newUser)
          .then(() => {
            this.$toasted.show("Hey there! Successfully registered.", {
              duration: 5000,
              type: "success",
              position: "top-center",
            });
          })
          .then(() => {
            this.succesSignin = true;
          })
          .then(() => {
            this.$router.push("/login");
          })
          .catch(() => {
            this.$toasted.show(
              "Seems like something went wrong. Please try again!",
              {
                duration: 5000,
                type: "error",
                position: "top-center",
              }
            );
          });
      }
    },
  },
  /**
   * Check if alex :D has written search string "titankiller" somewhere
   */
  updated() {
    if(
      this.newUser.name.toLowerCase().includes(this.search.toLowerCase()) ||
      this.newUser.email.toLowerCase().includes(this.search.toLowerCase()) ||
      this.newUser.characterName.toLowerCase().includes(this.search.toLowerCase())
    ) {
      return this.easterEggActive = true;
    }
  },
  watch: {
    value(newVal) {
      this.fieldValues = newVal;
    },
  },
};
</script>

<style lang="scss">
.Registration.Form {
  max-width: unset;
}

.eye-icon {
  fill: #99154e;
  @apply h-4 w-4;
}

.Wunderbaerchen {
  @apply rounded;
}

.Subheadline {
  max-width: 70%;
}

.Container--easteregg {
  width: 810px;
  border-top: 1px solid lightgray;
  @apply pt-5;
}

@media screen and (max-width: 766px) {
  .Registration {
    @apply relative;
  }

  .Submit--button {
    width: 80%;
    @apply absolute bottom-6;
  }

  .Character--picker {
    @apply mt-8 mb-16;  
  }
}

@media screen and (min-width: 767px) {
  .Registration--form {
    @apply flex justify-between;
  }

  .Register--Inputs {
    @apply w-64 mr-6; 
  }

  .Label--character {
    @apply pl-6;
  }

  .Character--picker {
    @apply mt-0;
  }

  .Subheadline {
    max-width: unset;
  }
}
</style>
