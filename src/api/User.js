import Api from './Api';

const token = JSON.stringify({"accessToken": localStorage.getItem('token')});

export const User = {
  register(form) {
    return Api().post('/register', form);
  },

  login(form) {
    return Api().post('/login', form);
  },

  rate() {
    return Api().post('/rates', token);
  },
  userdata() {
    return Api().post('/getUser', token);
  },

};
