import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import * as repositoryActions from '../../../store/actions/repositoryActions';
import * as errorHandlerActions from '../../../store/actions/errorHandlerActions';
import { connect } from 'react-redux';
import { Card, Button, Col, Row, FormLabel  } from 'react-bootstrap';
import Moment from 'react-moment';
import SuccessModal from '../../../components/Modal/SuccessModal/SuccessModal';
import ErrorModal from '../../../components/Modal/ErrorModal/ErrorModal';

class DeleteOwner extends Component {

    componentDidMount = () => {
        const id = this.props.match.params.id;
        const url = '/api/owner/' + id;
        this.props.onGetOwnerById(url, { ...this.props });
    }

    redirectToOwnerList = () => {
        this.props.history.push('/owner-List');
    }

    deleteOwner = (event) => {
        event.preventDefault();
     
        const url = "/api/owner/" + this.props.data.id;
     
        this.props.onDeleteOwner(url, { ...this.props });
    }

    render() {

        let owner = { ...this.props.data };

        return (
            <Aux>
                <Row>
                    <Col md={10}>
                        <Card>
                            <Row>
                                <Col md={3}>
                                    <FormLabel  htmlFor='name'>Owners name:</FormLabel >
                                </Col>
                                <Col md={7}>
                                    <span name='name'>{owner.name}</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    <FormLabel  htmlFor='dateOfBirth'>Date of birth:</FormLabel >
                                </Col>
                                <Col md={7}>
                                    <span name='dateOfBirth'><Moment format="MM/DD/YYYY">{owner.dateOfBirth}</Moment></span>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    <FormLabel  htmlFor='address'>Address:</FormLabel >
                                </Col>
                                <Col md={7}>
                                    <span name='address'>{owner.address}</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col mdOffset={8} md={1}>
                                    <Button type="submit" bsStyle="info" onClick={this.deleteOwner}>Delete</Button>
                                </Col>
                                <Col md={1}>
                                    <Button bsStyle='danger' onClick={this.redirectToOwnerList}>Cancel</Button>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <SuccessModal show={this.props.showSuccessModal} modalHeaderText={'Success message'}
                    modalBodyText={'Action completed successfylly'}
                    okButtonText={'OK'}
                    successClick={() => this.props.onCloseSuccessModal('/owner-List', { ...this.props })} />
                <ErrorModal show={this.props.showErrorModal} modalHeaderText={'Error message'}
                    modalBodyText={this.props.errorMessage}
                    okButtonText={'OK'}
                    closeModal={() => this.props.onCloseErrorModal()} />
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.repository.data,
        showSuccessModal: state.repository.showSuccessModal,
        showErrorModal: state.errorHandler.showErrorModal,
        errorMessage: state.errorHandler.errorMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetOwnerById: (url, props) => dispatch(repositoryActions.getData(url, props)),
        onDeleteOwner: (url, props) => dispatch(repositoryActions.deleteData(url, props)),
        onCloseSuccessModal: (url, props) => dispatch(repositoryActions.closeSuccessModal(props, url)),
        onCloseErrorModal: () => dispatch(errorHandlerActions.closeErrorModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteOwner);