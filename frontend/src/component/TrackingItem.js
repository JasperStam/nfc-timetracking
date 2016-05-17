import React from 'react';
import Time from './Time';
import Duration from './Duration';
import Loading from './Loading';
import styles from './TrackingItem.css';

export default React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired,
    },
    saveStartedAt() {
        console.log('no');
    },
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.item}>
                        <Loading />
                    </div>
                    <div className={styles.item}>
                        {this.props.item.claim.title}
                    </div>
                </div>
                <div className={styles.duration}>
                    Since
                    <Time at={this.props.item.started_at} save={this.saveStartedAt} />
                    —&nbsp;
                    <Duration duration={this.props.item.started_ended_diff} />
                </div>
            </div>
        );
    },
});
