import React, { Component } from 'react'
import styles from './notfound.module.css'
import { Link } from 'react-router-dom';

export default class componentName extends Component {
  render() {
    return (
      <div>
        <div className={styles.idnotfound}>
          <div className={styles.notfound}>
            <div className={styles.notfound404}>
              <h1>Oops!</h1>
            </div>
            <h1>404 - Page not found</h1>
            <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
            <Link size='large' className={styles.link_styles} to={`/home`}>Go To Homepage</Link>
          </div>
        </div>
      </div>
    )
  }
}
