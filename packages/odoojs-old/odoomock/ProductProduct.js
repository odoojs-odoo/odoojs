class ModelClass {
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
    return this._ids.map(id => ModelClass._records[id]);
  }

  look(fields) {
    return ModelClass._records[this._id];
  }
}

ModelClass._name = 'product.product';

ModelClass._records = {
  1: {
    id: 1,
    name: '11112501',
    type: '国产常规',
    brand: '荷斯坦',
    image:
      'http://www.bdccmall.cn/images/201705/goods_img/225_G_1495273704127.jpg',
  },
  2: {
    id: 2,
    name: 'RAG11111353',
    type: '国产性控',
    brand: '安格斯',
    image:
      'http://www.bdccmall.cn/images/201706/goods_img/484_G_1496979695885.jpg',
  },

  3: {
    id: 3,
    name: '11112501',
    type: '国产常规',
    brand: '荷斯坦',
    image:
      'http://www.bdccmall.cn/images/201705/goods_img/225_G_1495273704127.jpg',
  },
  4: {
    id: 4,
    name: 'RAG11111353',
    type: '国产性控',
    brand: '安格斯',
    image:
      'http://www.bdccmall.cn/images/201706/goods_img/484_G_1496979695885.jpg',
  },
  6: {
    id: 2,
    name: 'RAG11111353',
    type: '国产性控',
    brand: '安格斯',
    image:
      'http://www.bdccmall.cn/images/201706/goods_img/484_G_1496979695885.jpg',
  },

  7: {
    id: 3,
    name: '11112501',
    type: '国产常规',
    brand: '荷斯坦',
    image:
      'http://www.bdccmall.cn/images/201705/goods_img/225_G_1495273704127.jpg',
  },
  8: {
    id: 4,
    name: 'RAG11111353',
    type: '国产性控',
    brand: '安格斯',
    image:
      'http://www.bdccmall.cn/images/201706/goods_img/484_G_1496979695885.jpg',
  },
  9: {
    id: 1,
    name: '11112501',
    type: '国产常规',
    brand: '荷斯坦',
    image:
      'http://www.bdccmall.cn/images/201705/goods_img/225_G_1495273704127.jpg',
  },
};

ModelClass.search = async domain => {
  const ids = Object.keys(ModelClass._records);
  return new ModelClass(ids);
};
ModelClass.search_org = async domain => {
  const ids = Object.keys(ModelClass._records);
  console.log(ids);
  const nids = ids.filter(id => ModelClass._records[id].is_company === true);
  console.log(nids);
  console.log(ModelClass._records);

  return new ModelClass(nids);
};
ModelClass.search_person = async domain => {
  const ids = Object.keys(ModelClass._records);
  const nids = ids.filter(id => ModelClass._records[id].is_company !== true);
  return new ModelClass(nids);
};

ModelClass.create = async vals => {
  const id = Math.max(...Object.keys(ModelClass._records)) + 1;
  ModelClass._records[id] = { id, ...vals };

  return new ModelClass(id);
};

ModelClass.write = async (id, vals) => {
  const old = ModelClass._records[id];

  ModelClass._records[id] = { ...old, id, ...vals };
  return new ModelClass(id);
};

ModelClass.view = id => {
  return new ModelClass(id);
};

export default ModelClass;
