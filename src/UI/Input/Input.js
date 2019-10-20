import React from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { FormGroup, Col, FormControl, FormLabel  } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Input.css';
 
const input = (props) => {
    let inputField = null;
    let errorMessage = null;
 
    if(props.invalid && props.shouldValidate && props.touched){
        errorMessage = (<em>{props.errorMessage}</em>);
    }

    switch (props.elementType) {
        case 'input':
            inputField = (
                <FormGroup controlId={props.id}>
                    <br/>
                    <Col componentClass={FormLabel } sm={2}>
                        {props.label}
                    </Col>
                    <Col sm={3}>
                        <FormControl type={props.type} value={props.value} onChange={props.changed} onBlur={props.blur} />
                    </Col>
                    <Col>
                        <em>{errorMessage}</em>
                    </Col>
                    <br/>
                </FormGroup>
            )
            break;
        case 'datePicker':
            inputField = (
                <FormGroup controlId={props.id}>
                    <br/>
                    <Col componentClass={FormLabel } sm={2}>
                        {props.label}
                    </Col>
                    <Col sm={3}>
                        <DatePicker selected={props.value} dateFormat="MM/DD/YYYY" readOnly
                            onChange={props.changed} className='datePickerControl' 
                            showYearDropdown dropdownMode="select"/>
                    </Col>
                    <Col>
                        <em>{errorMessage}</em>
                    </Col>
                    <br/>
                </FormGroup>
            )
            break;
        default: inputField = null;
    }
    
    return (
        <Aux>
            {inputField}
        </Aux>
    )
}
 
export default input;