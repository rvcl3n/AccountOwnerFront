import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Col, Row } from 'react-bootstrap';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Owner from '../../../components/OwnerComponents/Owner/Owner';

import { connect } from 'react-redux';
import * as repositoryActions from '../../../store/actions/repositoryActions';


 
class OwnerList extends Component {

    componentDidMount = () => {
        let url = '/api/owner';
        this.props.onGetData(url, { ...this.props });
    }
    render() {
        let owners = [];
        if (this.props.data && this.props.data.length > 0) {
            owners = this.props.data.map((owner) => {
                return (
                    <Owner key={owner.id} owner={owner} {...this.props} />
                )
            })
        }
        return (
            <Aux>
                <Row>
                    <Col md={{ span: 2, offset: 10 }}>
                        <Link to='/createOwner' >Create Owner</Link>
                    </Col>
                </Row>
                <br />
                <Row className="justify-content-md-center">
                    <Col md={10}>
                        <Table responsive striped>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Date of birth</th>
                                    <th>Address</th>
                                    <th>Details</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {owners}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.repository.data
    }
}
const mapDispatchToProps = (dispatch) => {
     return {
         onGetData: (url, props) => dispatch(repositoryActions.getData(url, props))     
    } 
} 
export default connect(mapStateToProps, mapDispatchToProps)(OwnerList);