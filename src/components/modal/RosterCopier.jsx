import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../atomic/Button';
import Select from '../atomic/Select';
import { getSections } from '../../actions';
import { ObjVal } from '../../utils';

class RosterCopier extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
        }
    }

    componentDidMount() {
        if (!ObjVal(this.props.sections)) {
            this.props.getSections();
        }
    }

    render() {
        return (
            <div className="copier creator">
                <h2>Copy roster</h2>
                <Select
                    handleChange={this.handleChange}
                    label="Section roster to be copied"
                    name="name"
                    options={this.getSectionOptions()}
                    value={this.state.name}
                />
                {this.state.name ? (
                    <div className="confirmation">
                        Copying <b>{this.state.name}</b>'s roster to <b>{this.props.copyToName}</b>.
                    </div>
                ) : null}
                <Button
                    className="full"
                    handleClick={this.handleSave}
                    disabled={!(this.state.name)}
                >
                    Copy
                </Button>
                <Button
                    className="secondary full"
                    handleClick={this.props.handleClose}
                >
                    Cancel
                </Button>
            </div>
        );
    }

    getSectionOptions = () => {
        const { copyToId, sections } = this.props;
        if (ObjVal(sections)) {
            return Object.keys(sections).reduce((acc, id) => {
                if (id !== copyToId) acc.push(sections[id].name)
                return acc;
            }, []);
        }
        return [];
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSave = () => {
        const { name } = this.state;
        const { sections } = this.props;
        const copyFromId = Object.keys(sections).filter(id => sections[id].name === name)[0];
        console.log('old section', { name, id: copyFromId });
        // this.props.updateSection(this.props.id, name, type);
        // return this.props.handleClose();
    }
}

const mapStateToProps = (state) => {
    return {
        sections: state.sections.list
    }
}

const mapDispatchToProps = {
    getSections,
}

RosterCopier.propTypes = {
    copyToId: PropTypes.string.isRequired,
    copyToName: PropTypes.string.isRequired,
    handleClose: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(RosterCopier);