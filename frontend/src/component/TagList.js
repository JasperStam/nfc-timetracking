import React from 'react';
import TagItem from './TagItem';
import styles from './TagList.css';

export default React.createClass({
    propTypes: {
        tags: React.PropTypes.array.isRequired,
        claims: React.PropTypes.array.isRequired,
        saveClaim: React.PropTypes.func.isRequired,
    },
    renderItem(tag) {
        return (<TagItem item={tag} key={tag.id} claims={this.props.claims} saveClaim={this.props.saveClaim} />);
    },
    render() {
        return (
            <div className={styles.container}>
                <h1>Active tags</h1>
                <table className={styles.table}>
                    {this.props.tags.map(this.renderItem)}
                </table>
            </div>
        );
    },
});
