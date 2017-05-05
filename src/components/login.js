import React, {Component} from 'react';
import Panel from 'muicss/lib/react/panel';

import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  height: '100vh',
  alignItems: 'center',
  background: 'url(http://sonin.agency/wp-content/uploads/2016/01/shutterstock_157963835-1940x1258.png)',
  backgroundSize: 'contain',
  backgroundPosition: 'center'
};

const formStyle = {
  minWidth: '30vw'
};

const center = {
  textAlign: 'center'
};

class Login extends Component {
  static propTypes = {
    onLogin: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    const username = localStorage.getItem('username');
    if (username) {
      this.props.onLogin(username);
    }
  }

  handleLogin() {
    if (this.state.username) {
      localStorage.setItem('username', this.state.username);
      this.props.onLogin(this.state.username);
    }
  }

  handleUsernameChange(ev) {
    this.setState({
      username: ev.target.value
    });
  }

  render() {
    return (
      <div style={containerStyle}>
        <Panel>
          <Form style={formStyle}>
            <legend style={center}>Devices Configuration</legend>
            <Input label='Username' floatingLabel required onChange={this.handleUsernameChange} />
            <Input type='password' label='Password' floatingLabel />
            <p style={center}>
              <Button variant='raised' onClick={this.handleLogin}>Log in</Button>
            </p>
          </Form>
        </Panel>
      </div>
    );
  }
};

export default Login;
