import React, { Component } from 'react';
import './App.css';
import {
  Route,
  withRouter,
  Switch
} from 'react-router-dom';

import { getCurrentUser } from '../util/APUtils';
import { ACCESS_TOKEN } from '../constants';

import AppHeader from '../common/AppHeader';
import LoadingIndicator from '../common/LoadingIndicatior';

import { Layout, notification } from 'antd';
const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: true
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });
  }
  loadCurrentUser() {
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: Response,
        isAuthenticated: true,
        isLoading: false
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });
    });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  handleLogout(redirectTo="/", notificationType="success", description="You're successfully logged out.") {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);

    notification[notificationType]({
      message: 'Polling App',
      description: description,
    });
  }

  render() {
    if(this.state.isLoading) {
      return <LoadingIndicator />
    }

    return (
      <Layout className="app-container">
        <AppHeader isAuthenticated={this.state.isAuthenticated}
        currentUser={this.state.currentUser}
        onLogout={this.handleLogout} />
        <Content className="app-content">
          <div className="container">
            <Switch>
              <Route exact path="/">
                </Route>
              <Route path ="/login"></Route>
              <Route path ="/signup"></Route>
              <Route path ="/users/:username">
              </Route>
              <Route></Route>
            </Switch>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default withRouter(App);