const json = {
  en: {
    'a.hello': 'hello',
    'a.world': 'world',
    'b.hello': 'hello',
    'b.world': 'world'
  },
  ja: {
    'a.hello': '',
    'a.world': '',
    'b.hello': '',
    'b.world': ''
  }
}

const nestJson = {
  en: {
    a: {
      hello: 'hello',
      world: 'world'
    },
    b: {
      hello: 'hello',
      world: 'world'
    }
  },
  ja: {
    a: {
      hello: '',
      world: ''
    },
    b: {
      hello: '',
      world: ''
    }
  },
  ja2: {
    a: {
      hello: 'hello2',
      world: ''
    },
    b: {
      hello: '',
      world: ''
    }
  }
}

module.exports  = {
  json,
  nestJson
}
