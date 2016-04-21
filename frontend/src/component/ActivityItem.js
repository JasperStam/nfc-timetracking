import React from 'react';
import ItemClickable from './ItemClickable';
import ColorBox from './ColorBox';
import styles from './ActivityItem.css';

export default React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired,
        saveActivity: React.PropTypes.func.isRequired,
    },
    saveDescription(value) {
        this.props.saveActivity(this.props.item.id, value);
    },
    render() {
        const item = this.props.item;
        return (
            <tr>
                <td>{item.claim ? item.claim.title : 'None'}</td>
                <td><ColorBox color={item.tag.description} /></td>
                <td>{item.started_at.format('YYYY-MM-DD')} at {item.started_at.format('h:mm')}</td>
                <td>{item.started_ended_diff ? item.started_ended_diff.format('h[h] m[m] s[s]') : 'In progress'}</td>
                <td className={styles.expand}><ItemClickable value={item.description} save={this.saveDescription} /></td>
            </tr>
        );
    },
});
