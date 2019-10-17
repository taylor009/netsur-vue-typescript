import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme:{
    dark: true,
    themes:{
      dark: {
        // primary: '#15315A',
        primary: '#0088CC',
        secondary: '#3DB4E5',
        accent: '#6D3B5D',
        error: '#EA4F3D',
        info: '#FDDA63',
        success: '#6EBF4B',
        warning: '#F68D2D',
        muted:'#B9B9B9',
        ns_navydark: '#0B1E3F',
        ns_blue: '#6699CC',
        ns_linkblue: '#0088CC',
        ns_darkgrey:'#55555A',
        ns_bluehex:'#003366',
        ns_bluehex_inset:'07254c'
      }
    }
  },
  icons: {
    iconfont: 'mdi',
  },
});
