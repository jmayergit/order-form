import React, { Component } from 'react';
import styles from './Form.module.css';

class Form extends Component {
    render() {
      return (
        <div>
          <div className={styles.progressBar}>
            <div>Step 1</div>
            <div>Step 2</div>
            <div>Step 3</div>
            <div>Review</div>
          </div>
        </div>
      )
    }
}

export default Form;
