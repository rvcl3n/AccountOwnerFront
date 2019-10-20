import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { Modal, Button } from 'react-bootstrap';
import '../ModalStyles.css';
 
const successModal = (props) => {
    console.log('SuccessModal');
    console.log(props.show);
    console.log(props.modalBodyText);
    return (
        <Aux>
            <Modal show={props.show} style={{opacity:1}}>
                <Modal.Header>
                    {props.modalHeaderText}
                </Modal.Header>
                <Modal.Body>
                    <p>{props.modalBodyText}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="success" onClick={props.successClick}>{props.okButtonText}</Button>
                </Modal.Footer>
            </Modal>
        </Aux>
    )
}
 
export default successModal;