import React, { Component } from 'react'
import { Container, Divider, Header, Icon } from 'semantic-ui-react';
import styles from './mobile.module.css';

class Description extends Component {
  render() {
    const {mobile} = this.props;
      return(
        <Container text>
          <Divider horizontal>
            <Header as='h4'>
              <Icon name='tag' />
              Description
            </Header>
          </Divider>
        {
          mobile.description && mobile.description.map((description,id) => (
            <React.Fragment key={id}>
              <Header as='h2' className={styles.text_aligned}>{description.title}</Header>
              <p>
                {description.text}
              </p>
            </React.Fragment>
            ))
        }
        
      </Container>
      )
    
  }
}

export default Description