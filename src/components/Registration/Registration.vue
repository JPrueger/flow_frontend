<template>
  <div>
    <div class="flex">
      <RegisterForm
        v-model="newUser"
        @input="saveUser"
        headline="Hey there!"
        subheadline="Good seeing you. Tell us your details and choose a character to get you started into flow."
        submitButton="Submit!"
        :responseState="response"
        :fields="fields"
        class="mb-4"
      />
    </div>
    <p class="text-center">
      Already registered?
      <router-link to="/login" class="text-center Link">Login here!</router-link>
    </p>
  </div>
</template>
<script>
import RegisterForm from "../RegisterForm/RegisterForm.vue";

export default {
  components: {
    RegisterForm,
  },
  data() {
    return {
      formData: {},
      response: {},
      errors: [],
      succesSignin: false,
      activeSlide: 1
    };
  },
  computed: {
    styleObject: function() {
      const width = 0 - ((this.activeSlide-1) * 400)
      return {
        transform: 'translateX('+width+'px)'
      }
    }
  },
  methods: {
    changeSlide: function(num) {
      this.activeSlide = num
    },
    nextSlide: function() { 
      if(this.activeSlide < 2) this.activeSlide++
    },
    prevSlide: function() {
      if(this.activeSlide > 1) this.activeSlide--
    }
  },
};
</script>