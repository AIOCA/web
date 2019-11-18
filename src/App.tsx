import cookie from 'react-cookies';
import { Login } from './pages/login';
import { Register } from './pages/register';
import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import { Estimate } from './pages/estimate';
import './styles/App.scss';
import { NavigationDrawer, ListItem } from "react-md";
import { AdminPanel } from './pages/adminpanel';

import { COOKIE_OPTIONS } from './api/requests';
import { UserPanel } from './pages/userpanel';
import Home from './pages/home';
import { VerificationPanel } from './pages/verificationpanel';

//Helper functions
export function isAdmin() {
  let admin = cookie.load("admin");
  let loggedin = cookie.load("loggedin");
  if (loggedin === "true" && admin === "true") {
    return true
  }
  return false
}

//State definition for App
type State = {
  loggedin: any,
  navitems: {
    toLink: string;
    name: string;
  }[],
  admin: any
}

//Main class APP
//represents entire web app
class App extends Component<any, State> {
  state = {
    //loads logged in information from cookie
    loggedin: cookie.load("loggedin"),
    admin: cookie.load("admin"),
    navitems: [{ toLink: '', name: '' }]
    //TODO: add state for admin check
  };


  componentDidMount() {

    let navitems = [{ toLink: '/', name: 'Home' }]

    //TODO: add state for admin check
    if (this.state.loggedin === undefined) {
      console.log("user not logged in !!!!")
      //if user is not logged in
      navitems.push({ toLink: '/login', name: 'Login' })
      navitems.push({ toLink: '/register', name: 'Register' })

    } else {
      navitems.push({ toLink: '/usercp', name: 'UserPanel' })
      navitems.push({ toLink: '/verificationpanel', name: 'VerificationPanel' })
      navitems.push({ toLink: '/logout', name: 'Logout' })
    }


    if (this.state.admin === "true") {
      navitems.push({ toLink: '/admin', name: 'Admin Panel' })
    }

    this.setState({ navitems: navitems })
  }

  //Function called when user is logged in 
  //sets the cookie details to preserve logged in state
  //cookie contains loggedin status state and auth token to backend
  OnUserLoggedIn(token: string, admin: boolean, user: any) {
    this.setState({ loggedin: true, admin: admin })
    let options = COOKIE_OPTIONS;
    const expires = new Date();
    expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14);
    options.expires = expires;
    options.maxAge = 31536000;
    cookie.save("jwt", token, options)
    cookie.save("loggedin", true, options)
    cookie.save("admin", admin, options)
    cookie.save("username", user.display_name, options)
    window.location.href = "/"
  }

  //called when user logs out 
  //clears cookie details
  OnUserLogout() {
    try {

      cookie.remove("jwt", COOKIE_OPTIONS);
      cookie.remove("loggedin", COOKIE_OPTIONS);
      cookie.remove("admin", COOKIE_OPTIONS);
      if (!this.state.loggedin) {
        window.location.href = "/"
      } else {
        window.location.href = "/login"
      }
    } catch (error) {
      window.location.href = "/"
    }
  }

  //renders main app' NavigationDrawer
  //contains all routes
  //NOTE:add new routes here
  render() {

    //Prop for navitems
    const NavLink = ({ toLink, name }) => (
      <Route to={toLink} >
        {
          ({ match }) => {
            if (name === "Logout") {
              return (
                <ListItem
                  component={Link}
                  active={!!match}
                  to={toLink}
                  primaryText={name}
                  onClick={this.OnUserLogout}
                />
              );
            } else {

            }
            return (
              <ListItem
                component={Link}
                active={!!match}
                to={toLink}
                primaryText={name}
              />
            );
          }
        }
      </Route>
    );

    return (
      <div className="App">
        <NavigationDrawer drawerTitle="AIOC" toolbarTitle="All in One Commute APP"
          navItems={this.state.navitems.map(props => <NavLink {...props} key={props.toLink} />)}
          drawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
          footer={
            <footer>
              <p><br />
                2018 &copy;All in One Commute APP <span>All Rights Reserved</span>
              </p>
            </footer>
          }
        >
          <Route
            path="/"
            exact
            component={Home}
          />

          <Route
            path="/estimate"
            exact
            component={Estimate}
          />
          {this.state.loggedin === undefined ? (
            <Route
              path="/verificationpanel"
              render={props => <Redirect to="/" />}
            />
          ) : (
              <Route
                path="/verificationpanel"
                exact
                component={VerificationPanel}
              />
            )}

          {this.state.loggedin === undefined ? (
            <Route
              path="/login"
              render={props => <Login OnLoggedIn={this.OnUserLoggedIn.bind(this)} />}
            />
          ) : (
              <Route
                path="/login"
                render={props => <Redirect to="/" />}
              />
            )}
          {this.state.loggedin !== "true" ? (
            <Route
              path="/usercp"
              render={props => <Redirect to="/" />}
            />
          ) : (
              <Route
                path="/usercp"
                exact
                component={UserPanel}
              />

            )}
          {this.state.loggedin === undefined ? (
            <Route
              path="/register"
              render={props => <Register OnLoggedIn={this.OnUserLoggedIn.bind(this)} />}
            />
          ) : (
              <Route
                path="/register"
                render={props => <Redirect to="/" />}
              />
            )}

          {this.state.loggedin !== "true" || this.state.admin !== "true" ? (
            <Route
              path="/admin"
              render={props => <Redirect to="/" />}
            />
          ) : (
              <Route
                path="/admin"
                exact
                component={AdminPanel}
              />

            )}
        </NavigationDrawer>
      </div>
    );
  }
}

export default App;
