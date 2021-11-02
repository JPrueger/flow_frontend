<template>
  <div class="shadow lg:w-1/2 p-11 rounded mx-auto">
    <h1 class="font-bold text-4xl mb-6" v-if="headline">{{ headline }}</h1>
    <form @submit.prevent="$emit('input', fieldValues)">
      <div v-for="field in fields" :key="field.name">
        <keep-alive>
          <Component :is="getComponent(field.type)" v-bind="field" v-model="value[field.name]" />
        </keep-alive>
      </div>
      <div class="bg-pink text-white rounded p-2">
        <input type="submit" :value="submitButton" class="bg-pink" />
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
