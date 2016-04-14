import React from 'react';

export default React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired,
    },
    render() {
        const item = this.props.item;
        return (
            <tr>
                <td>{item.claim.title}</td>
                <td>{item.tag.title}</td>
                <td>{item.started_at.format('YYYY-MM-DD')}</td>
                <td>{item.started_ended_diff.format('h[h] m[m] s[s]')}</td>
            </tr>
        );
    },
});
