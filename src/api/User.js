import Api from './Api';


export const User = {
  register(form) {
    return Api().post('/register', form);
  },

  login(form) {
    return Api().post('/login', form);
  },

  rate() {
    return Api().post('/rates', JSON.stringify({"accessToken": localStorage.getItem('token')}));
  },
  userdata() {
    return Api().post('/getUser', JSON.stringify({"accessToken": localStorage.getItem('token')}));
  },
  predictUp(value) {
    return Api().post('/predictUp', JSON.stringify(({...{"accessToken": localStorage.getItem('token')}, ...value})));
  },
  predictDown(value) {
    return Api().post('/predictDown', JSON.stringify(({...{"accessToken": localStorage.getItem('token')}, ...value})));
  },

};
