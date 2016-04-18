import React from 'react';

export default React.createClass({
    propTypes: {
        value: React.PropTypes.string,
        save: React.PropTypes.func.isRequired,
    },
    getInitialState() {
        return {
            isInput: false,
            value: '',
        };
    },
    input() {
        this.setState({ isInput: true });
    },
    save() {
        this.setState({ isInput: false });
        this.props.save(this.state.value);
    },
    change(e) {
        this.setState({ value: e.target.value });
    },
    render() {
        const value = this.props.value || <em>None</em>;
        if (this.state.isInput) {
            return (
                <input
                    type="text"
                    defaultValue={this.props.value}
                    onChange={this.change}
                    onBlur={this.save}
                    autoFocus
                />
            );
        }
        return (
            <span onClick={this.input}>{value}</span>
        );
    },
});
