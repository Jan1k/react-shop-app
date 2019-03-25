import React, { Component } from 'react'
import styles from './colors.module.css';


class Colors extends Component {
  render() {
    const { mobile } = this.props;
    return (
      <div className={styles.row_colors}>
          <div>Available colors:</div>
            {mobile.colors.map(item => <div key={item.id} className={styles.colors_style}
             style={{ height: 20, width: 20, backgroundColor: item.color }}>
          </div>)}
      </div>
    )
  }
}

export default Colors;
