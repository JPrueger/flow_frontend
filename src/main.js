import axios from 'axios'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'
import "./index.css";

// import input fields globablly for dynamic forms
import TextField from '@/components/FormFields/TextField.vue';
import PasswordField from '@/components/FormFields/PasswordField.vue';
import EmailField from '@/components/FormFields/EmailField.vue';
Vue.component('FormFieldsTextField', TextField)
Vue.component('FormFieldsPasswordField', PasswordField)
Vue.component('FormFieldsEmailField', EmailField)

Vue.config.productionTip = false
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD.MM.YYYY')
  }
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


axios.defaults.withCredentials = false
