import React, { Component } from 'react'
//import SingleBook from "./SingleBook"
import { Col, Container, Row, ListGroup, Jumbotron, Button } from 'react-bootstrap'


class HomePage extends Component {
   state = {
       students: {
           data:[]
       },
       projects: {
        data:[]
    }
   }
  

    render() {
        return (
            <>
            <Jumbotron fluid>
                <Container>
                    <h1>Students Portfolios</h1>
                    <p>
                    This is a modified jumbotron that occupies the entire horizontal space of
                    its parent.
                    </p>
                </Container>
                </Jumbotron>
            <Container>
            <h3> Students Information</h3>
                <Row>
                
                {this.state.students.data.map((student, index) => 
                <Col key={`col-${index}`} md={4} sm={6} lg={2} >
                    
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
                    <Button color="primary" className="px-4"
                    onClick={() => this.props.history.push(`/student/${student._id}`)}

                  >
                  StudentInfo
                </Button>
                </Col>
                )} 
                </Row>
                <h3 className="mt-5" > Projects Information</h3>
                <Row className="mt-5" >
               
                {this.state.projects.data.map((project,index) => 
                <Col key={`col-${index}`} md={4} sm={6} lg={2} >
                     
                   <ListGroup as="ul">
                    <ListGroup.Item as="li" active>
                        {project.name}
                    </ListGroup.Item>
                    <ListGroup.Item as="li">{project.description}</ListGroup.Item>
                    
                    </ListGroup>
                </Col>
                )} 
                </Row>

            </Container>
            </>
        )
    }

    /* componentDidMount = async () => {
        const studentsResp = await fetch("http://localhost:3000/student")
        const students = await studentsResp.json()
        console.log(students)
        this.setState({
            students: students
        })
    }

    componentDidMount = async () => {
        const projectsResp = await fetch("http://localhost:3000/projects")
        const projects = await projectsResp.json()
        console.log(projects)
        this.setState({
            projects: projects
        })
    } */

    componentDidMount() {
        Promise.all([fetch("http://localhost:3000/student"), fetch("http://localhost:3000/projects")])
    
          .then(([students, projects]) => { 
             return Promise.all([students.json(), projects.json()]) 
          })
          .then(([students, projects]) => {
            // set state in here
            this.setState({
                projects: projects,
                students: students
            })
          });
    }
}

export default HomePage