import React, { Component } from 'react'
import { Container, Divider, Header, Icon, Comment, Button, Modal, Image, TextArea } from 'semantic-ui-react';
import styles from './mobile.module.css';

class Reviews extends Component {
  state = {
    open:false
  }
  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, dimmer } = this.state;
    const { mobile } = this.props;

    return (
      <Container text>
      <Divider horizontal>
          <Header as='h4'>
            <Icon name='pencil alternate' />
            Reviews
          </Header>
      </Divider>
      <div>{mobile.reviews && mobile.reviews.map((review) =>
        <Comment.Group key={review.id}>
        <Comment>
          <Comment.Content>
            <Comment.Author>{review.username}</Comment.Author>
            <Comment.Metadata>
              <div>{review.date_created}</div>
            </Comment.Metadata>
            <Comment.Text>{review.text}</Comment.Text>
            <Comment.Text><Icon className='plus'/> {review.positive}</Comment.Text>
            <Comment.Text><Icon className='minus'/> {review.negative}</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
              <Divider horizontal></Divider>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
        
        </Comment.Group>)}
      </div>
      <div className={styles.block_center}>
      <Button className="ui primary button" onClick={this.show('blurring')}>Write review</Button>
      <Modal dimmer={dimmer} open={open} onClose={this.close}>
        <Modal.Header></Modal.Header>
        <Modal.Content image>
          <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
          <Modal.Description className={styles.textarea_description}>
            <Header>Write review</Header>
            <p className={styles.p_styles}><TextArea className={styles.textarea_styles} placeholder='Positive moments:'/></p>
            <p className={styles.p_styles}><TextArea className={styles.textarea_styles} placeholder='Negative moments:'/></p>
            <p className={styles.p_styles}><TextArea className={styles.textarea_styles} placeholder='Enter your comment:'/></p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
        <p>* Publication of review produced after pre-moderation </p>
        <Button color='red' inverted onClick={this.close}>
          <Icon name='remove' /> Cancel
        </Button>
        <Button color='green' inverted onClick={this.close}>
          <Icon name='checkmark'/> Send review
        </Button>
      </Modal.Actions>
      </Modal>
      </div>
      </Container>
    )
  }
}



export default Reviews;
