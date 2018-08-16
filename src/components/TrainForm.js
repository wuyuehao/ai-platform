import {
  Form, Select, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Rate,Divider, Modal
} from 'antd';
import React, { Component } from 'react';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class TrainForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  handleAlgSelectChange = (value) => {
    console.log(value);
    this.shows2s = (value === 's2s');
    this.showimg = (value === 'img');
    var formData = this.props.form.getFieldsValue();
    console.log(formData);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };



    return (

      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="Algorithm"
          hasFeedback
        >
          {getFieldDecorator('alg', {
            rules: [
              { required: true, message: 'Please select an Algorithm!' },
            ],
          })(
            <Select placeholder="Please select an Algorithm"
            onChange={this.handleAlgSelectChange} >
              <Option value="s2s">Sequence to Sequence</Option>
              <Option value="img">Image Classification</Option>
            </Select>
          )}
        </FormItem>

        <Divider/>

        <FormItem
          {...formItemLayout}
          label="InputDataType"
          hasFeedback
        >
          {getFieldDecorator('datatype', {
            rules: [
              { required: true, message: 'Please select an input data type!' },
            ],
          })(
            <Select placeholder="Please select an input data type"
            >
              <Option value="upload">Upload</Option>
              <Option value="local">Local</Option>
              <Option value="remote">Remote</Option>
            </Select>
          )}
        </FormItem>

        {this.shows2s &&
          <FormItem
            {...formItemLayout}
            label="InputNumber"
          >
            {getFieldDecorator('input-number', { initialValue: 3 })(
              <InputNumber min={1} max={10} />
            )}
            <span className="ant-form-text"> machines</span>
          </FormItem>
        }
        {this.showimg && <div> <h1>IMG Form</h1></div>}





        </Form>

    );
  }
}

const WrappedTrain = Form.create()(TrainForm);

export default WrappedTrain
