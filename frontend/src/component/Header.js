import React from 'react';
import styles from './Header.css';

export default React.createClass({
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.navigation}>
                    <div className={styles.selected}>
                        <a href="#" className={styles.button}>Activiteiten</a>
                    </div>
                    <a href="#" className={styles.button}>Inzichten</a>
                </div>
                <a className={styles.button} href="#">Uitloggen</a>
            </div>
        );
    },
});
