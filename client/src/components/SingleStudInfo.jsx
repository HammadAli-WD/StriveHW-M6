import React, { Component } from 'react'
import { Media, Button, Container, Row, Col, Card} from "react-bootstrap"
import { Link } from 'react-router-dom'

class SingleStudInfo extends Component {

    deleteBook = async (_id) =>{
        const studentsResp = await fetch("http://localhost:3000/student/" + _id, {
            method: "DELETE"
        })
        if (studentsResp.ok){
            this.props.onDelete(_id)
        }
    }

 
    render() {
        const { name, surname, dateOfBirth, country, _id } = this.props.item

        return (
            
          <Container>
          <Row>
          <Col md={4} sm={6} lg={2} >
          <Card border="primary" style={{ width: '18rem' }}>
            <Card.Header>{name}-{surname}</Card.Header>
              <Card.Body>
                <Card.Title>{country}</Card.Title>
                <Card.Text>
                {dateOfBirth}
                </Card.Text>
                <Button className="ml-5" variant="danger" onClick={() => this.deleteBook(_id) } >Delete</Button>
                <Button className="ml-5" variant="warning"><Link to={"/details/" + _id}>Edit</Link></Button>
              </Card.Body>
            </Card>
            <br />
            </Col>
            </Row>
          </Container>
        )
    }
}

export default SingleStudInfo