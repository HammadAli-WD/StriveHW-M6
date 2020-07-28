import React, { Component } from "react";
import {
  Container,
  Image,
  Card,
  Accordion,
  Button,
  Modal,
  ListGroup,
  Row,
  Col,
  Form,
  Spinner,
} from "react-bootstrap";
//import "./StudentDetails.css";
//import TableForProjects from "./TableForProjects";

const apiKey = process.env.REACT_APP_API_KEY || "http://localhost:3000";

class Student extends Component {
  state = {
    students: {
        data:[]
    },
    projects: {
     data:[]
 }
}
  fetchData = async () => {
    let resp = await fetch(
      apiKey + "/student/" + this.props.match.params.id + "/projects"
    );

    if (resp.ok) {
      let projects = await resp.json();
      console.log(projects)
      this.setState({
        projects,
      });
    } else {
      alert("Something went wrong!");
    }
  };

  fetchUser = async () => {
    let resp = await fetch(apiKey + "/student/" + this.props.match.params.id);
    let data = await resp.json();
    console.log(data)
    if (resp.ok) {
      this.setState({
        students: data,
      });
    }
  };

  componentDidMount = () => {
    this.fetchData();
    this.fetchUser();
  };

  

  /* getProjectId = (id) => {
    this.setState({
      projectId: id,
      addReview: true,
    });
  };

  handleReview = (e) => {
    const newReview = this.state.newReview;
    newReview[e.currentTarget.id] = e.currentTarget.value;
    this.setState({
      newReview,
    });
  };

  addNewReview = async (e) => {
    e.preventDefault();
    const resp = await fetch(
      apiKey + "/projects/" + this.state.projectId + "/reviews",
      {
        method: "POST",
        body: JSON.stringify(this.state.newReview),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (resp.ok) {
      this.fetchReviews(this.props.match.params.id);
      this.setState({
        addReview: false,
        projectId: "",
        newReview: {
          name: "",
          text: "",
        },
      });
    }
  }; */

  render() {
    return (
      //<h3 className="mt-5" > Projects Information</h3>
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
     
    )

}
}

export default Student;