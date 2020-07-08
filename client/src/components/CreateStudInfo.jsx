import React, { Component } from 'react'
import { Modal, Button, Form } from "react-bootstrap"
      
class CreateStudInfo extends Component {
      
    state = {
      surname: "",
        name: "",
        dateOfBirth: "",
        country: "",
        email: "",
    }

    createstudent = async () => {
        const newstudent = {
            ...this.state
        }

        const studentResp = await fetch("http://localhost:3000/student", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newstudent)
        })
        
        if (studentResp.ok) {// check if the response is ok
            this.props.onNewstudent(newstudent)// tell the parent we have a new kid in town
        }
    }

    render() {
        const { onClose, show } = this.props

        return (
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Insert student in catalogue</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* <Form.Group controlId="imdbID">
                            <Form.Label>imdbID</Form.Label>
                            <Form.Control type="text"
                                onChange={(e) => this.setState({ imdbID: e.currentTarget.value })}
                                value={this.state.imdbID}
                                placeholder="imdbID - Unique student ID" />
                        </Form.Group> */}
                        <Form.Group controlId="name">
                            <Form.Label>name</Form.Label>
                            <Form.Control
                                value={this.state.name}
                                onChange={(e) => this.setState({ name: e.currentTarget.value })}
                                type="text" placeholder="name" />
                        </Form.Group>
                        <Form.Group controlId="surname">
                            <Form.Label>surname</Form.Label>
                            <Form.Control
                                value={this.state.surname}
                                onChange={(e) => this.setState({ surname: e.currentTarget.value })}
                                type="text" placeholder="surname" />
                        </Form.Group>
                        <Form.Group controlId="country">
                            <Form.Label>country</Form.Label>
                            <Form.Control
                                value={this.state.country}
                                onChange={(e) => this.setState({ country: e.currentTarget.value })}
                                country="text" placeholder="country" />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>email</Form.Label>
                            <Form.Control
                                value={this.state.email}
                                onChange={(e) => this.setState({ email: e.currentTarget.value })}
                                email="text" placeholder="email" />
                        </Form.Group>
                        <Form.Group controlId="dateOfBirth">
                            <Form.Label>dateOfBirth</Form.Label>
                            <Form.Control
                                value={this.state.dateOfBirth}
                                onChange={(e) => this.setState({ dateOfBirth: e.currentTarget.value })}
                                type="date" placeholder="dateOfBirth" />
                        </Form.Group>
                        
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.createstudent}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default CreateStudInfo