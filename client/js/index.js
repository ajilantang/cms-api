
var app = new Vue({

  el    : '#cmsview',
  data  : {
    authenticated       : false,
    registrationStatus  : false,

    //user data

    email                :  '',
    token                :  '',
    letter               :  '',
    password             :  '',

    //session client

    session_email       : '',
    session_letter      : '',
    session_frequency   : ''

  },

  methods : {
    login: function() {
      axios.post('http://localhost:3000/user/login', {
        username: app.username,
        password: app.password
      })
      .then(function(response) {
        if (response.data.username != undefined) {
          localStorage.setItem('authenticated', true)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('session_email', response.data.username)
          app.checkAuth()
          app.clearModel()
        }
      })
      .catch(function(error) {
        console.log(error);
      })
    },
    logout: function() {
      localStorage.removeItem('token')
      localStorage.removeItem('session_email')
      localStorage.removeItem('authenticated')

      app.authenticated = false;
      app.session_email = '';
      app.token = '';
    },
    register: function() {
      axios.post('http://localhost:3000/user/register',{
        username: app.username,
        password: app.password
      })
      .then(function(response) {
        localStorage.setItem('registrationStatus', true)
      })
      .catch(function(error) {
        console.log(error);
      })
    },
    checkAuth: function() {

      app.authenticated = localStorage.getItem('authenticated')
      app.token = localStorage.getItem('token')
      app.ses_username = localStorage.getItem('session_email')

    },
    clearModel: function(){
      app.name = '';
      app.username = '';
      app.letter = '';
      app.email = '';
      app.password = '';
    }
  }
})


app.checkAuth();
