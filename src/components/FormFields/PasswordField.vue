<template>
  <div class="flex flex-col text-left mb-8">
    <label :for="name" class="pb-2">{{ label }}</label>
    <input
      :id="name"
      type="password"
      ref="passwordField"
      :placeholder="placeholder"
      v-bind="inputProps"
      :value="value"
      v-on:input="$emit('input', $event.target.value)"
      class="InputField"
    />
  </div>
</template>
<script>
export default {
  name: "FormFieldsPasswordField",
  props: {
    value: {
      required: true,
      type: String,
      default: ""
    },
    label: {
      required: false,
      type: String
    },
    name: {
      required: true,
      type: String
    },
    placeholder: {
      required: false,
      type: String,
      default: ""
    },
    inputProps: {
      required: false,
      type: Object,
      default: () => {}
    }
  }
};
</script>
