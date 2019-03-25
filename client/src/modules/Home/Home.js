import React, { Component } from 'react';
import { Header, Card, Image, Container } from 'semantic-ui-react';
import styles from './home.module.css';
import { Link } from 'react-router-dom';

class Home extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }
  render() {
    const {posts} = this.props;
    return (
      <Container>
        <Header as='h2' content='Welcome to our Mobile Store' className={styles.h2_view} textAlign='center' />
        <Card.Group itemsPerRow={3} >
        {
          posts && posts.map((post) => {
            return (
            <Card key={post._id}>
              <Image src={post.imageURL} />
              <Card.Content>
                <Card.Header>{post.text}</Card.Header>
                <Card.Meta>
                  <span>{post.date}</span>
                </Card.Meta>
                <Card.Description>{post.description}</Card.Description>
              </Card.Content>
            </Card>
            )
          })
        }
        </Card.Group>
        <div><Link className={styles.button_style}  to={`/catalog`}>Let's catalog!</Link></div> 
      </Container>
    );
  }
}

export default Home;


