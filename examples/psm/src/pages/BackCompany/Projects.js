import odoo from '@/odoo';

import React from 'react';
import Link from 'umi/link';
import { Table, Modal, Button, Form, Input, Select } from 'antd';
import FormItemLayout from '@/layouts/FormItemLayout';

const FormItem = Form.Item;
const { Option } = Select;

class List extends React.Component {
  state = {
    visible: false,
    ids: [],
    recordsList: [],
    usersList: [],
  };

  columns = [
    {
      title: '',
      dataIndex: '_',
      render: (_, { id }) => {
        return <Link to={`/BackCompany/Project?id=${id}`}>查看</Link>;
      },
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '项目经理',
      dataIndex: 'user_id.name',
    },
    {
      title: '项目账号',
      dataIndex: 'user_id.login',
    },
    {
      title: '管理员手机号',
      dataIndex: 'user_id.mobile',
    },
  ];

  async componentDidMount() {
    const Model = await odoo.env('project.project');
    const records = await Model.search([], {user_id:{}}, { order: 'name' });
    const data = records.look2({user_id:{}});
    this.setState({ recordsList: data, ids: records.ids });

    const [, adminid] = (await odoo.ref('base.user_admin')) || [0, 0];

    if (!adminid) {
      return;
    }

    const User = await odoo.env('res.users');
    const users = await User.search([['id', '!=', adminid]], {}, { order: 'name' });
    const usersList = users.look2();
    this.setState({ usersList });
  }

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleOk = () => {
    const {
      form: { validateFields },
    } = this.props;

    validateFields(async (err, values) => {
      //     if (!err) {
      const { name, user_name, login, mobile, password } = values;
      const User = odoo.env('res.users');
      const user = await User.create({ name:user_name, login, mobile, password });
      const user_id = user.id
      console.log(user_id, values)

      const vals = { name, user_id };

      const Model = await odoo.env('project.project');
      const new_rec = await Model.create(vals);

      if (new_rec) {
        //TBD
        const { ids } = this.state;
        this.setState({
          ids: [...ids, new_rec.id],
        });
      }

      const { ids } = this.state;

      const records = Model.view(ids);
      const data = records.look2();
      this.setState({ recordsList: data });

      this.setState({ recordsList: data, ids: records.ids });

      // 重置 `visible` 属性为 false 以关闭对话框
      this.setState({ visible: false });
      //     }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { visible, recordsList, usersList } = this.state;

    return (
      <div>
        <Table columns={this.columns} dataSource={recordsList} rowKey="id" />
        <Button onClick={this.showModal}>新建</Button>
        <Modal title="新建项目" visible={visible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <Form>
            <FormItem {...FormItemLayout} label="项目名称">
              {getFieldDecorator('name', {
                rules: [{ required: true }],
              })(<Input />)}
            </FormItem>
            <FormItem {...FormItemLayout} label="项目账号">
              {getFieldDecorator('login', {
                rules: [{ required: true }],
              })(<Input />)}
            </FormItem>

            <FormItem {...FormItemLayout} label="初始密码">
              {getFieldDecorator('password', {
                rules: [{ required: true }],
              })(<Input />)}
            </FormItem>

            <FormItem {...FormItemLayout} label="项目经理">
              {getFieldDecorator('user_name', {
                rules: [{ required: true }],
              })(<Input />)}
            </FormItem>

            <FormItem {...FormItemLayout} label="管理员手机号">
              {getFieldDecorator('mobile', {
                rules: [{ required: true }],
              })(<Input />)}
            </FormItem>


          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(List);
