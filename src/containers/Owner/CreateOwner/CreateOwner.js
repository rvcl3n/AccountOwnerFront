import React, { Component } from 'react';
import Input from '../../../UI/Input/Input';
import { Form, Card, Button, FormGroup, Col } from 'react-bootstrap';
import { returnInputConfiguration } from '../../../Utility/InputConfiguration';
import * as formUtilityActions from '../../../Utility/FormUtility';
import { connect } from 'react-redux';
import * as repositoryActions from '../../../store/actions/repositoryActions';
import * as errorHandlerActions from '../../../store/actions/errorHandlerActions';
import SuccessModal from '../../../components/Modal/SuccessModal/SuccessModal';
import ErrorModal from '../../../components/Modal/ErrorModal/ErrorModal';

class CreateOwner extends Component {
    state = {
        ownerForm: {},
        isFormValid: false
    }

    componentWillMount = () => {
        this.setState({ ownerForm: returnInputConfiguration() });
    }

    handleChangeEvent = (event, id) => {
        const updatedOwnerForm = { ...this.state.ownerForm };
        updatedOwnerForm[id] = formUtilityActions.executeValidationAndReturnFormElement(event, updatedOwnerForm, id);

        const counter = formUtilityActions.countInvalidElements(updatedOwnerForm);

        this.setState({ ownerForm: updatedOwnerForm, isFormValid: counter === 0 })
    }

    createOwner = (event) => {
        event.preventDefault();
     
        const ownerToCreate = {
            name: this.state.ownerForm.name.value,
            address: this.state.ownerForm.address.value,
            dateOfBirth: this.state.ownerForm.dateOfBirth.value
        }
     
        const url = '/api/owner';
        this.props.onCreateOwner(url, ownerToCreate, { ...this.props });
    }

    redirectToOwnerList = () => {
        this.props.history.push('/owner-List');
    }

    render() {
        const formElementsArray = formUtilityActions.convertStateToArrayOfFormObjects({ ...this.state.ownerForm });

        return (
            <Card>
                <Form horizontal onSubmit={this.createOwner}>
                    {
                        formElementsArray.map(element => {
                            return <Input key={element.id} elementType={element.config.element}
                                id={element.id} label={element.config.label}
                                type={element.config.type} value={element.config.value}
                                changed={(event) => this.handleChangeEvent(event, element.id)}
                                errorMessage={element.config.errorMessage}
                                invalid={!element.config.valid} shouldValidate={element.config.validation}
                                touched={element.config.touched}
                                blur={(event) => this.handleChangeEvent(event, element.id)} />
                        })
                    }
                    <br />
                    <FormGroup>
                        <Col md={{ span: 1, offset: 6 }}>
                            <Button type='submit' bsStyle='info' disabled={!this.state.isFormValid}>Create</Button>
                        </Col>
                        <Col md={{ span: 1 }}>
                            <Button bsStyle='danger' onClick={this.redirectToOwnerList}>Cancel</Button>
                        </Col>
                    </FormGroup>
                </Form>
                <SuccessModal show={this.props.showSuccessModal}
                    modalHeaderText={'Success message'}
                    modalBodyText={'Action completed successfully'}
                    okButtonText={'OK'}
                    successClick={() => this.props.onCloseSuccessModal('/owner-List', { ...this.props })} />

                <ErrorModal show={this.props.showErrorModal}
                    modalHeaderText={'Error message'}
                    modalBodyText={this.props.errorMessage}
                    okButtonText={'OK'} closeModal={() => this.props.onCloseErrorModal()} />
            </Card>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        showSuccessModal: state.repository.showSuccessModal,
        showErrorModal: state.errorHandler.showErrorModal,
        errorMessage: state.errorHandler.errorMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCreateOwner: (url, owner, props) => dispatch(repositoryActions.postData(url, owner, props)),
        onCloseSuccessModal: (url, props) => dispatch(repositoryActions.closeSuccessModal(props, url)),
        onCloseErrorModal: () => dispatch(errorHandlerActions.closeErrorModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOwner);