import React, {Component} from 'react';
import Panel from 'muicss/lib/react/panel';
import Button from 'muicss/lib/react/button';

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap'
};

const listStyle = {
  display: 'flex',
  listStyle: 'none',
  padding: 0
};

const itemStyle = {
  border: '1px solid #ccc',
  marginRight: '1em',
  borderRadius: '0.3em'
};

const labelStyle = {
  padding: '0.5em',
  background: '#eee',
  display: 'inline-block',
  borderRadius: '0.3em'
};

const titleStyle = {
  marginTop: '0.5em'
};

const valueStyle = {
  padding: '0.5em'
};

class Device extends Component {
  static propTypes = {
    device: React.PropTypes.object.isRequired,
    onEditDevice: React.PropTypes.func.isRequired,
    onRemoveDevice: React.PropTypes.func.isRequired,
    control: React.PropTypes.bool.isRequired,
    onControlDevice: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Panel key={this.props.device.id}>
        <div style={containerStyle} onClick={() => this.props.control ? this.props.onControlDevice(this.props.device) : null}>
          <div>
            <h2 style={titleStyle}><i className={`fa fa-${this.props.device.type.icon} fa-fw`}/> {this.props.device.name}</h2>
            {!this.props.control ? (
              <ul style={listStyle}>{
                this.props.device.type.controls.map(control => (
                  <li key={control.id} style={itemStyle}>
                    <span style={labelStyle}>{control.name}</span>
                    <span style={valueStyle}>{control.selectedOption}</span>
                  </li>
                ))
              }</ul>
            ) : null}
          </div>
          {!this.props.control ? (
            <span>
              <Button color='primary' onClick={() => this.props.onEditDevice(this.props.device)}>Edit</Button>
              <Button color='danger' onClick={() => this.props.onRemoveDevice(this.props.device)}>Delete</Button>
            </span>
          ) : null}
        </div>
      </Panel>
    );
  }
};

export default Device;
