import React from 'react';
import Time from './Time';
import Duration from './Duration';
import Loading from './Loading';
import styles from './TrackingItem.css';

export default React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired,
        saveActivity: React.PropTypes.func.isRequired,
    },
    saveStartedAt(hour, minute) {
        const startedAt = this.props.item.started_at
            .clone()
            .hour(hour)
            .minute(minute);
        this.props.saveActivity(this.props.item.id, { started_at: startedAt.format() });
    },
    renderTitle() {
        if (!this.props.item.claim) {
            return (<em>Tag zonder project</em>);
        }

        return this.props.item.claim.title;
    },
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.item}>
                        <Loading />
                    </div>
                    <div className={styles.item}>
                        {this.renderTitle()}
                    </div>
                </div>
                <div className={styles.duration}>
                    Vanaf
                    <Time at={this.props.item.started_at} save={this.saveStartedAt} />
                    —&nbsp;
                    <Duration duration={this.props.item.started_ended_diff} />
                </div>
            </div>
        );
    },
});
