import React, { Component } from 'react';
import {
  Form, Select, Input, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Rate,Divider, Modal, Card, Badge, Table, Tag, message
} from 'antd';

const { Column, ColumnGroup } = Table;


const FormItem = Form.Item;

const Dragger = Upload.Dragger;

class UploadModel extends Component {


  handleSubmit = (e) => {
    e.preventDefault();
  }

  onChange = (info) => {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
      this.response = info.file.response;
      console.log(this.response);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
      this.response = info.file.response;
      console.log(this.response);
    }

  }

  normFile = (e) => {

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (

<Form onSubmit={this.handleSubmit}>
<Card title="Upload Model">
        <FormItem>
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
            onChange: this.onChange
          })(
            <Dragger name="model.zip" action="/api/upload" listType="zip_safe">
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                <Card
                  type="inner"
                  title="Model Format Requirements"
                  extra={<a href="#">More</a>}
                >
                  <li>Model_Name/1/saved_model.pb</li>
                  <li>Model_Name/1/variables/</li>
                  <li>Model_Name/1/column_config.json</li>
                </Card>
                </p>
              </Dragger>
          )}
        </FormItem>
</Card>
        {this.response && !this.response.serving_default &&
        <Card title="Model Upload Status" extra={<Tag color="red">Failed</Tag>}/>
        }
        {this.response && this.response.serving_default &&
        <Card title="Model Upload Status" extra={<Tag color="green">Success</Tag>}>
        <div>
        <Badge status="success" text="Input Tensors" />
        <br/>
          <Table dataSource={this.response.serving_default.inputs}>
              <Column
                title="Name"
                dataIndex="name"
                key="name"
              />
              <Column
                title="Key"
                dataIndex="key"
                key="key"
              />
              <Column
                title="Dtype"
                dataIndex="dtype"
                key="dtype"
              />
              <Column
                title="Dims"
                dataIndex="dims"
                key="dims"
                render={dims => (
                  <span>
                    {dims.map(dim => <Tag color="blue" key={dim}>{dim}</Tag>)}
                  </span>
                )}
              />
          </Table>
          <Badge status="success" text="Output Tensors" />
          <br/>
          <Table dataSource={this.response.serving_default.outputs}>
              <Column
                title="Name"
                dataIndex="name"
                key="name"
              />
              <Column
                title="Key"
                dataIndex="key"
                key="key"
              />
              <Column
                title="Dtype"
                dataIndex="dtype"
                key="dtype"
              />
              <Column
                title="Dims"
                dataIndex="dims"
                key="dims"
                render={dims => (
                  <span>
                    {dims.map(dim => <Tag color="blue" key={dim}>{dim}</Tag>)}
                  </span>
                )}
              />
          </Table>
        </div>
        }
        <br />
        </Card>
        }


</Form>


    );
  }
}


const WrappedForm = Form.create()(UploadModel);


export default WrappedForm
