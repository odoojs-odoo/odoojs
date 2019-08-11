import mrp_bom from './mrp_bom';
import mrp_document from './mrp_document';
import mrp_production from './mrp_production';
import mrp_routing from './mrp_routing';
import mrp_unbuild from './mrp_unbuild';
import mrp_workcenter from './mrp_workcenter';

import product from './product';

export default {
  name: 'mrp',
  depends: [
    'product',
    'stock', //'resource'
  ],

  models: {
    ...mrp_bom.models,
    ...mrp_document.models,
    ...mrp_production.models,
    ...mrp_routing.models,
    ...mrp_unbuild.models,
    ...mrp_workcenter.models,

    ...product.models,
  },
};
