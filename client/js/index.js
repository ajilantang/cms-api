
var app = new Vue({

  el    : '#cmsview',
  data  : {
    authenticated       : false,
    registrationStatus  : false,

    //user data

    username                :  '',
    token                :  '',
    letter               :  '',
    password             :  '',

    //session client

    session_username       : '',
    session_letter      : '',
    session_frequency   : ''

  },

  methods : {
    login: function() {
      axios.post('http://localhost:3000/users/login', {
        username: app.username,
        password: app.password
      })
      .then(function(response) {
        if (response.data.username != undefined) {
          localStorage.setItem('authenticated', true)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('session_username', response.data.username)
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
      localStorage.removeItem('session_username')
      localStorage.removeItem('authenticated')

      app.authenticated = false;
      app.session_username = '';
      app.token = '';
      app.clearModel()
    },
    register: function() {
      axios.post('http://localhost:3000/users/register',{
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
      app.ses_username = localStorage.getItem('session_username')

    },
    clearModel: function(){
      app.name = '';
      app.username = '';
      app.letter = '';
      app.username = '';
      app.password = '';
    }
  }
})


app.checkAuth();
