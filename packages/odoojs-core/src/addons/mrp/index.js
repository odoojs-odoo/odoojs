import mrp_production from './mrp_production';
import mrp_unbuild from './mrp_unbuild';
import mrp_workcenter from './mrp_workcenter';
import mrp_workorder from './mrp_workorder';

export default {
  name: 'mrp',
  depends: [
    'product',
    'stock', //'resource'
  ],

  models: {
    ...mrp_production.models,
    ...mrp_unbuild.models,
    ...mrp_workcenter.models,
    ...mrp_workorder.models,
  },
};
