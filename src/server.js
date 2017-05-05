var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var request = require('superagent');
var _ = require('lodash');

function getNumbersUntil(n) {
  return [...Array(n).keys()].map(key => `${key}`);
}

const api = 'https://automation-prototype.herokuapp.com/citrus-light/power';

const defaultDevices = [{
  id: 1,
  name: 'Samsung Audio',
  ip: '11.11.11.11',
  type: {
    id: 1,
    icon: 'music',
    name: 'Sound device',
    api: 'http://bar',
    controls: [{
      id: 1,
      name: 'Power',
      selectedOption: 'on',
      widget: {
        id: 1,
        name: 'Switch',
        options: ['on', 'off']
      }
    }, {
      id: 2,
      name: 'Volume',
      selectedOption: '70',
      widget: {
        id: 2,
        name: 'Range',
        options: getNumbersUntil(100)
      }
    }, {
      id: 3,
      name: 'Playlist',
      selectedOption: 'track 1',
      widget: {
        id: 3,
        name: 'Select',
        options: ['track 1', 'track 2', 'track 3']
      }
    }]
  }
}, {
  id: 2,
  name: 'Sony Audio',
  ip: '12.11.10.9',
  type: {
    id: 1,
    icon: 'music',
    name: 'Sound device',
    api: 'http://bar',
    controls: [{
      id: 1,
      name: 'Power',
      selectedOption: 'on',
      widget: {
        id: 1,
        name: 'Switch',
        options: ['on', 'off']
      }
    }, {
      id: 2,
      name: 'Volume',
      selectedOption: '70',
      widget: {
        id: 2,
        name: 'Range',
        options: getNumbersUntil(100)
      }
    }, {
      id: 3,
      name: 'Playlist',
      selectedOption: 'track 1',
      widget: {
        id: 3,
        name: 'Select',
        options: ['track 1', 'track 2', 'track 3']
      }
    }]
  }
}, {
  id: 3,
  name: 'Apple TV',
  ip: '6.7.8.9',
  type: {
    id: 2,
    name: 'TV device',
    icon: 'television',
    api: 'http://foo',
    controls: [{
      id: 1,
      name: 'Power',
      selectedOption: 'on',
      widget: {
        id: 1,
        name: 'Switch',
        options: ['on', 'off']
      }
    }, {
      id: 2,
      name: 'Volume',
      selectedOption: '70',
      widget: {
        id: 2,
        name: 'Range',
        options: getNumbersUntil(100)
      }
    }, {
      id: 3,
      name: 'Brightness',
      selectedOption: '50',
      widget: {
        id: 2,
        name: 'Range',
        options: getNumbersUntil(100)
      }
    }]
  }
}, {
  id: 4,
  name: 'Citrus Lights',
  ip: '1.2.3.4',
  type: {
    id: 3,
    name: 'Lights',
    icon: 'lightbulb-o',
    api: api,
    controls: [{
      id: 1,
      name: 'Power',
      selectedOption: 'on',
      widget: {
        id: 1,
        name: 'Switch',
        options: ['on', 'off']
      }
    }]
  }
}];

const devices = {};

function callApi(oldDevices, newDevices) {
  newDevices.forEach(device => {
    if (device.type.api === api) {
      const oldDevice = oldDevices.find(oldDevice => oldDevice.id === device.id);
      if (device.type.id === oldDevice.type.id) {
        device.type.controls.forEach((control, index) => {
          const oldOption = _.get(oldDevice, `type.controls[${index}].selectedOption`);
          if (oldOption !== control.selectedOption) {
            request
              .post(api)
              .end(function(err, res) {
                if (err) {
                  return console.log(err);
                }
                console.log(res.status);
              });
          }
        });
      }
    }
  });
}

io.on('connection', function(socket) {
  socket.on('deviceChanged', function(data) {
    console.log('deviceChanged');
    callApi(devices[data.username], data.devices);
    devices[data.username] = data.devices;
    io.emit(data.username, data.devices);
  });

  socket.on('requestDevicesStatus', function(username) {
    if (!devices[username]) {
      console.log('requestDevicesStatus', 'default devices');
      devices[username] = defaultDevices;
    }
    console.log('requestDevicesStatus');
    io.emit(username, devices[username]);
  });
});

http.listen(port, function() {
  console.log('listening on *:' + port);
});
