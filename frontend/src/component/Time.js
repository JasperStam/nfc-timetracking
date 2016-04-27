import React from 'react';
import InProgress from './InProgress';
import MaskedInput from 'react-maskedinput';
import styles from './Time.css';

export default React.createClass({
    propTypes: {
        at: React.PropTypes.object,
        save: React.PropTypes.func.isRequired,
    },
    getInitialState() {
        return {
            value: this.props.at ? this.props.at.format('HH:mm') : '',
        };
    },
    save() {
        const value = this.state.value.split(':');
        this.props.save(value[0], value[1]);
    },
    submit(e) {
        e.preventDefault();
        this.save();
    },
    change(e) {
        this.setState({ value: e.target.value });
    },
    render() {
        if (!this.props.at) {
            return (
                <InProgress />
            );
        }

        return (
            <form onSubmit={this.submit}>
                <MaskedInput
                    className={styles.container}
                    mask="11:11"
                    placeholder="00:00"
                    placeholderChar="–"
                    name="card"
                    value={this.state.value}
                    onChange={this.change}
                    onBlur={this.save}
                />
            </form>
        );
    },
});
