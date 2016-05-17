import React from 'react';
import TrackingItem from './TrackingItem';
import _ from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styles from './TrackingList.css';

export default React.createClass({
    propTypes: {
        activities: React.PropTypes.array.isRequired,
    },
    renderItem(activity) {
        return (<TrackingItem item={activity} key={activity.id} />);
    },
    render() {
        const currentActivities = _.filter(this.props.activities, { ended_at: null });

        return (
            <ReactCSSTransitionGroup
                transitionName="grow"
                transitionEnterTimeout={200}
                transitionLeaveTimeout={200}
                component="div"
                className={styles.container}
            >
                {currentActivities.map(this.renderItem)}
            </ReactCSSTransitionGroup>
        );
    },
});
