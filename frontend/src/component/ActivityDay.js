import React from 'react';
import ActivityItem from './ActivityItem';
import styles from './ActivityDay.css';
import moment from 'moment';

export default React.createClass({
    propTypes: {
        activities: React.PropTypes.array.isRequired,
        date: React.PropTypes.object.isRequired,
        saveActivity: React.PropTypes.func.isRequired,
    },
    renderItem(activity) {
        return (<ActivityItem item={activity} key={activity.id} saveActivity={this.props.saveActivity} />);
    },
    render() {
        moment().calendar(null, {
            sameDay: '[Today]',
            lastDay: '[Yesterday]',
            lastWeek: '[Last] dddd',
            sameElse: 'DD/MM/YYYY',
        });

        return (
            <div className={styles.container}>
                <h2>
                    {
                        this.props.date.calendar(null, {
                            sameDay: '[Today]',
                            lastDay: '[Yesterday]',
                            lastWeek: '[Last] dddd',
                            sameElse: 'DD/MM/YYYY',
                        })
                    }
                </h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Project</th>
                            <th>From</th>
                            <th>To</th>
                            <th className={styles.duration}>Duration</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.activities.map(this.renderItem)}
                    </tbody>
                </table>
            </div>
        );
    },
});
