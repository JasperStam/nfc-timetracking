import React from 'react';
import TagList from 'component/TagList';

const TEMP_DATA = [
    { id: 1, code: '123APF23', description: '#ff0000', claim: { id: 1, title: 'Project A' } },
    { id: 2, code: '456KPQ23', description: '#00ff00', claim: null },
    { id: 3, code: '999TTT12', description: '#339933', claim: { id: 3, title: 'Project Q' } },
];

export default React.createClass({
    getInitialState() {
        return {
            tags: TEMP_DATA,
        };
    },
    render() {
        return (
            <TagList tags={this.state.tags} />
        );
    },
});
