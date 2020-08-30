const Model = {
  configs: {},

  extend: BaseClass => {
    class ModelClass extends BaseClass {
      global_domain(payload = {}) {
        // const { domain = {}, domain2 = [] } = payload
        return super.global_domain(payload)
      }

      async channel_get(partners_to) {
        const res = await this.call('channel_get', [partners_to], {})
        return res
      }

      async private_message_post(channel_id, msg) {
        const kwargs = {
          message_type: 'comment',
          subtype: 'mail.mt_comment',
          body: msg
        }

        const res = await this.call('message_post', [channel_id], kwargs)
        // console.log('sssss,ss,', res)
        return res
      }

      async notify_typing(rid, is_typing) {
        const res = await this.call('notify_typing', [rid, is_typing], {})
        return res
      }

      async channel_fetch_message(rid, last) {
        const res = await this.call('channel_fetch_message', [rid, last], {})
        return res
      }
      async browse_one(rid) {
        const { partner_id } = this.get_userinfo()
        const fields = {
          name: null,
          channel_partner_ids: { name: null },
          uuid: null
          // image_128: null
        }
        const res = await super.browse_one(rid, { fields })
        res.is_typing = false

        const ptns = res.channel_partner_ids__objects.filter(
          item => item.id !== partner_id
        )
        if (ptns.length === 1) {
          const ptn = ptns[0]
          res.partner_id = ptn.id
          res.name = ptn.name
          res.me_partner_id = partner_id
        }

        return res
      }

      async find_channel_private(partner_to) {
        //
        console.log(' in odoojs find_channel_private', partner_to)
        // const { partner_id } = this.get_userinfo()
        const domain = {
          channel_partner_ids: [parseInt(partner_to)],
          public: 'private',
          channel_type: 'chat',
          name___neq: 'OdooBot'
        }
        const fields = {
          name: null,
          channel_partner_ids: { name: null }
          // image_128: null
        }
        const res = await this.search({ domain, fields })
        const res2 = res.filter(item => item.channel_partner_ids.length === 2)

        return res2.length ? res2[0] : null

        // if (!res2.length) {
        //   return null
        // }

        // const cnl = res2[0]
        // return {
        //   id: parseInt(partner_to),
        //   private_channel_id: cnl.id,
        //   private_channel_id__object: cnl
        // }
      }

      async search_private(payload) {
        console.log(' in odoojs search_private', payload)
        const { partner_id } = this.get_userinfo()
        const fields = {
          name: null,
          channel_partner_ids: { name: null }
          // image_128: null
        }

        const domain = {
          // channel_partner_ids: [partner_id],
          public: 'private',
          channel_type: 'chat',
          name___neq: 'OdooBot'
        }

        const res = await this.search({ domain, fields })

        const baseURL = process.env.VUE_APP_BASE_API
        const imgUrl = '/web/image'
        // const imgField = 'image_128'

        res.map(channel => {
          channel.image = `${baseURL}${imgUrl}?model=${this.model}&id=${
            channel.id
          }&field=image_128`

          const ptns = channel.channel_partner_ids__objects.filter(
            item => item.id !== partner_id
          )
          if (ptns.length === 1) {
            const ptn = ptns[0]
            channel.partner_id = ptn.id
            channel.me_partner_id = partner_id

            channel.name = ptn.name
            channel.image = `${baseURL}${imgUrl}?model=res.partner&id=${
              ptn.id
            }&field=image_1920`
          }

          return channel
        })

        return res
      }
    }
    return ModelClass
  }
}

export default Model
