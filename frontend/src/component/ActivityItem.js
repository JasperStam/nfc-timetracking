import React from 'react';
import ItemClickable from './ItemClickable';

export default React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired,
    },
    render() {
        const item = this.props.item;
        return (
            <tr>
                <td>{item.claim.title}</td>
                <td>{item.tag.description}</td>
                <td>{item.started_at.format('YYYY-MM-DD')}</td>
                <td>{item.started_ended_diff ? item.started_ended_diff.format('h[h] m[m] s[s]') : 'In progress'}</td>
                <td><ItemClickable value={item.description} /></td>
            </tr>
        );
    },
});
