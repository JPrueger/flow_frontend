<template>
  <div class="mx-auto text-left relative">
    <h1 v-if="headline">{{ headline }}</h1>
    <div v-if="subheadline" class="pl-11 text-left">{{ subheadline }}</div>
    <div class="flex justify-between shadow p-11 rounded mt-6">
      <form @submit.prevent="$emit('input', fieldValues)" class="w-64 mr-10">
        <div v-for="field in fields" :key="field.name">
          <keep-alive>
            <Component :is="getComponent(field.type)" v-bind="field" v-model="value[field.name]" />
          </keep-alive>
        </div>
        <input type="submit" :value="submitButton" class="Button" />
      </form>
      <svg class="absolute -bottom-6 -left-6" xmlns="http://www.w3.org/2000/svg" width="70.47" height="68.074"><g data-name="Gruppe 61" fill="none" stroke="#ffb319" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"><g data-name="Gruppe 37"><path data-name="Pfad 27" d="M56.139 32.711c5.135 4.624-3.95 12.932 2.603 18.832"/><path data-name="Pfad 28" d="M34.533 13.258c5.136 4.623-3.948 12.932 2.603 18.831"/><path data-name="Pfad 29" d="M56.139 32.711c-5.136-4.624-12.45 5.278-19.003-.622"/><path data-name="Pfad 31" d="M34.533 13.258c-5.135-4.624-12.448 5.279-19.001-.622"/></g><g data-name="Gruppe 38"><path data-name="Pfad 27" d="M44.139 45.711c5.135 4.624-3.95 12.932 2.603 18.832"/><path data-name="Pfad 28" d="M22.533 26.258c5.136 4.623-3.948 12.932 2.603 18.831"/><path data-name="Pfad 29" d="M44.139 45.711c-5.136-4.624-12.45 5.278-19.003-.622"/><path data-name="Pfad 31" d="M22.533 26.258c-5.135-4.624-12.448 5.279-19.001-.622"/></g></g></svg>
      <div>
        <div class="slider-container">
          <ul class="slider" :style="styleObject">
            <li class="slide slide--image">
              <img src="@/assets/images/placeholder-dragon.png" alt="">
                <div class="mt-5 text-center">
                  <label class="ml-2 container" for="dragon">
                    Choose this character
                    <input type="checkbox" id="dragon" name="subscribe" value="1">
                    <span class="checkmark"></span>
                  </label>
                </div>
            </li>
            <li class="slide slide--image">
              <img src="@/assets/images/placeholder-ghost.png" alt="">
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
      </div>
    </div>
  </div>
</template>
<script>
import { formFieldComponents } from "@/data/formFields.js";

export default {
  data() {
    return {
      fieldValues: {},
      activeSlide: 1
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
    }
  },
  watch: {
    value(newVal) {
      this.fieldValues = newVal;
    }
  }
};
</script>
