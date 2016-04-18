import React from 'react';
import axios from 'axios';
import TagList from 'component/TagList';

export default React.createClass({
    getInitialState() {
        return {
            tags: [],
        };
    },
    componentWillMount() {
        this.fetchTags();
    },
    fetchTags() {
        axios.get(`${MODUS_CONFIG.apiUrl}/tag`)
        .then((payload) => {
            this.setState({ tags: payload.data.data });
        });
    },
    render() {
        return (
            <TagList tags={this.state.tags} />
        );
    },
});
