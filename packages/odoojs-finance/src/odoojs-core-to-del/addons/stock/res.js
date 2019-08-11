export default {
  models: {
    'res.company': {
      fields: ['propagation_minimum_delta', 'internal_transit_location_id'],
    },

    'res.partner': {
      fields: ['property_stock_customer', 'property_stock_supplier'],
    },
  },
};
