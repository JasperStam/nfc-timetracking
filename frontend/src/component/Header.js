import React from 'react';
import styles from './Header.css';

export default React.createClass({
    render() {
        return (
            <div className={styles.container}>
                <h1 className={styles.header}>Modus</h1>
            </div>
        );
    },
});
