import { Domain_Str2Arr, Domain_Patch_And } from '@/odooapi/view/tools'

export default class DomainTestCase {
  test() {
    this.test2()
  }
  test1() {
    const str = "[('invoice_date_due', '<', time.strftime('%Y-%m-%d'))]"
    // const str = '[(1),(212)]'

    console.log(str)
    const arr = Domain_Str2Arr(str)

    console.log(arr)
  }

  test2() {
    const str =
      // "['&', ('invoice_date_due', '<', time.strftime('%Y-%m-%d')), ('state', '=', 'posted'), ('payment_state', 'in', ('not_paid', 'partial'))]"
      " [ '|', '|' , '|',  '|', ('name', 'ilike', self)  ,  ('invoice_origin', 'ilike', self), ('ref', 'ilike', self), ('payment_reference', 'ilike', self),  ('partner_id', 'child_of', self ) ] "

    console.log(str)
    const arr = Domain_Str2Arr(str)
    console.log(arr)
    const arr2 = Domain_Patch_And(arr)
    console.log(arr2)
    const arr3 = arr2.join(', ')
    console.log(arr3)
  }
}
