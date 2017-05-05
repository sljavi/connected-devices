import React, {Component} from 'react';
import Appbar from 'muicss/lib/react/appbar';
import Container from 'muicss/lib/react/container';
import Button from 'muicss/lib/react/button';

const appBarStyle = {
  marginBottom: '1.5em'
};

const appBarContainerStyle = {
  paddingTop: '1em',
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap'
};

const titleStyle = {
  fontSize: '1.6em',
  margin: 0,
  padding: 0
};

class Main extends Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    showDeviceSettings: React.PropTypes.func.isRequired,
    showControl: React.PropTypes.func.isRequired,
    logout: React.PropTypes.func.isRequired
  }

  render() {
    return (
      <Appbar style={appBarStyle}>
        <Container>
          <div style={appBarContainerStyle}>
            <h1 style={titleStyle}>{this.props.title}</h1>
            <span>
              <Button onClick={this.props.logout}>Log out</Button>
            </span>
          </div>
        </Container>
      </Appbar>
    );
  }
};

export default Main;
