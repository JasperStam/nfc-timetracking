import React from 'react';
import TagItem from './TagItem';
import styles from './TagList.css';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    propTypes: {
        tags: React.PropTypes.array.isRequired,
        claims: React.PropTypes.array.isRequired,
        saveClaim: React.PropTypes.func.isRequired,
        saveTag: React.PropTypes.func.isRequired,
    },
    mixins: [PureRenderMixin],
    renderItem(tag) {
        return (<TagItem
            item={tag}
            key={tag.id}
            claims={this.props.claims}
            saveClaim={this.props.saveClaim}
            saveTag={this.props.saveTag}
        />);
    },
    render() {
        return (
            <div className={styles.container}>
                <h2>Tags</h2>
                <div className={styles.content}>
                    <table className={styles.table}>
                        <tbody>
                            {this.props.tags.map(this.renderItem)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    },
});
