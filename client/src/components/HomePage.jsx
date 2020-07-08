import React, { Component } from 'react'
//import SingleBook from "./SingleBook"
import { Col, Container, Row, ListGroup } from 'react-bootstrap'

class HomePage extends Component {
   state = {
       students: {
           data:[]
       }
   }

    render() {
        return (
            <Container>
                <Row>
                {this.state.students.data.map(student => 
                <Col md={4} sm={6} lg={2} >
                   <ListGroup as="ul">
                    <ListGroup.Item as="li" active>
                        {student.name}
                    </ListGroup.Item>
                    <ListGroup.Item as="li">{student.surname}</ListGroup.Item>
                    <ListGroup.Item as="li" disabled>
                    {student.country}
                    </ListGroup.Item>
                    <ListGroup.Item as="li">{student.dateOfBirth}</ListGroup.Item>
                    </ListGroup>
                </Col>
                )} 
                </Row>
            </Container>
        )
    }

    componentDidMount = async () => {
        const studentsResp = await fetch("http://localhost:3000/student")
        const students = await studentsResp.json()
        console.log(students)
        this.setState({
            students: students
        })
    }
}

export default HomePage