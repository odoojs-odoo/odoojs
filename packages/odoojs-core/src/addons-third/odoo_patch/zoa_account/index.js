import account from './account';

export default {
  name: 'zoa_account',
  depends: ['account'],
  models: {
    ...account.models,
  },
};
