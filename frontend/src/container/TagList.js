import React from 'react';
import axios from 'axios';
import TagList from 'component/TagList';

export default React.createClass({
    getInitialState() {
        return {
            tags: [],
            claims: [],
        };
    },
    componentWillMount() {
        this.fetchTags();
        this.fetchClaims();
    },
    fetchTags() {
        axios.get(`${MODUS_CONFIG.apiUrl}/tag`)
        .then((payload) => {
            this.setState({ tags: payload.data.data });
        });
    },
    fetchClaims() {
        axios.get(`${MODUS_CONFIG.apiUrl}/claim`)
        .then((payload) => {
            this.setState({ claims: payload.data.data });
        });
    },
    saveClaim(tagId, title) {
        axios.post(`${MODUS_CONFIG.apiUrl}/claim`, {
            tag_id: tagId,
            title,
        });
    },
    saveTag(id, description) {
        axios.patch(`${MODUS_CONFIG.apiUrl}/tag/${id}`, {
            id,
            description,
        });
    },
    render() {
        return (
            <TagList
                tags={this.state.tags}
                claims={this.state.claims}
                saveClaim={this.saveClaim}
                saveTag={this.saveTag}
            />
        );
    },
});
