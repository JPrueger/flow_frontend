<template>
    <div>
        <h1>Test Headline</h1>
        <login-form />
    </div>
</template>

<script>
import LoginForm from '../components/forms/Login-form.vue'

export default {
  name: 'App',
  components: {
    LoginForm,
  }
}
</script>
