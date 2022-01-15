import axios from 'axios'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'
import "./index.css";
import Embed from 'v-video-embed'
import vueVimeoPlayer from 'vue-vimeo-player';
import Main from './assets/styles/main.scss';
import Multiselect from 'vue-multiselect';
import Toasted from 'vue-toasted';
import VueTailwind from 'vue-tailwind';

import RegisterForm from "@/components/RegisterForm/RegisterForm.vue";

const components = {
  RegisterForm
}

Vue.component('multiselect', Multiselect);
Vue.use(vueVimeoPlayer);
Vue.use(Embed);
Vue.use(Main);
Vue.use(Toasted);
Vue.use(VueTailwind, components);

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
