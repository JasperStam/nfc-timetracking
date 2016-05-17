import React from 'react';
import ItemClickable from './ItemClickable';
import Time from './Time';
import styles from './ActivityItem.css';
import Duration from './Duration';

export default React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired,
        saveActivity: React.PropTypes.func.isRequired,
    },
    saveDescription(value) {
        this.props.saveActivity(this.props.item.id, { description: value });
    },
    saveStartedAt(hour, minute) {
        const startedAt = this.props.item.started_at
            .clone()
            .hour(hour)
            .minute(minute);
        this.props.saveActivity(this.props.item.id, { started_at: startedAt.format() });
    },
    saveEndedAt(hour, minute) {
        const endedAt = this.props.item.ended_at
            .clone()
            .hour(hour)
            .minute(minute);
        this.props.saveActivity(this.props.item.id, { ended_at: endedAt.format() });
    },
    render() {
        const item = this.props.item;

        return (
            <tr>
                <td>{item.claim ? item.claim.title : (<em>None</em>)}</td>
                <td><Time at={item.started_at} save={this.saveStartedAt} /></td>
                <td><Time at={item.ended_at} save={this.saveEndedAt} /></td>
                <td className={styles.duration}><Duration duration={item.started_ended_diff} /></td>
                <td className={styles.expand}><ItemClickable value={item.description} save={this.saveDescription} /></td>
            </tr>
        );
    },
});
