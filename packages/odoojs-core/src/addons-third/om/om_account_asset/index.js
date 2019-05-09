import account_asset from './account_asset';

export default {
  name: 'account_asset',
  depends: ['account'],
  models: {
    ...account_asset.models,
  },
};
