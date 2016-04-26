import React from 'react';
import ActivityItem from './ActivityItem';
import styles from './ActivityList.css';

export default React.createClass({
    propTypes: {
        activities: React.PropTypes.array.isRequired,
        saveActivity: React.PropTypes.func.isRequired,
        saveStartedAt: React.PropTypes.func.isRequired,
    },
    renderItem(activity) {
        return (<ActivityItem item={activity} key={activity.id} saveActivity={this.props.saveActivity} saveStartedAt={this.props.saveStartedAt} />);
    },
    render() {
        return (
            <div className={styles.container}>
                <h1>Today’s activities</h1>
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
