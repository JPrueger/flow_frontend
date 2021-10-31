<template>
    <div>
        <h1>Test Headline</h1>
        <register-form />
    </div>
</template>

<script>
import RegisterForm from '../components/forms/Register-form.vue'

export default {
  name: 'App',
  components: {
    RegisterForm,
  }
}
</script>
