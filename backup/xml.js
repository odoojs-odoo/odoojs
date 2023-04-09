// var _this=this;
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// axios.get("http://192.168.30.52:8882/test.html").then(function (response){
//     _this.getResult=response.data;
//     console.log("get请求",_this.getResult);
// }).catch(function(error){
//     console.log(error);
// });

import axios from 'axios'

const url =
  'http://localhost:8080/dev-api/mail/static/src/components/discuss/discuss.xml'

const get_xml = () => {
  axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
  axios
    .get(url)
    .then(function (response) {
      console.log(response)
      //   const  = response.data
      //   console.log('get请求', _this.getResult)
    })
    .catch(function (error) {
      console.log(error)
    })
}

export default class XML {
  test() {
    console.log('tst xml')
    get_xml()
  }
}
//
