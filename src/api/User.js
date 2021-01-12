import Api from './Api';

export const User = {
  register(form) {
    return Api().post('/register', form);
  },

  login(form) {
    return Api().post('/login', form);
  },

  auth() {
    return Api().get('/user');
  }
};
