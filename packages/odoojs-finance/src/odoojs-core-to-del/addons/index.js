import base from './base';
import base_address_city from './base_address_city';
import bus from './bus';
import mail from './mail';
import sales_team from './sales_team';
import crm from './crm';
import project from './project';
import uom from './uom';
import product from './product';
import analytic from './analytic';
import account from './account';
import payment from './payment';
import hr from './hr';
import hr_contract from './hr_contract';
import hr_expense from './hr_expense';
import hr_payroll from './hr_payroll';
import hr_payroll_account from './hr_payroll_account';

//import sale from './sale';
//import purchase from './purchase';
//import stock from './stock';
//import stock_account from './stock_account';

//import purchase_stock from './purchase_stock';
//import sale_stock from './sale_stock';
//import sale_purchase from './sale_purchase';
//import mrp from './mrp';

export default {
  base,
  base_address_city,
  bus,
  mail,
  sales_team,
  crm,
  project,
  uom,
  product,
  analytic,
  account,
  payment,
  hr,
  hr_contract,
  hr_expense,
  hr_payroll,
  hr_payroll_account,

  //  sale,
  //  purchase,
  //  stock,
  //  stock_account,
  //  purchase_stock,
  //  sale_stock,
  //  sale_purchase,
  //  mrp,
};

/*

depends:

crm --> sales_team   --> base
    |
    --> mail --> bus --> base

project --> mail ...
        |
        --> resource


product --> mail ...
        |
        --> uom --> base

analytic --> mail ...
         |
         --> uom ...

account --> product ...
        |
        --> analytic ...

payment --> acount

sale ---> payment
      |
      --> sales_team

*/
