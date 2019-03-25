import React, { Component } from 'react'
import styles from './changepassword.module.css'
import { Grid, Header, Form, Segment, Button } from 'semantic-ui-react';

class ChangePassword extends Component {
  state = {
    email: "",
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/catalog")
    }
  }

  onSubmit = e => {
    e.preventDefault();
    //
  };

  render() {
    const { errors } = this.state;
    return (
    <div className={styles.changepassword_wrapper}>
      <Grid textAlign='center' verticalAlign='middle' className={styles.grid_fullwidth}>
        <Grid.Column >
          <Header as='h2' textAlign='center'>
            Reset password
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
                    className={errors.email || errors.emailnotfound ? styles.email_error : ''}
                  />
                <span className={styles.email_error_msg}>{errors.email}{errors.emailnotfound}</span>  
            </Form.Field>
              <Button className={styles.btn_reset} type="submit">
                  Reset
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
    )
  }
}

export default ChangePassword;
