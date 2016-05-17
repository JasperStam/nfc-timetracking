import React from 'react';
import Header from 'component/Header';
import ActivityList from 'component/ActivityList';
import TagList from './TagList';
import TrackingList from 'component/TrackingList';
import styles from './App.css';
import axios from 'axios';
import { normalizeActivity } from 'normalize';

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
    fetchActivities() {
        axios.get(`${MODUS_CONFIG.apiUrl}/activity`)
        .then((payload) => {
            this.setState({ activities: payload.data.data.map(normalizeActivity) });
        });
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
            <div className={styles.container}>
                <Header />
                <div className={styles.layout}>
                    <ActivityList activities={this.state.activities} saveActivity={this.saveActivity} />
                    <TagList />
                </div>
                <TrackingList activities={this.state.activities} saveActivity={this.saveActivity} />
            </div>
        );
    },
});
