<template>
  <div>
    <h2 v-if="headline">{{ headline }}</h2>
    <form @submit.prevent="$emit('input', fieldValues)">
      <div v-for="field in fields" :key="field.name">
        <keep-alive>
          <Component
            :is="getComponent(field.type)"
            v-bind="field"
            v-model="value[field.name]"
          />
        </keep-alive>
      </div>
      <div>
        <input type="submit" :value="submitButton" />
      </div>
    </form>
</div>
</template>
<script>
import { formFieldComponents } from "@/data/formFields.js";

export default {
  data() {
    return {
      fieldValues: {},
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
      required: true,
    },
  },
  created() {
    this.fieldValues = this.value;
  },
  methods: {
    getComponent(name) {
      return formFieldComponents[name] ?? null;
    },
  },
  watch: {
    value(newVal) {
      this.fieldValues = newVal;
    },
  },
};
</script>
