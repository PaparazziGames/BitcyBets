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
  predictUp(value) {
    return Api().post('/predictUp', JSON.stringify(({...{"accessToken": localStorage.getItem('token')}, ...value})));
  },
  predictDown(value) {
    return Api().post('/predictDown', JSON.stringify(({...{"accessToken": localStorage.getItem('token')}, ...value})));
  },
  changeWallet() {
    return Api().post('/changeDemo', token);
  },

};
