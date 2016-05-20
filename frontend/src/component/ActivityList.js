import React from 'react';
import ActivityDay from './ActivityDay';
import _ from 'lodash';
import styles from './ActivityList.css';

export default React.createClass({
    propTypes: {
        activities: React.PropTypes.array.isRequired,
        saveActivity: React.PropTypes.func.isRequired,
    },
    renderDay(activities) {
        const date = activities[0].started_at;

        return (<ActivityDay
            activities={activities}
            key={date.toDate()}
            date={date}
            saveActivity={this.props.saveActivity}
        />);
    },
    render() {
        const days = _.values(_.groupBy(this.props.activities, (activity) => activity.started_at.get('date')));

        return (
            <div className={styles.container}>
                {_.map(days, this.renderDay)}
            </div>
        );
    },
});
