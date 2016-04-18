import React from 'react';
import styles from './ColorBox.css';

export default React.createClass({
    propTypes: {
        color: React.PropTypes.string,
    },
    render() {
        return (
            <div style={{ background: this.props.color }} className={styles.container}></div>
        );
    },
});
