import React from 'react';
import Header from 'component/Header';
import ActivityList from './ActivityList';
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
    render() {
        return (
            <div className={styles.container}>
                <Header />
                <div className={styles.layout}>
                    <ActivityList activities={this.state.activities} />
                    <TagList />
                </div>
                <TrackingList activities={this.state.activities} />
            </div>
        );
    },
});
