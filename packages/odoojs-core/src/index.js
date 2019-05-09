import ODOO from './odoo';

import odoo_patch from './addons-third/odoo_patch';
import om from './addons-third/om';

ODOO.addons = { ...ODOO.addons, ...odoo_patch, ...om };

export default ODOO;
