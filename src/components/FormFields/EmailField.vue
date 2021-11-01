<template>
  <div>
    <label :for="name">{{ label }}</label>
    <input
      :id="name"
      type="email"
      :placeholder="placeholder"
      v-bind="inputProps"
      :value="value"
      v-on:input="$emit('input', $event.target.value)"
    />
  </div>
</template>
<script>
export default {
  name: 'FormFieldsEmailField',
  props: {
    value: {
      required: true,
      type: String,
      default: '',
    },
    label: {
      required: false,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
    placeholder: {
      required: false,
      type: String,
      default: '',
    },
    inputProps: {
      required: false,
      type: Object,
      default: () => {},
    },
  },
};
</script>
