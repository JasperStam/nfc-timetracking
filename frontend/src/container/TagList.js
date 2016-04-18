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
    saveClaim(tagId, title) {
        axios.post(`${MODUS_CONFIG.apiUrl}/claim`, {
            tag_id: tagId,
            title,
        });
    },
    render() {
        return (
            <TagList tags={this.state.tags} saveClaim={this.saveClaim} />
        );
    },
});
