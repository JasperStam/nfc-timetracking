import React from 'react';
import ActivityList from 'component/ActivityList';
import axios from 'axios';
import { normalizeActivity } from 'normalize';

const TEMP_DATA = [
    { id: 1, started_at: 1460548677, ended_at: 1460548777, description: 'Took your mom', tag: { id: 1, description: 'Red' }, claim: { id: 1, title: 'T7111' } },
    { id: 2, started_at: 1460548777, ended_at: null, description: null, tag: { id: 1, title: 'Red' }, claim: { id: 1, title: 'T7111' } },
].map(normalizeActivity);

const REFRESH_INTERVAL = 10000000;

export default React.createClass({
    getInitialState() {
        return {
            activities: TEMP_DATA,
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
        axios.get('/activities')
        .then((data) => {
            this.setState({ activities: data.map(normalizeActivity) });
        });
    },
    render() {
        return (
            <ActivityList activities={this.state.activities} />
        );
    },
});
