import React from 'react';
import InProgress from './InProgress';
import MaskedInput from 'react-maskedinput';
import styles from './Time.css';

export default React.createClass({
    propTypes: {
        at: React.PropTypes.object,
        save: React.PropTypes.func.isRequired,
    },
    save(e) {
        const value = e.target.value.split(':');
        this.props.save(value[0], value[1]);
    },
    doNothing() {},
    render() {
        if (!this.props.at) {
            return (
                <InProgress />
            );
        }

        return (
            <MaskedInput
                className={styles.container}
                mask="11:11"
                placeholder="00:00"
                placeholderChar="–"
                name="card"
                value={this.props.at.format('H:mm')}
                onChange={this.doNothing}
                onBlur={this.save}
            />
        );
    },
});
