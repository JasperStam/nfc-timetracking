import React from 'react';
import ItemClickable from './ItemClickable';
import InProgress from './InProgress';
import styles from './ActivityItem.css';

export default React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired,
        saveActivity: React.PropTypes.func.isRequired,
    },
    saveDescription(value) {
        this.props.saveActivity(this.props.item.id, value);
    },
    renderTime(at) {
        if (!at) {
            return (
                <InProgress />
            );
        }

        return (
            <div>
                {at.format('LT')}
                <span className={styles.light}>{at.format(':ss')}</span>
            </div>
        );
    },
    render() {
        const item = this.props.item;

        return (
            <tr>
                <td>{item.claim ? item.claim.title : (<em>None</em>)}</td>
                <td>{this.renderTime(item.started_at)}</td>
                <td>{this.renderTime(item.ended_at)}</td>
                <td>{item.started_ended_diff ? item.started_ended_diff.format('h[h] m[m] s[s]') : 'In progress'}</td>
                <td className={styles.expand}><ItemClickable value={item.description} save={this.saveDescription} /></td>
            </tr>
        );
    },
});
