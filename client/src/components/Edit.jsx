import React, { Component } from 'react'
import SingleStudInfo from "./SingleStudInfo"
import { Col, Container, Row, Button } from 'react-bootstrap'
import CreateStudInfo from './CreateStudInfo'

class Edit extends Component {
   state = {
       student: {
        data:[]
    },
       openModal: false
   }

    render() {
        return (
            <Container>
                <h1>Welcome to the backoffice <Button onClick={() => this.setState({ openModal: true})}>Create Movie</Button></h1>
                <CreateStudInfo show={this.state.openModal} 
                            onClose={() => this.setState({ openModal: false})}
                            onnewstudent={(std)=> this.setState({
                                student: this.state.student.data.concat(std),
                                openModal: false
                            })}
                            />

                {this.state.student.data.map(std => 
                    <SingleStudInfo item={std}
                        onDelete={(_id) => 
                            this.setState({
                            student: this.state.student.data.filter(std => std._id !== _id)
                        }) }
                        
                 
                    /> 
                )} 
            </Container>
        )
    }

    componentDidMount = async () => {
        const studentResp = await fetch("http://localhost:3000/student")
        const student = await studentResp.json()
        this.setState({
            student: student
            //.data.slice(0, 50)
        })
    }
}

export default Edit