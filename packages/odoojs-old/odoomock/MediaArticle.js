class Model {
  constructor(ids) {
    this._ids = [];
    this._id = null;

    if (ids && typeof ids === 'object') {
      this._ids = ids;
      this._id = ids.length ? ids[0] : null;
    } else {
      this._id = ids;
      this._ids = ids ? [ids] : [];
    }
  }

  get length() {
    return this._ids.length;
  }

  get ids() {
    return this._ids;
  }

  get id() {
    return this._id;
  }

  look2(fields) {
    return this._ids.map(id => Model._records[id]);
  }

  look(fields) {
    return Model._records[this._id];
  }
}

Model._name = 'media.document';

Model._records = {
  1: {
    title: '融媒体解决方案',
    id: 1,
    state: 'draft',
    star: 170,
    like: 178,
    message: 16,
    tags: ['odoo', 'odoojs', '融媒体', '富文本'],
    avatar:
      'https://tse3.mm.bing.net/th?id=OIP.1S55dLAd8hevKS65LjuykgHaD4&pid=Api',
    content: '灵活的富文本编辑功能, 让你的文章绚烂多彩。',
    owner: '欧阳修',
    href: 'https://gitee.com/odoowww/odoojs/blob/master/docs/introduction.md',
    updatedAt: '2019-03-02T02:07:10.921Z',
  },

  2: {
    title: '随需而动,极致体验 -- odoojs 前端解决方案',
    id: 2,
    state: 'todo',
    star: 170,
    like: 178,
    message: 16,
    tags: ['odoo', 'odoojs', '前端', 'js', 'javascript'],
    avatar:
      'https://tse3.mm.bing.net/th?id=OIP.1S55dLAd8hevKS65LjuykgHaD4&pid=Api',
    content:
      'odoojs 是 odoo 前端解决方案。为客户提供高效灵活的应用系统前端设计。',
    owner: '陶渊明',
    href: 'https://gitee.com/odoowww/odoojs/blob/master/docs/introduction.md',
    updatedAt: '2019-03-02T02:07:10.921Z',
  },

  3: {
    title: '快速响应,流程定制 -- odoo 开发平台',
    id: 3,
    state: 'done',
    star: 170,
    like: 178,
    message: 16,
    tags: ['odoo', 'erp', '开发平台', '管理系统'],
    avatar:
      'https://tse3.mm.bing.net/th?id=OIP.1S55dLAd8hevKS65LjuykgHaD4&pid=Api',
    content: 'odoo 是高效的,流程可定制的应用开发平台。',
    owner: '鬼谷子',
    href: 'https://gitee.com/odoowww/odoojs/blob/master/docs/introduction.md',
    updatedAt: '2019-03-02T02:07:10.921Z',
  },

  4: {
    title: '这篇文章写的有点low, 删掉了',
    id: 4,
    state: 'cancelled',
    star: 170,
    like: 178,
    message: 16,
    tags: ['开发平台', '管理系统'],
    avatar:
      'https://tse3.mm.bing.net/th?id=OIP.1S55dLAd8hevKS65LjuykgHaD4&pid=Api',
    content: '内容不忍直视, 进回收站了',
    owner: '鬼谷子',
    href: 'https://gitee.com/odoowww/odoojs/blob/master/docs/introduction.md',
    updatedAt: '2019-03-02T02:07:10.921Z',
  },
};

Model.search = async domain => {
  const ids = Object.keys(Model._records);
  return new Model(ids);
};

Model.searchByState = async state => {
  const ids = Object.keys(Model._records);
  const nids = ids.filter(id => Model._records[id].state === state);
  return new Model(nids);
};

Model.search_org = async domain => {
  const ids = Object.keys(Model._records);
  const nids = ids.filter(id => Model._records[id].is_company === true);
  console.log(nids);
  console.log(Model._records);

  return new Model(nids);
};
Model.search_person = async domain => {
  const ids = Object.keys(Model._records);
  const nids = ids.filter(id => Model._records[id].is_company !== true);
  return new Model(nids);
};

Model.create = async vals => {
  const id = Math.max(...Object.keys(Model._records)) + 1;
  Model._records[id] = { id, ...vals };

  return new Model(id);
};

Model.write = async (id, vals) => {
  const old = Model._records[id];

  Model._records[id] = { ...old, id, ...vals };
  return new Model(id);
};

Model.view = id => {
  return new Model(id);
};

export default Model;
