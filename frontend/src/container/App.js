import React from 'react';
import Header from 'component/Header';
import ActivityList from 'component/ActivityList';
import axios from 'axios';
import { normalizeActivity } from 'normalize';

const TEMP_DATA = [
    { id: 1, started_at: 1460548677, ended_at: 1460548777, tag: { id: 1, title: 'Red' }, claim: { id: 1, title: 'T7111' } },
    { id: 2, started_at: 1460548777, ended_at: 1460548795, tag: { id: 1, title: 'Red' }, claim: { id: 1, title: 'T7111' } },
].map(normalizeActivity);

export default React.createClass({
    getInitialState() {
        return {
            activities: TEMP_DATA,
        };
    },
    componentDidMount() {
        this.fetchActivities();
    },
    fetchActivities() {
        axios.get('/activities')
        .then((data) => {
            this.setState({ activities: data.map(normalizeActivity) });
        });
    },
    render() {
        return (
            <div>
                <Header />
                <ActivityList activities={this.state.activities} />
            </div>
        );
    },
});
