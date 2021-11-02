<template>
  <div class="flex flex-col text-left mb-8">
    <label :for="name">{{ label }}</label>
    <input
      :id="name"
      type="text"
      :placeholder="placeholder"
      v-bind="inputProps"
      :value="value"
      v-on:input="$emit('input', $event.target.value)"
      class="rounded-bl p-3 border-pink border-solid"
    />
  </div>
</template>
<script>
export default {
  name: "FormFieldsTextField",
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
    },
    icon: {
      required: false,
      type: String
    }
  }
};
</script>
