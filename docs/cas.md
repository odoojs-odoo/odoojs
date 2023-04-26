## web. loginPage

1. /user/login
2. ....
3. call login() => /web/auth()
4. return = odoo:{ uid, session}
5. set cokie

## web. /home /web?action_id=xxxx

1. /home. /home /web?action_id=xxxx
2. get cokie
3. call get_session(cas st) => /web/get_session
4. return = odoo:{ uid, session}
5. set cokie
6. call odoo method

## odoo server

1. /web/auth()
2. /web/get_session

## web login cas

1. /user/login1 .....1
2. https://${cas-server-host}:${cas-server-port}/cas-server/login?service=${client-service-url}
3. https://10.120.140.37:7443/cas/login?service=https://43.xx.xx.xx/user/loginok
4. return cas session:https://10.120.140.37:7443
5. https://43.xx.xx.xx/user/loginok?ticket=${service-ticket}
6. return xml, st = service tiket
7. call odoo login(st) => /web/auth(xml, st)
8. return odoo: uid, session{st} /43.sss.ss..ss/fapiao/web
9. ok

## odoo server auth(xml, st)

1. (st)
2. https://10.120.140.37:7443/cas/serviceValidate?ticket=xxx&service=xxxxyyy
3. http://${cas-server-host}:${cas-server-port}/cas-server/serviceValidate
   ?ticket=${service-ticket}&service=${client-service-url}
4. call cas.check_st(st)

<!-- lang: xml -->

<cas:serviceResponse xmlns:cas='http://www.yale.edu/tp/cas'>
<cas:authenticationSuccess>
<cas:user>AAAA</cas:user>
</cas:authenticationSuccess>
</cas:serviceResponse>

<!-- lang:xml -->

<cas:serviceResponse xmlns:cas='http://www.yale.edu/tp/cas'>
<cas:authenticationFailure code='XXX'> YYY </cas:authenticationFailure>
</cas:serviceResponse>

XXX: INVALID_TICKET, CREATION_ERROR, INVALID_SERVICE

7. === return uname
8. search res.users: uname => uid
9. session.st = st
10. return uid, session

## logout

1. call /web/destrop
2. odoo, del session
3. web /user.login

## logout cas

3. https://${cas-server-host}:${cas-server-port}/cas-server/logout
4. https://10.120.140.37:7443/cas/logout

请求头： Content-Type：application/x-www-form-urlencoded

请求正文：

<!-- lang: xml --> logoutRequest=

<samlp:LogoutRequest xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"
ID="#LR_TICKET_ID#" Version="2.0"
IssueInstant="#CURRENT_DATETIME#">

<saml:NameID xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion">@NOT_USED@</saml:NameID> <samlp:SessionIndex>#ST#</samlp:SessionIndex>

</samlp:LogoutRequest>

LR_TICKET_ID:　　 CAS 服务器为每个登出通知请求所生成的一个值
ST 　　　　　　　　之前登陆成功后 CAS 服务端传回来的 Service Ticket
CURRENT_DATETIME 发出该请求时，CAS 服务器的日期 / 时间

5. call /web/destrop
6. odoo, del session
7. web /user.login

## web. cas. /home /web?action_id=xxxx

1. /home. /home /web?action_id=xxxx
2. get st
3. call get_session(cas st) => /web/get_session
4. return = odoo:{ uid, session}
5. get cokie
6. call odoo method.fields_get, search, read
7. set cokie

## odoo server get_session(st, session)

1. (st)
2. call cas check st(st)
3. === return uname
4. res.users: uname => uid
5. session.uid
6. return uid, session

######

# https://10.120.140.37:7443/cas/login

# https://10.120.140.37:7443/cas/logout

https://10.120.140.37:7443/cas/login?service=https://einvoicetest.vwatj.ap.vwg/fapiao/vwat2/user/loginok

https://10.120.140.37:7443/cas/serviceValidate?ticket=xxx&service=https://einvoicetest.vwatj.ap.vwg/fapiao/vwat2/user/loginok

# login = 'UWS87XL'

    # password = 'Witch20210730'

https://10.120.140.37:7443/cas/login?service=https://einvoicetest.vwatj.ap.vwg/fapiao/vwat2/user/loginok

https://10.120.140.37:7443/cas/serviceValidate?ticket=ST-79-E9hjkKFYbMwOcq4EsgaT-vwatjportal.ap.vwg&service=https://einvoicetest.vwatj.ap.vwg/fapiao/vwat2/user/loginok

# login = 'UWS87XL'

    # password = 'Witch20210730'

https://einvoicetest.vwatj.ap.vwg/fapiao/vwat2/user/loginok?ticket=ST-79-E9hjkKFYbMwOcq4EsgaT-vwatjportal.ap.vwg

UWS87XL 304000007 yu.zhao@atj.volkswagen.com.cn 220621198808280722 18502236677 尹静 Officer/Engineer SAP 1 UWS87XL Application Project 3 IT Application 0 fouaz.younes.hamimid@atj.volkswagen.com.cn Information Technology jing.yin@atj.volkswagen.com.cn 0 2019-02-25 05:17:22.449 00707810 yu.zhao@atj.volkswagen.com.cn 18502236677 weina.zhao@atj.volkswagen.com.cn 1988-08-28 00:00:00.0 3054105 LC White Collar A YIN, Jing 2023-04-26 02:34:28.114 Miss IT Application A4 yu.zhao@atj.volkswagen.com.cn yu.zhao@atj.volkswagen.com.cn
