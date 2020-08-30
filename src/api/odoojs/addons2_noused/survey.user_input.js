const Model = {
  configs: {},

  extend: BaseClass => {
    class ModelClass extends BaseClass {
      global_domain(domain) {
        return super.global_domain(domain)
      }

      async create_by_template(template_id) {
        const res = await this.create()
        return res
      }

      question_type_to_answer_type(question_type) {
        const question_type_to_answer_type_map = {
          free_text: 'free_text',
          textbox: 'text',
          numerical_box: 'number',
          date: 'date',
          datetime: 'datetime',
          simple_choice: 'suggestion',
          multiple_choice: 'suggestion',
          matrix: 'suggestion'
        }

        return question_type_to_answer_type_map[question_type]
      }

      _return2(res) {
        const input_lines = (res.user_input_line_ids__objects || []).reduce(
          (acc, item) => {
            acc[item.question_id] = {
              ...item,
              value_suggested: `${item.value_suggested}`
            }
            return acc
          },
          {}
        )

        const questions = (res.question_ids__objects || []).map(item => {
          const labels = item.labels_ids__objects.map(lab => {
            return {
              id: lab.id,
              label: lab.value,
              value: `${lab.id}`
            }
          })

          item.labels_ids__objects

          const value = input_lines[item.id] || {}

          return { ...item, labels, value }
        })

        const res2 = { ...res, questions }
        console.log(' user input ,res,', res2)

        return res2
      }

      get_feilds() {
        //
        return {
          question_ids: {
            question: null,
            question_type: null,
            labels_ids: {
              value: null
            }
          },
          user_input_line_ids: {
            question_id: null,
            value_suggested: null
          }
        }
      }

      async browse2_one(rid, kwargs) {
        const fields = this.get_feilds()
        console.log('xxxx,fields:', fields)
        const res = await super.browse_one(rid, { fields })
        // return res
        return this._return2(res)
      }

      async browse_one(rid, kwargs) {
        const res = await super.browse_one(rid, kwargs)
        return res
        // return this._return2(res)
      }

      async search(params = {}) {
        const res = await super.search(params)
        return res
      }

      async write_line(values) {
        const { id, questions } = values
        console.log(' write', id, questions)
        const lines_vals = questions.map(item => {
          if (item.value.id) {
            const vals = {
              value_suggested: parseInt(item.value.value_suggested)
            }
            return [1, item.value.id, vals]
          } else {
            const vals = {
              question_id: item.id,
              answer_type: this.question_type_to_answer_type(
                item.question_type
              ),
              value_suggested: parseInt(item.value.value_suggested)
            }
            return [0, 0, vals]
          }
        })
        console.log(' wr,lines_vals, ', lines_vals)

        const fields = this.get_feilds()

        const res = await this.write(
          {
            id,
            user_input_line_ids: lines_vals
          },
          { fields }
        )

        // const res = await this.write(values, kwargs)
        console.log('write,', res)
        return this._return2(res)
      }

      async write(values, kwargs = {}) {
        const res = await super.write(values, kwargs)
        console.log('write,', res)
        return res
      }
    }
    return ModelClass
  }
}

export default Model
