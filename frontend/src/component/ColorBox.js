import React from 'react';
import styles from './ColorBox.css';
import _ from 'lodash';

export default React.createClass({
    propTypes: {
        color: React.PropTypes.string,
    },
    getInitialState() {
        return {
            value: '',
        };
    },
    componentWillMount() {
        this.setState({ value: this.props.color });
    },
    change(e) {
        this.setState({ value: e.target.value });
        this.save();
    },
    save: _.debounce(function () {
        this.props.save(this.state.value);
    }, 400),
    render() {
        return (
            <input type="color" defaultValue={this.state.value} className={styles.container} onChange={this.change} />
        );
    },
});
