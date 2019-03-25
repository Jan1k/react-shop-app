import React, { Component } from 'react'
import { Grid, Form, Segment, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styles from './login.module.css'

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };
  
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/catalog")
    }
  }
  
  componentWillReceiveProps( nextProps ) {
    if ( nextProps.auth.isAuthenticated ) {
      this.props.history.push("/home");
    }
    if ( nextProps.errors ) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  };
  render() {
    const { errors } = this.state;
    return (
      <div className={styles.login_wrapper}>
      
      <Grid textAlign='center' verticalAlign='middle' className={styles.grid_fullwidth}>
        <Grid.Column >
          <Header as='h2' textAlign='center'>
            Login
          </Header>
          <Form size='large' noValidate onSubmit={this.onSubmit}>
            <Segment stacked className={styles.no_bg}>
            <Form.Field>
              <label htmlFor="email">Email</label>
              <input
                    placeholder="Enter email"
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    id="email"
                    type="email"
                    className={errors.email || errors.emailnotfound ? styles.login_error : ''}
                  />
                <span className={styles.login_error_msg}>{errors.email}{errors.emailnotfound}</span>  
            </Form.Field>
            <Form.Field>
              <label htmlFor="password">Password</label>
              <input
                    placeholder="Enter password"
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    id="password"
                    type="password"
                    className={errors.password || errors.passwordincorrect ? styles.login_error : ''}
                  />
              <span className={styles.login_error_msg}>{errors.password}{errors.passwordincorrect}</span>      
            </Form.Field>
              <Button className={styles.btn_login} type="submit">
                  Login
              </Button>
            </Segment>
          </Form>
          <Grid.Row className={styles.links}>
              <Link className={styles.link_color} to="/reset">Forgot password ?</Link>
              <Link className={styles.link_color} to="/registration">Don't have an account? Registration now</Link>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </div>
    )
  }
}

export default Login;