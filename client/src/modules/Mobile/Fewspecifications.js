import React, { Component } from 'react'
import { Label, Table, Header } from 'semantic-ui-react';
import styles from './mobile.module.css';

class Fewspecifications extends Component {
  render() {
    const {mobile} = this.props;
    return (
      <div>
        <Table basic='very' celled collapsing>
            <Table.Body>
            {
              [
                {id:1, title: 'Display diagonal (inch)', propertyName:'display_diagonal'},
                {id:2, title: 'Display resolution (pix)', propertyName: 'display_resolution'},
                {id:3, title: 'Camera (MP)', propertyName: 'camera'},
                {id:4, title: 'Processor frequency (MHz)', propertyName: 'processor_frequency'}
              ].map(({ id, title, propertyName }) => (
                <Table.Row key={id}>
                  <Table.Cell textAlign='right'>
                  <Header>
                    <Header.Content>
                      {title}
                    </Header.Content>
                  </Header>
                  </Table.Cell>
                    {
                      mobile.fewspecifications && mobile.fewspecifications.map((spec) => (
                        <Table.Cell key={spec.id}>
                                  {spec[propertyName]}
                        </Table.Cell>
                      ))
                    }
                </Table.Row>
              ))
            }
              <Table.Row>
                <Table.Cell textAlign='right'>
                  <Header>
                    <Header.Content>
                      Rating
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{mobile.rating} <i className="star outline icon"></i></Table.Cell>
              </Table.Row>
            </Table.Body>
        </Table>
        {
          mobile.sale ? 
          <Label className={styles.sale_label_styles} attached='top right'><span className={styles.sale_style}>Sale</span></Label>
          : null
        }
      </div>
    )
  }
}

export default Fewspecifications