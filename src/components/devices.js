import React, {Component} from 'react';
import Device from './device';
import Button from 'muicss/lib/react/button';

class Devices extends Component {
  static propTypes = {
    devices: React.PropTypes.array.isRequired,
    onAddNewDevice: React.PropTypes.func.isRequired,
    onEditDevice: React.PropTypes.func.isRequired,
    onRemoveDevice: React.PropTypes.func.isRequired,
    control: React.PropTypes.bool.isRequired,
    onControlDevice: React.PropTypes.func.isRequired
  }

  render() {
    return (
      <div>
        {
          this.props.devices.map(device => (
            <Device
              key={device.id}
              device={device}
              control={this.props.control}
              onEditDevice={this.props.onEditDevice}
              onRemoveDevice={this.props.onRemoveDevice}
              onControlDevice={this.props.onControlDevice}
            />))
        }
        {!this.props.control ? (
          <div>
            <Button size='large' color='primary' variant='raised' onClick={this.props.onAddNewDevice}>Add new device</Button>
          </div>
        ) : null }
      </div>
    );
  }
};

export default Devices;
