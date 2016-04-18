import React from 'react';
import ItemClickable from './ItemClickable';
import ColorBox from './ColorBox';

export default React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired,
        saveClaim: React.PropTypes.func.isRequired,
    },
    saveClaim(title) {
        this.props.saveClaim(this.props.item.id, title);
    },
    render() {
        const item = this.props.item;
        return (
            <tr>
                <td><ColorBox color={item.description} /></td>
                <td><ItemClickable value={item.claim ? item.claim.title : null} save={this.saveClaim} /></td>
            </tr>
        );
    },
});
