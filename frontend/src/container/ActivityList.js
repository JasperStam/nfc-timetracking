import React from 'react';
import ActivityList from 'component/ActivityList';
import axios from 'axios';

export default React.createClass({
    propTypes: {
        activities: React.PropTypes.array.isRequired,
    },
    saveActivity(id, data) {
        return axios.patch(`${MODUS_CONFIG.apiUrl}/activity/${id}`, data)
        .then(() => {
            // TODO: Not necessary for now because we refresh every sec.
            // const activityIndex = _.findIndex(this.state.activities, { id });
            // const activities = _.clone(this.state.activities);
            // activities[activityIndex] = normalizeActivity(payload);
            // this.setState({ activities });
        });
    },
    render() {
        return (
            <ActivityList activities={this.props.activities} saveActivity={this.saveActivity} />
        );
    },
});
