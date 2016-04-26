import React from 'react';
import ActivityList from 'component/ActivityList';
import axios from 'axios';
import { normalizeActivity } from 'normalize';

const REFRESH_INTERVAL = 100000000;

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
        return axios.patch(`${MODUS_CONFIG.apiUrl}/activity/${id}`, data);
    },
    render() {
        return (
            <ActivityList activities={this.state.activities} saveActivity={this.saveActivity} />
        );
    },
});
