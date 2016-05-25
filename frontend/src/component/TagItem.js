import React from 'react';
import ColorBox from './ColorBox';
import styles from './TagItem.css';
import Select from 'react-select';

export default React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired,
        claims: React.PropTypes.array.isRequired,
        saveClaim: React.PropTypes.func.isRequired,
    },
    getInitialState() {
        return {
            claimTitle: this.props.item.claim ? this.props.item.claim.title : null,
        };
    },
    saveClaim(option) {
        const claimTitle = option || null;
        this.setState({ claimTitle });
        this.props.saveClaim(this.props.item.id, claimTitle);
    },
    formatClaim(claim) {
        return {
            value: claim,
            label: claim,
        };
    },
    render() {
        const item = this.props.item;
        const options = this.props.claims.map(this.formatClaim);

        return (
            <tr>
                <td><ColorBox color={item.description} /></td>
                <td className={styles.expand}>
                    <Select
                        options={options}
                        value={this.state.claimTitle}
                        allowCreate
                        addLabelText='"{label}" toevoegen?'
                        onChange={this.saveClaim}
                    />
                </td>
            </tr>
        );
    },
});
