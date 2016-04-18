import React from 'react';
import ItemClickable from './ItemClickable';
import ColorBox from './ColorBox';

export default React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired,
    },
    render() {
        const item = this.props.item;
        return (
            <tr>
                <td><ColorBox color={item.description} /></td>
                <td><ItemClickable value={item.claim ? item.claim.title : null} /></td>
            </tr>
        );
    },
});
