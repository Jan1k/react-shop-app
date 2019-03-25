import React, { Component } from 'react'
import { Grid, Card, Image } from 'semantic-ui-react';
import styles from './mobile.module.css';


class Images extends Component {
  state = {
    selectedImageIndex: 0,
  }

  onClickHandler = (e) => {
		this.setState({
			selectedImageIndex: e.target.dataset.index
    })
  }
  render() {
    const { mobile } = this.props;
    return (
        <>
          <h1 className={styles.text_aligned}>{mobile.name}</h1>
          <div className={styles.row_images}>
          <Card className={styles.card_main_img}> 
            <Image className={styles.main_img_styles} src={mobile.images && mobile.images[this.state.selectedImageIndex]["link"]} alt="image"/>
          </Card>
          <Grid className={styles.my_grid}>
            {
              mobile.images && mobile.images.map((image,index) => (
                <Card key={image.id} className={styles.card_images_styles}>
                  <Image onClick={this.onClickHandler} className={styles.images_styles} src={image.link} alt="image" data-index={index}/>
                </Card>
              ))
            }
          </Grid>
          </div>
        </>
    )
  }
}
export default Images