import React from 'react';

export default React.createClass({
    propTypes: {
        value: React.PropTypes.string,
    },
    getInitialState() {
        return {
            isInput: false,
        };
    },
    toggleInput() {
        this.setState({ isInput: !this.state.isInput });
    },
    render() {
        const value = this.props.value || <em>None</em>;
        if (this.state.isInput) {
            return (
                <input
                    type="text"
                    defaultValue={this.props.value}
                    onBlur={this.toggleInput}
                    autoFocus
                />
            );
        }
        return (
            <span onClick={this.toggleInput}>{value}</span>
        );
    },
});
