import React from 'react';
import ActivityList from 'component/ActivityList';
import axios from 'axios';
import { normalizeActivity } from 'normalize';
// import _ from 'lodash';

const REFRESH_INTERVAL = 1000;

export default React.createClass({
    getInitialState() {
        return {
            activities: [],
        };
    },
    componentWillMount() {
        this.fetchActivities();
        this.reFetchInterval = setInterval(this.fetchActivities, REFRESH_INTERVAL);
    },
    componentWillUnmount() {
        clearInterval(this.reFetchInterval);
    },
    fetchActivities() {
        axios.get(`${MODUS_CONFIG.apiUrl}/activity`)
        .then((payload) => {
            this.setState({ activities: payload.data.data.map(normalizeActivity) });
        });
    },
    saveActivity(id, data) {
        return axios.patch(`${MODUS_CONFIG.apiUrl}/activity/${id}`, data)
        .then((payload) => {
            // TODO: Not necessary for now because we refresh every sec.
            // const activityIndex = _.findIndex(this.state.activities, { id });
            // const activities = _.clone(this.state.activities);
            // activities[activityIndex] = normalizeActivity(payload);
            // this.setState({ activities });
        });
    },
    render() {
        return (
            <ActivityList activities={this.state.activities} saveActivity={this.saveActivity} />
        );
    },
});
