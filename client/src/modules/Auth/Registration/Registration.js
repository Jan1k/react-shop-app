import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import styles from './registration.module.css'
import { Grid, Header, Form, Segment, Button } from 'semantic-ui-react';

class Registration extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/catalog")
    }
  }

  componentWillReceiveProps( nextProps ) {
    if ( nextProps.errors ) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      firstname:this.state.firstname,
      lastname:this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
  };
    this.props.registerUser(newUser, this.props.history);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className={styles.registration_wrapper}>
      <Grid textAlign='center' verticalAlign='middle' className={styles.grid_fullwidth}>
        <Grid.Column >
          <Header as='h2' textAlign='center'>
            Registration
          </Header>
          <Form size='large' noValidate onSubmit={this.onSubmit}>
            <Segment stacked className={styles.no_bg}>
            <Form.Field>
              <label htmlFor="firstname">Firstname</label>
              <input
                    placeholder="Enter firstname"
                    onChange={this.onChange}
                    value={this.state.firstname}
                    error={errors.firstname}
                    id="firstname"
                    type="text"
                    className={ errors.firstname ? styles.registration_error : ''}
                  />
              <span className={styles.registration_error_msg}>{errors.firstname}</span>
            </Form.Field>
            <Form.Field>
              <label htmlFor="lastname">Lastname</label>
              <input
                    placeholder="Enter lastname"
                    onChange={this.onChange}
                    value={this.state.lastname}
                    error={errors.lastname}
                    id="lastname"
                    type="text"
                    className={ errors.lastname ? styles.registration_error : ''}
                  />
              <span className={styles.registration_error_msg}>{errors.lastname}</span>
            </Form.Field>
            <Form.Field>
              <label htmlFor="email">Email</label>
              <input
                    placeholder="Enter email"
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    id="email"
                    type="email"
                    className={ errors.email ? styles.registration_error : ''}
                  />
              <span className={styles.registration_error_msg}>{errors.email}</span> 
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
                    className={ errors.password ? styles.registration_error : ''}
                  />
              <span className={styles.registration_error_msg}>{errors.password}</span>     
            </Form.Field>
            <Form.Field>
              <label htmlFor="password2">Confirm Password</label>   
              <input
                    placeholder="Repeat password"
                    onChange={this.onChange}
                    value={this.state.password2}
                    error={errors.password2}
                    id="password2"
                    type="password"
                    className={ errors.password2 ? styles.registration_error : ''}
                  />
              <span className={styles.registration_error_msg}>{errors.password2}</span>         
            </Form.Field>
              <Button className={styles.btn_signup} type="submit">
                  Sign up
              </Button>
            </Segment>
          </Form>
          <Grid.Row>
              <Link className={styles.link_color} to="/login">Already have an account? Login</Link>
          </Grid.Row>
        </Grid.Column>
          
      </Grid>
    </div>
    )
  }
}

export default Registration;