<template>
  <div class="lg:w-1/2 mx-auto text-left">
    <h1 class="pl-11 font-bold text-4xl mb-6" v-if="headline">{{ headline }}</h1>
    <div v-if="subheadline" class="pl-11 text-left">{{ subheadline }}</div>
    <form @submit.prevent="$emit('input', fieldValues)" class="shadow p-11 rounded mt-6">
      <div v-for="field in fields" :key="field.name">
        <keep-alive>
          <Component :is="getComponent(field.type)" v-bind="field" v-model="value[field.name]" />
        </keep-alive>
      </div>
      <div class="bg-pink text-white rounded p-2 text-center">
        <input type="submit" :value="submitButton" class="bg-pink font-bold" />
      </div>
    </form>
  </div>
</template>
<script>
import { formFieldComponents } from "@/data/formFields.js";

export default {
  data() {
    return {
      fieldValues: {}
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
  created() {
    this.fieldValues = this.value;
  },
  methods: {
    getComponent(name) {
      return formFieldComponents[name] ?? null;
    }
  },
  watch: {
    value(newVal) {
      this.fieldValues = newVal;
    }
  }
};
</script>
