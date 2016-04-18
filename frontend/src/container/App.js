import React from 'react';
import Header from 'component/Header';
import ActivityList from './ActivityList';
import styles from './App.css';
import TagList from './TagList';

export default React.createClass({
    render() {
        return (
            <div>
                <Header />
                <div className={styles.layout}>
                    <ActivityList />
                    <TagList />
                </div>
            </div>
        );
    },
});
