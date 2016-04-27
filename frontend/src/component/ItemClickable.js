import React from 'react';
import styles from './ItemClickable.css';

export default React.createClass({
    propTypes: {
        value: React.PropTypes.string,
        save: React.PropTypes.func.isRequired,
    },
    getInitialState() {
        return {
            isInput: false,
            value: this.props.value,
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
        const value = this.state.value || <em>None</em>;
        if (this.state.isInput) {
            return (
                <textarea
                    className={styles.input}
                    value={this.state.value}
                    onChange={this.change}
                    onBlur={this.save}
                    rows="3"
                    autoFocus
                />
            );
        }
        return (
            <span className={styles.clickable} onClick={this.input}>{value}</span>
        );
    },
});
