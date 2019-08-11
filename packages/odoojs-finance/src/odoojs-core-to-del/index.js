import ODOO from './odoo';

import addonsThird from './addons-third';

ODOO.addons = { ...ODOO.addons, ...addonsThird };

export default ODOO;
