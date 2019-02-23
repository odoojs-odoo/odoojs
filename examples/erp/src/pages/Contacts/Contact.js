import odoo from '@/odoo'

import React from 'react';

import { Card, Divider, Avatar } from 'antd';
import DescriptionList from '@/components/DescriptionList';
const { Description } = DescriptionList;


class Page extends React.Component {
  state = {
    id: null,
    record: {},
  };

  componentWillMount() {


    const {
      location: {
        query: { id },
      },
    } = this.props;

    const Model = odoo.env('res.partner');
    if (id) {
      const records = Model.view(Number(id));
      const record = records.look();
      this.setState({ record });
      this.setState({ id: Number(id) });
    }

  }

  render() {
    const {  record } = this.state;
    console.log(record)

    const src64 = `data:image/jpeg;base64,${escape(record.image)}`


    return (
      <Card bordered={false}>
        <DescriptionList size="large" title='详情页面说明' style={{ marginBottom: 32 }}>
          <div>详情页面展示一条数据</div>
          <div>通常由列表页面跳转而来</div>
          <div>多对一字段, 需要嵌套获取有关字段的数据</div>
          <div>一对多字段, 多对多字段, 如何展示待议</div>
        </DescriptionList>
        <Divider style={{ marginBottom: 32 }} />;
        <DescriptionList size="large" title='其他信息' style={{ marginBottom: 32 }}>
          <Description term='名称' >{record.name}</Description>
          <Description term='邮箱' >{record.email}</Description>
          <img
            alt="example"
            style={{width: '60%',height:'60%' }}
            src={src64}
          />



          <Description term='名称' >{record.name}</Description>
          <Description term='邮箱' >{record.email}</Description>
          <Avatar size="large" src={src64} />


        </DescriptionList>
      </Card>


    );



  }
}

export default Page;
