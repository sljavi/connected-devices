import React, {Component} from 'react';

import Panel from 'muicss/lib/react/panel';
import Select from 'muicss/lib/react/select';
import Option from 'muicss/lib/react/option';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';

const formStyle = {};
const rowWithButtonStyle = {
  display: 'flex'
};

const inputInsideRowWithButtonStyle = {
  flexGrow: 1,
  marginRight: '1.5em'
};

const sectionTitleStyle = {
  display: 'flex',
  justifyContent: 'space-between'
};

const centerStyle = {
  textAlign: 'center'
};

const controlContainerStyle = {
  marginBottom: '1em',
  borderLeft: '3px solid #ccc',
  paddingLeft: '1em'
};

const selectOptionsTitleStyle = {
  margin: 0
};

const selectOptionRowStyle = {
  display: 'flex',
  paddingRight: '8em'
};

const selectOptionStyle = {
  flexGrow: 1,
  margin: '0 1.5em 0 0',
  fontSize: '0.8em',
  padding: '0 0 0 1em'
};

class EditDevice extends Component {
  static propTypes = {
    deviceTypes: React.PropTypes.array.isRequired,
    widgets: React.PropTypes.array.isRequired,
    device: React.PropTypes.object,
    onSave: React.PropTypes.func.isRequired,
    onExit: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      device: props.device,
      customDeviceType: false,
      controls: []
    };
    this.handleAddAnotherControl = this.handleAddAnotherControl.bind(this);
    this.handleAddNewDeviceType = this.handleAddNewDeviceType.bind(this);
    this.removeControl = this.removeControl.bind(this);
    this.handleRemoveNewDeviceType = this.handleRemoveNewDeviceType.bind(this);
    this.handleDeviceNameChange = this.handleDeviceNameChange.bind(this);
    this.handleDeviceIpChange = this.handleDeviceIpChange.bind(this);
    this.handleDeviceTypeIdChange = this.handleDeviceTypeIdChange.bind(this);
    this.handleSaveDevice = this.handleSaveDevice.bind(this);
    this.handleDeviceTypeNameChange = this.handleDeviceTypeNameChange.bind(this);
    this.handleDeviceTypeApiChange = this.handleDeviceTypeApiChange.bind(this);
    this.handleDeviceTypeIconChange = this.handleDeviceTypeIconChange.bind(this);
  }

  getDefaultControl() {
    return {
      id: Date.now(),
      name: '',
      widget: this.props.widgets[0],
      selectedOption: this.props.widgets[0].options[0]
    };
  }

  handleAddAnotherControl() {
    this.updateDeviceTypeProps({
      controls: [
        ...this.state.device.type.controls,
        this.getDefaultControl()
      ]
    });
  }

  handleAddNewDeviceType() {
    this.setState({
      customDeviceType: true,
      device: {
        ...this.state.device,
        type: {
          id: Date.now(),
          icon: 'television',
          name: '',
          api: '',
          controls: [this.getDefaultControl()]
        }
      }
    });
  }

  handleEditDeviceType() {
    this.setState({
      customDeviceType: true
    });
    this.updateDeviceTypeProps({
      name: `${this.state.device.type.name} copy`,
      id: Date.now()
    });
  }

  handleRemoveNewDeviceType() {
    this.setState({
      customDeviceType: false,
      device: {
        ...this.state.device,
        type: this.props.device.type
      }
    });
  }

  removeControl(controlId) {
    this.updateDeviceTypeProps({
      controls: this.state.device.type.controls.filter(control => control.id !== controlId)
    });
  }

  handleDeviceNameChange(event) {
    this.setState({
      device: {
        ...this.state.device,
        name: event.target.value
      }
    });
  }

  handleDeviceIpChange(event) {
    this.setState({
      device: {
        ...this.state.device,
        ip: event.target.value
      }
    });
  }

  handleDeviceTypeIdChange(event) {
    this.setState({
      device: {
        ...this.state.device,
        type: this.props.deviceTypes.find(device => device.id === +event.target.value)
      }
    });
  }

  handleSaveDevice() {
    this.props.onSave(this.state.device);
    this.props.onExit();
  }

  updateDeviceTypeProps(props) {
    this.setState({
      device: {
        ...this.state.device,
        type: {
          ...this.state.device.type,
          ...props
        }
      }
    });
  }

  updateControlProps(props, controlId) {
    const controlIndex = this.state.device.type.controls.findIndex(control => control.id === controlId);
    let control = {
      ...this.state.device.type.controls[controlIndex],
      ...props
    };
    let newControls = [...this.state.device.type.controls];
    newControls[controlIndex] = control;
    this.updateDeviceTypeProps({
      controls: newControls
    });
  }

  handleDeviceTypeNameChange(event) {
    this.updateDeviceTypeProps({
      name: event.target.value
    });
  }

  handleDeviceTypeApiChange(event) {
    this.updateDeviceTypeProps({
      api: event.target.value
    });
  }

  handleDeviceTypeIconChange(event) {
    this.updateDeviceTypeProps({
      icon: event.target.value
    });
  }

  removeWidgetOption(controlId, optionIndex) {
    let control = this.state.device.type.controls.find(control => control.id === controlId);
    let widget = control.widget;
    widget = {
      ...widget,
      options: [
        ...widget.options.slice(0, optionIndex),
        ...widget.options.slice(optionIndex + 1)
      ]
    };
    this.updateControlProps({widget}, controlId);
  }

  addWidgetOption(controlId) {
    let control = this.state.device.type.controls.find(control => control.id === controlId);
    let widget = control.widget;
    widget = {
      ...widget,
      options: widget.options.concat([''])
    };
    this.updateControlProps({widget}, controlId);
  }

  editWidgetOption(controlId, optionIndex, value) {
    let control = this.state.device.type.controls.find(control => control.id === controlId);
    let widget = control.widget;
    const options = [
      ...widget.options.slice(0, optionIndex),
      value,
      ...widget.options.slice(optionIndex + 1)
    ];
    widget = {
      ...widget,
      options
    };
    this.updateControlProps({
      widget,
      selectedOption: options[0]
    }, controlId);
  }

  addControl(controlId, widgetId) {
    let widget = this.props.widgets.find(widget => widget.id === widgetId);
    if (widget.name === 'Select') {
      widget = {
        ...widget,
        options: ['']
      };
    }
    this.updateControlProps({
      widget,
      selectedOption: widget.options[0]
    }, controlId);
  }

  render() {
    return (
      <Panel>
        <Form style={formStyle}>
          <legend>Device Settings</legend>
          <Input
            label='Device Name'
            floatingLabel
            required
            value={this.state.device.name}
            onChange={this.handleDeviceNameChange}/>
          <Input
            label='Device IP'
            floatingLabel
            required
            value={this.state.device.ip}
            onChange={this.handleDeviceIpChange}/>
          {
            !this.state.customDeviceType ? (
              <div style={rowWithButtonStyle}>
                <Select
                  label='Device Type'
                  style={inputInsideRowWithButtonStyle}
                  value={this.state.device.type.id}
                  onChange={this.handleDeviceTypeIdChange}>
                  {this.props.deviceTypes.map(deviceType => (
                    <Option
                      key={deviceType.id}
                      value={deviceType.id}
                      label={deviceType.name} />
                  ))}
                </Select>
                <Button color='primary' onClick={() => this.handleEditDeviceType()}>Edit</Button>
                <Button color='accent' onClick={this.handleAddNewDeviceType}>Add new</Button>
              </div>
            ) : null
          }
          {
            this.state.customDeviceType ? (
              <Panel>
                <div style={sectionTitleStyle}>
                  <legend>Device Type</legend>
                  <Button variant='flat' onClick={this.handleRemoveNewDeviceType}><i className='fa fa-times'/></Button>
                </div>
                <Input
                  label='Device type name'
                  floatingLabel
                  required
                  value={this.state.device.type.name}
                  onChange={this.handleDeviceTypeNameChange}/>
                <Input
                  label='Api call'
                  floatingLabel
                  required
                  value={this.state.device.type.api}
                  onChange={this.handleDeviceTypeApiChange}/>
                <Select
                  label='Type'
                  value={this.state.device.type.icon}
                  onChange={this.handleDeviceTypeIconChange}>
                  <Option value='music' label='Music' />
                  <Option value='television' label='TV' />
                  <Option value='lightbulb-o' label='Ligth' />
                  <Option value='star' label='Custom' />
                </Select>
                <legend>Controls</legend>
                {
                  this.state.device.type.controls.map(control => (
                    <div key={control.id} style={controlContainerStyle}>
                      <div style={rowWithButtonStyle}>
                        <Input
                          label='Control name'
                          floatingLabel
                          required
                          style={inputInsideRowWithButtonStyle}
                          value={control.name}
                          onChange={(e) => this.updateControlProps({name: e.target.value}, control.id)}/>
                        <Select
                          label='Control type'
                          value={control.widget.id}
                          style={inputInsideRowWithButtonStyle}
                          onChange={(e) => this.addControl(control.id, +e.target.value)}>
                          {this.props.widgets.map(widget => (
                            <Option key={widget.id} value={widget.id} label={widget.name} />
                          ))}
                        </Select>

                        {this.state.device.type.controls.length > 1 ? (
                          <Button size='small' color='danger' onClick={() => this.removeControl(control.id)}>Remove</Button>
                        ) : null}
                      </div>
                      {control.widget.name === 'Select' ? (
                        <div>
                          <h4 style={selectOptionsTitleStyle}>Select Options</h4>
                          {control.widget.options.map((option, index) => (
                            <div key={index} style={selectOptionRowStyle}>
                              <Input
                                hint={`Option ${index + 1}`}
                                required
                                style={selectOptionStyle}
                                value={option}
                                onChange={(e) => this.editWidgetOption(control.id, index, e.target.value)} />
                              {control.widget.options.length > 1 ? (
                                <Button size='small' style={{fontSize: 10, height: 28, padding: '0 16px'}} color='danger' onClick={() => this.removeWidgetOption(control.id, index)}>Remove</Button>
                              ) : null}
                            </div>
                          ))}
                          <Button size='small' style={{fontSize: 10, marginLeft: '1em'}} color='accent' onClick={() => this.addWidgetOption(control.id)}>Add new option</Button>
                        </div>) : null}
                    </div>
                  ))
                }
                <p style={centerStyle}>
                  <Button color='accent' onClick={this.handleAddAnotherControl}>Add control</Button>
                </p>
              </Panel>
            ) : null
          }
          <p style={centerStyle}>
            <Button size='large' color='primary' onClick={this.handleSaveDevice}>Save device</Button>
          </p>
        </Form>
      </Panel>
    );
  }
};

export default EditDevice;
