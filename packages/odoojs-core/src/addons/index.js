//import base from './base';   // TBD check 2019-8-10

//import bus from './bus';    // NO used
//import mail from './mail';  // NO used
//import product from './product';
import account from './account';
//import crm from './crm';
//import hr from './hr';
import hr_payroll from './hr_payroll';
import sale from './sale';
import purchase from './purchase';
import stock from './stock';
import mrp from './mrp';
import repair from './repair';

/*

*/

export default {
  //  base,
  //  product,
  account,
  hr_payroll,
  sale,
  purchase,
  stock,
  mrp,
  repair,

  /*
  crm,
  hr,

//  bus,
//  mail,


*/
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
