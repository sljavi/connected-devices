import React, {Component} from 'react';
import Login from './login';
import TopBar from './top-bar';
import Container from 'muicss/lib/react/container';
import Devices from './devices';
import EditDevice from './edit-device';
import _ from 'lodash';
import io from 'socket.io-client';
import Navigo from 'navigo';
import ControlDevice from './control-device';

class Main extends Component {
  static propTypes = {
    control: React.PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      addingNewDevice: false,
      editingDevice: false,
      control: this.props.control
    };
    this.handleOnLogin = this.handleOnLogin.bind(this);
    this.handleAddNewDevice = this.handleAddNewDevice.bind(this);
    this.handleSavedDevice = this.handleSavedDevice.bind(this);
    this.handleUpdatedDevice = this.handleUpdatedDevice.bind(this);
    this.handleEditDevice = this.handleEditDevice.bind(this);
    this.handleRemoveDevice = this.handleRemoveDevice.bind(this);
    this.showDeviceSettings = this.showDeviceSettings.bind(this);
    this.showControl = this.showControl.bind(this);
    this.onControlDevice = this.onControlDevice.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    this.router = new Navigo(null, true);
    this.router
    .on({
      add: () => {

      },
      edit: () => {

      },
      control: () => {
        this.setState({
          control: true,
          editingDevice: false,
          controlDevice: false
        });
      },
      'control/device': () => {
        if (!this.state.controlDevice) {
          this.router.navigate('control');
        }
        this.setState({
          control: true
        });
      },
      '*': data => {
        this.setState({
          editingDevice: false,
          controlDevice: false
        });
      }
    })
    .resolve();
  }

  initRemoteSync(username) {
    this.socket = io(`http://${location.hostname}:3000`);
    this.socket.on('connect', () => {
      this.socket.on(this.state.username, devices => {
        this.setState({devices});
        if (this.state.controlDevice) {
          this.setState({
            controlDevice: devices.find(device => device.id === this.state.controlDevice.id)
          });
        }
        if (this.state.editingDevice) {
          this.setState({
            editingDevice: devices.find(device => device.id === this.state.editingDevice.id)
          });
        }
      });
      this.socket.emit('requestDevicesStatus', this.state.username);
    });
  }

  updateRemoteStatus(devices, username) {
    this.socket.emit('deviceChanged', {devices, username});
  }

  handleOnLogin(username) {
    this.setState({
      username
    });
    this.initRemoteSync(username);
  }

  getDefaultDevice() {
    return {
      id: Date.now(),
      name: '',
      ip: '',
      type: this.getDeviceTypes()[0]
    };
  }

  handleAddNewDevice() {
    this.router.navigate('add');
    this.setState({
      editingDevice: this.getDefaultDevice()
    });
  }

  getDeviceTypes() {
    const deviceTypes = this.state.devices.reduce((deviceTypes, device) => {
      if (!deviceTypes[device.type.id]) {
        deviceTypes[device.type.id] = device.type;
      }
      return deviceTypes;
    }, {});
    return _.values(deviceTypes);
  }

  getWidgetTypes() {
    const widgets = this.state.devices.reduce((widgets, device) => {
      device.type.controls.forEach(control => {
        if (!widgets[control.widget.id]) {
          widgets[control.widget.id] = control.widget;
        }
      });
      return widgets;
    }, {});
    return _.values(widgets);
  }

  updateDevice(savedDevice) {
    const deviceIndex = this.state.devices.findIndex(device => device.id === savedDevice.id);
    let newDevices = [...this.state.devices];
    if (deviceIndex >= 0) {
      newDevices[deviceIndex] = savedDevice;
    } else {
      newDevices = newDevices.concat([savedDevice]);
    }

    this.setState({
      devices: newDevices
    });
    this.updateRemoteStatus(newDevices, this.state.username);
  }

  handleSavedDevice(savedDevice) {
    this.updateDevice(savedDevice);
  }

  handleUpdatedDevice(updateDevice) {
    this.updateDevice(updateDevice);
    this.setState({
      controlDevice: this.state.devices.find(device => device.id === updateDevice.id)
    });
  }

  handleRemoveDevice(removedDevice) {
    const newDevices = this.state.devices.filter(device => device.id !== removedDevice.id);
    this.setState({
      devices: newDevices
    });
    this.updateRemoteStatus(newDevices, this.state.username);
  }

  handleEditDevice(device) {
    this.router.navigate('edit');
    this.setState({
      editingDevice: device
    });
  }

  showDeviceSettings() {
    this.setState({
      control: false,
      controlDevice: false
    });
    this.router.navigate('');
  }

  showControl() {
    this.setState({
      control: true
    });
    this.router.navigate('control');
  }

  onControlDevice(device) {
    this.setState({
      controlDevice: device
    });
    this.router.navigate('control/device');
  }

  logout() {
    localStorage.setItem('username', '');
    this.setState({
      username: ''
    });
  }

  render() {
    if (!this.state.username) {
      return (<Login onLogin={this.handleOnLogin}/>);
    }

    let MainComponent;
    let title;

    if (this.state.editingDevice) {
      title = this.state.editingDevice.name ? 'Edit device' : 'Add new device';
      MainComponent = (
        <EditDevice
          deviceTypes={this.getDeviceTypes()}
          widgets={this.getWidgetTypes()}
          onSave={this.handleSavedDevice}
          device={this.state.editingDevice}
          onExit={() => this.setState({editingDevice: false})}
        />
      );
    } else if (this.state.controlDevice) {
      title = 'Control device';
      MainComponent = (
        <ControlDevice device={this.state.controlDevice} updateDevice={this.handleUpdatedDevice}/>
      );
    } else {
      title = 'Devices';
      MainComponent = (
        <Devices
          devices={this.state.devices || []}
          onAddNewDevice={this.handleAddNewDevice}
          onEditDevice={this.handleEditDevice}
          onRemoveDevice={this.handleRemoveDevice}
          control={!!this.state.control}
          onControlDevice={this.onControlDevice}/>
      );
    }

    return (
      <div>
        <TopBar title={title} showDeviceSettings={this.showDeviceSettings} showControl={this.showControl} logout={this.logout}/>
        <Container>{MainComponent}</Container>
      </div>
    );
  }
};

export default Main;
