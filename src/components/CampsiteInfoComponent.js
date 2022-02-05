import React from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Component } from 'react/cjs/react.production.min';
import { Control, LocalForm, Errors} from 'react-redux-form';





    function RenderCampsite({campsite}) {
        
        return (
            <div className='col-md-5 m-1'>
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );

    }


    function RenderComments({comments}) {
        if (comments) {
            return (
                <div className='col-md-5 m-1'>
                    <h4>Comments</h4>
                    {comments.map(comment => <div key={comment.id}> <div>{comment.text} <br></br>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</div><br></br></div>)}
                    <CommentForm />
                </div>
                
            );
            
        }
            return (
            <div></div>
        );
    }

    function CampsiteInfo(props) {
        if (props.campsite) {
            return (
                <div className="container">
                    <div className="container">
                        <div className='row'>
                            <div className='col'>
                                <Breadcrumb>
                                <BreadcrumbItem><Link to="/home">Directory</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                                </Breadcrumb>
                                <h2>{props.campsite.name}</h2>
                                <hr />
                            </div>
                        </div>
                </div>
                    <div className="row">
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            );
        }
        return <div />;
    }

    const maxLength = len => val => !val || (val.length <= len);
    const minLength = len => val => val && (val.length >= len);

    class CommentForm extends Component {
        constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            rating: '',
            author: '',
            comment: ''
        };


        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        }

        toggleNav() {
            this.setState({
                isNavOpen: !this.state.isNavOpen
            });
        }
    
        toggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });

        }

        handleSubmit(values) {
            console.log('Current state is: ' + JSON.stringify(values));
            alert('Current state is: ' + JSON.stringify(values));
            this.toggleModal();
            values.preventDefault();
        }
        

        render() {
            return(
                <Button outline className='fa fa-pencil fa-lg'  onClick={this.toggleModal}> Submit Comment
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={values => this.handleSubmit(values)}>
                        <div className='form-group'>
                            Rating
                            <Control.select model=".rating" id="rating" name="rating" className='form-control'>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                        </div>
                        <div className='form-group'>
                            Your Name
                            <Control.text model=".author" id="author" name="author" className='form-control'
                            validators={{
                                minLength: minLength(2),
                                maxLength: maxLength(15)
                            }}
                            />
                            <Errors
                                className='text-danger'
                                model=".author"
                                show="touched"
                                component="div"
                                messages={{
                                    minLength: "Must be at least 2 characters",
                                    maxLength: "Must be 15 characters or less"
                                }}
                                />
                        </div>
                        <div className='form-group'>    
                            Comment
                            <Control.textarea model=".comment" id="comment" name="comment" className='form-control' rows='6' />
                       </div>
                       <Button type="submit" value="submit" color='primary'>Submit</Button>
                    </LocalForm>
                    </ModalBody>
                </Modal>
                </Button>
            );
        }
    }




export default CampsiteInfo;