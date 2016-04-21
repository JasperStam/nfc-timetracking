import React from 'react';
import ActivityItem from './ActivityItem';
import styles from './ActivityList.css';

export default React.createClass({
    propTypes: {
        activities: React.PropTypes.array.isRequired,
        saveActivity: React.PropTypes.func.isRequired,
    },
    renderItem(activity) {
        return (<ActivityItem item={activity} key={activity.id} saveActivity={this.props.saveActivity} />);
    },
    render() {
        return (
            <div className={styles.container}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Claim</th>
                            <th>Tag</th>
                            <th>Date</th>
                            <th>Duration</th>
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
