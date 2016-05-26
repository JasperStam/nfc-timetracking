import React from 'react';
import ActivityItem from './ActivityItem';
import styles from './ActivityDay.css';

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
        return (
            <div className={styles.container}>
                <h2 className={styles.date}>
                    {
                        this.props.date.locale('nl').calendar(null, {
                            sameDay: '[Vandaag]',
                            lastDay: '[Gisteren]',
                            lastWeek: '[Afgelopen] dddd',
                            sameElse: 'dddd DD MMM',
                        })
                    }
                </h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Project</th>
                            <th>Vanaf</th>
                            <th>Tot</th>
                            <th className={styles.duration}>Duur</th>
                            <th>Beschrijving</th>
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
