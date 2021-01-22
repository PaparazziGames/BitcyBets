import Api from './Api';

const token = {"accessToken": localStorage.getItem('token')};

export const User = {
  register(form) {
    return Api().post('/register', form);
  },

  login(form) {
    return Api().post('/login', form);
  },

  rate() {
    return Api().post('/rates', JSON.stringify(token));
  },
  userdata() {
    return Api().post('/getUser', JSON.stringify(token));
  },
  predictUp(value) {
      console.log(JSON.stringify(({...token, ...value})))
    return Api().post('/game/predictUp', JSON.stringify(({...token, ...value})));
  },
  predictDown(value) {
    return Api().post('/game/predictDown', JSON.stringify(({...token, ...value})));
  },

};
