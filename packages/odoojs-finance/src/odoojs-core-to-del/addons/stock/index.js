import product_strategy from './product_strategy';
import product from './product';
import res from './res';
import stock_inventory from './stock_inventory';
import stock_location from './stock_location';
import stock_move_line from './stock_move_line';
import stock_move from './stock_move';
import stock_package_level from './stock_package_level';
import stock_picking from './stock_picking';
import stock_production_lot from './stock_production_lot';
import stock_quant from './stock_quant';
import stock_rule from './stock_rule';
import stock_scrap from './stock_scrap';
import stock_warehouse from './stock_warehouse';

export default {
  name: 'stock',
  depends: ['product'],

  models: {
    ...product_strategy.models,
    ...product.models,
    ...res.models,
    ...stock_inventory.models,
    ...stock_location.models,
    ...stock_move_line.models,
    ...stock_move.models,
    ...stock_package_level.models,
    ...stock_picking.models,
    ...stock_production_lot.models,
    ...stock_quant.models,
    ...stock_rule.models,
    ...stock_scrap.models,
    ...stock_warehouse.models,
  },
};
