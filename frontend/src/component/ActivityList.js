import React from 'react';
import ActivityItem from './ActivityItem';
import styles from './ActivityList.css';

export default React.createClass({
    propTypes: {
        activities: React.PropTypes.array.isRequired,
    },
    renderItem(activity) {
        return (<ActivityItem item={activity} key={activity.id} />);
    },
    render() {
        return (
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Claim</th>
                        <th>Tag</th>
                        <th>Date</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.activities.map(this.renderItem)}
                </tbody>
            </table>
        );
    },
});
