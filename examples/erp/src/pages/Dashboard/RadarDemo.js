import React, { memo, Component, Suspense } from 'react';

import { Icon, Tooltip, InputNumber } from 'antd';
import { ChartCard, Radar, Field } from '@/components/Charts';

const radarOriginData = [
  {
    name: '个人',
    ref: 10,
    koubei: 8,
    output: 4,
    contribute: 5,
    hot: 7,
  },
  {
    name: '团队',
    ref: 3,
    koubei: 9,
    output: 6,
    contribute: 3,
    hot: 1,
  },
  {
    name: '部门',
    ref: 4,
    koubei: 1,
    output: 6,
    contribute: 5,
    hot: 7,
  },
];
const radarData = [];
const radarTitleMap = {
  ref: '引用',
  koubei: '口碑',
  output: '产量',
  contribute: '贡献',
  hot: '热度',
};
radarOriginData.forEach(item => {
  Object.keys(item).forEach(key => {
    if (key !== 'name') {
      radarData.push({
        name: item.name,
        label: radarTitleMap[key],
        value: item[key],
      });
    }
  });
});

const ChartCard1 = memo(({ data }) => (
  <ChartCard
    title="雷达图"
    action={
      <Tooltip title="指标说明">
        <Icon type="info-circle-o" />
      </Tooltip>
    }
    total="12345678"
    footer={<Field label="底部可以有一些描述用语" value="12423" />}
  >
    <Radar hasLegend height={286} data={data} />
  </ChartCard>
));

class Dashboards extends Component {
  state = {
    v11: 18,
    v12: 12,
    v13: 10,
    v21: 10,
    v22: 16,
    v23: 11,
  };

  onChange(num, value) {
    const data = {};
    data[num] = value;
    this.setState(data);
  }

  render() {
    const { v11, v12, v13, v21, v22, v23 } = this.state;

    const data = [
      { name: '个人', label: '口碑', value: v11 },
      { name: '个人', label: '声望', value: v12 },
      { name: '个人', label: '信誉', value: v13 },
      { name: '团队', label: '口碑', value: v21 },
      { name: '团队', label: '声望', value: v22 },
      { name: '团队', label: '信誉', value: v23 },
    ];

    console.log(data);

    return (
      <div>
        <div>
          <span>个人口碑:</span>
          <InputNumber onChange={value => this.onChange('v11', value)} />
        </div>
        <div>
          <span>团队信誉:</span>
          <InputNumber onChange={value => this.onChange('v23', value)} />
        </div>
        <Suspense fallback={null}>
          <ChartCard1 data={data} />
        </Suspense>
      </div>
    );
  }
}

export default Dashboards;
