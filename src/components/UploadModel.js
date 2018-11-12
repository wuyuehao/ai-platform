import React, { Component } from 'react';
import {
  Form, Select, Input, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Rate,Divider, Modal, Card, Badge, Table, Tag
} from 'antd';

const { Column, ColumnGroup } = Table;


const FormItem = Form.Item;


class UploadModel extends Component {


  handleSubmit = (e) => {
    e.preventDefault();
  }

  onChange = (info) => {
    let fileList = info.fileList;
    let file = fileList[0];
    console.log(file);
    if (file && file.response) {
        console.log('resposne:', file.response);
        this.response = file.response;
    }else{
      console.log("no response yet");
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
<Card title="Upload required model data for verification">
        <FormItem
          {...formItemLayout}
          label="Upload"
          extra=""
        >
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
            onChange: this.onChange
          })(
            <Upload  name="model.zip" action="/api/upload" listType="zip_safe">
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>
          )}
        </FormItem>
</Card>

        {this.response &&
        <Card title="Model Upload Status">
        <Badge status="default" text="Model File" />
        <br />
        <Badge status="default" text="Raw DataSet" />
        <br />
        <Badge status="default" text="Transformed DataSet" />
        <br />
        <Badge status="default" text="Column Config" />
        <br />
        <Badge status="default" text="Expect Result" />
        <br />

        {this.response.serving_default &&
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
