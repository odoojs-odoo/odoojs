export default {
  name: 'base_address_city',
  depends: [],
  models: {
    'res.country': {
      fields: ['enforce_cities'],
    },

    'res.city': {
      fields: ['name', 'zipcode', 'country_id', 'state_id'],
    },

    'res.partner': {
      fields: ['country_enforce_cities', 'city_id'],
    },
  },
};
