import React from 'react';
import ItemClickable from './ItemClickable';
import styles from './TagItem.css';

export default React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired,
    },
    render() {
        const item = this.props.item;
        return (
            <tr>
                <td><div style={{ background: item.description }} className={styles.colorBox}></div></td>
                <td><ItemClickable value={item.claim ? item.claim.title : null} /></td>
            </tr>
        );
    },
});
