import React, { Component } from 'react'
import SingleStudInfo from "./SingleStudInfo"
import { Col, Container, Row, Button } from 'react-bootstrap'
import CreateStudInfo from './CreateStudInfo'

class BackOffice extends Component {
   state = {
    students: {
        data:[]
    },
       openModal: false
   }

    render() {
        return (
            <Container>
                <h1>Welcome to the backoffice <Button onClick={() => this.setState({ openModal: true})}>Create New</Button></h1>
                <CreateStudInfo show={this.state.openModal} 
                            onClose={() => this.setState({ openModal: false})}
                            onNewStudInfo={(StudInfo)=> this.setState({
                                students: this.state.students.data.concat(StudInfo),
                                openModal: false
                            })}
                            />

                {this.state.students.data.map(StudInfo => 
                    <SingleStudInfo item={StudInfo}
                        onDelete={(_id) => 
                            this.setState({
                            students: this.state.students.data.filter(StudInfo => StudInfo._id !== _id)
                        }) }
                        
                 
                    /> 
                )} 
            </Container>
        )
    }

    componentDidMount = async () => {
        const studentsResp = await fetch("http://localhost:3000/student")
        const students = await studentsResp.json()
        this.setState({
            students: students
        })
    }
}

export default BackOffice