export default {
  name: 'ow_account',
  depends: ['account'],

  models: {
    'account.account': {
      fields: ['general_code', 'general_name', 'sub_type'],
    },

    'account.account.tag': {
      fields: [
        'code',
        'type',
        'account_codes',
        'group_num',
        'code4',
        'sign',
        'gt_one_year',
      ],
    },
  },
};
