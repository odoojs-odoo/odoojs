const modelName = 'dict.raw_word'

const Model = {
  data() {
    return {
      model: modelName,

      fieldsForSearch: {
        name: null,
        extra: null,
        root: null,
        first_letter: null,
        part_of_speech_ids: null,
        part_of_speech: null,
        meanings_cn: null
      },
      fieldsForOption: {
        name: { label: 'Word', width: 120 },
        root: { label: 'Group', width: 120 },
        extra: { label: 'Note', width: 120 },
        part_of_speech: { label: 'Part of Speech', width: 120 },
        meanings_cn: { label: 'Meaning', width: 200 }
      },

      optionForList: {
        searchBox: {
          type: 'eq_ilike__left',
          name: 'name',
          label: 'Word'
          // placeholder: ''
        },

        formColumns: ['name', 'root', 'extra'],
        columns: ['name', 'root', 'extra', 'part_of_speech', 'meanings_cn']
      }
    }
  },

  methods: {
    //
  }
}
export default Model
