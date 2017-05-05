import React, {Component} from 'react';
import Panel from 'muicss/lib/react/panel';
import Switch from 'rc-switch';
import Select from 'muicss/lib/react/select';
import Option from 'muicss/lib/react/option';
import _ from 'lodash';


const containerStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const widgetRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  margin: '1em 0',
  alignItems: 'center'
};

const widgetStyle = {
  flexGrow: 1
};

const labelStyle = {
  marginRight: '1em'
};

class ControlDevice extends Component {
  static propTypes = {
    device: React.PropTypes.object.isRequired,
    updateDevice: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleRangeValueChange = _.debounce(this.handleRangeValueChange.bind(this), 50);
  }

  updateDeviceTypeProps(props) {
    const newDevice = {
      ...this.props.device,
      type: {
        ...this.props.device.type,
        ...props
      }
    };
    this.props.updateDevice(newDevice);
  }

  updateControlProps(props, controlId) {
    const controlIndex = this.props.device.type.controls.findIndex(control => control.id === controlId);
    let control = {
      ...this.props.device.type.controls[controlIndex],
      ...props
    };
    let newControls = [...this.props.device.type.controls];
    newControls[controlIndex] = control;
    this.updateDeviceTypeProps({
      controls: newControls
    });
  }

  handleRangeValueChange(value, controlId) {
    this.updateControlProps({selectedOption: `${value}`}, controlId);
  }

  render() {
    return (
      <Panel>
        <div style={containerStyle}>
          <h2><i className={`fa fa-${this.props.device.type.icon} fa-fw`}/> {this.props.device.name}</h2>
          {
            this.props.device.type.controls.map(control => {
              let widget;
              if (control.widget.name === 'Switch') {
                widget = (
                  <Switch
                    onChange={(value) => this.updateControlProps({selectedOption: value ? control.widget.options[0] : control.widget.options[1]}, control.id)}
                    checked={control.selectedOption === control.widget.options[0]}
                    checkedChildren={control.widget.options[0]}
                    unCheckedChildren={control.widget.options[1]}
                  />
                );
              } else if (control.widget.name === 'Range') {
                widget = (
                  <input
                    style={widgetStyle}
                    type='range'
                    min='0'
                    max='100'
                    onChange={(e) => {
                      this.setState({range: `${e.target.value}`});
                      this.handleRangeValueChange(e.target.value, control.id);
                    }}
                    value={this.state.range || control.selectedOption}/>);
              } else if (control.widget.name === 'Select') {
                widget = (
                  <Select
                    value={control.selectedOption}
                    onChange={(e) => this.updateControlProps({selectedOption: e.target.value}, control.id)}
                    style={widgetStyle}>
                    {control.widget.options.map(option => (
                      <Option key={option} value={option} label={option} />
                    ))}
                  </Select>
                );
              }
              return (
                <div key={control.id} style={widgetRowStyle}>
                  <span style={labelStyle}>{control.name}</span>{widget}
                </div>
              );
            })
          }
        </div>
      </Panel>
    );
  }
};

export default ControlDevice;
