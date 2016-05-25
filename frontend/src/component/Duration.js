import React from 'react';

export default React.createClass({
    propTypes: {
        duration: React.PropTypes.object.isRequired,
    },
    render() {
        return (
            <div>
                {this.props.duration ? this.props.duration.format('h[u] m[m] s[s]') : 'In progress'}
            </div>
        );
    },
});
