import React from 'react';
import TagItem from './TagItem';
import styles from './TagList.css';

export default React.createClass({
    propTypes: {
        tags: React.PropTypes.array.isRequired,
        saveClaim: React.PropTypes.func.isRequired,
    },
    renderItem(tag) {
        return (<TagItem item={tag} key={tag.id} saveClaim={this.props.saveClaim} />);
    },
    render() {
        return (
            <div className={styles.container}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Tag</th>
                            <th>Claim</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.tags.map(this.renderItem)}
                    </tbody>
                </table>
            </div>
        );
    },
});
