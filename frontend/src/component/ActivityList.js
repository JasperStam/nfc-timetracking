import React from 'react';
import ActivityItem from './ActivityItem';

export default React.createClass({
    propTypes: {
        activities: React.PropTypes.array.isRequired,
    },
    renderItem(activity) {
        return (<ActivityItem item={activity} key={activity.id} />);
    },
    render() {
        return (
            <table width="100%">
                <thead>
                    <tr>
                        <th>Claim</th>
                        <th>Tag</th>
                        <th>Date</th>
                        <th>Time ago</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.activities.map(this.renderItem)}
                </tbody>
            </table>
        );
    },
});
