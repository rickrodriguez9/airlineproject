import axios from 'axios';
import React, { Component } from 'react';
import { variables } from './Variables.js';

export class PassengerPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            passengers: [],
            modalTitle: "",
            Id: 0,
            FirstName: "",
            LastName: "",
            Job: "",
            Email: "",
            Age: 0,
        }
    }

    refreshList() {
        axios.get(variables.API_URL + 'Passengers')
            .then((response) => {
                this.setState({ passengers: response.data })
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeId = (e) => {
        this.setState({ Id: e.target.value });
    }

    changeFirstName = (e) => {
        this.setState({ FirstName: e.target.value });
    }

    changeLastName = (e) => {
        this.setState({ LastName: e.target.value });
    }

    changeJob = (e) => {
        this.setState({ Job: e.target.value });
    }

    changeEmail = (e) => {
        this.setState({ Email: e.target.value });
    }

    changeAge = (e) => {
        this.setState({ Age: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Add Passenger",
            Id: 0,
            FirstName: "",
            LastName: "",
            Job: "",
            Email: "",
            Age: 0
        });
    }

    editClick(pass) {
        console.log(pass)
        this.setState({
            modalTitle: "Edit Passenger",
            Id: pass.Id,
            FirstName: pass.FirstName,
            LastName: pass.LastName,
            Job: pass.Job,
            Email: pass.Email,
            Age: pass.Age
        });
    }

    createClick() {
        axios.post(variables.API_URL + 'Passengers', {
            
                Id: this.state.Id,
                FirstName: this.state.FirstName,
                LastName: this.state.LastName,
                Job: this.state.Job,
                Email: this.state.Email,
                Age: this.state.Age    
        })
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }


    updateClick() {
        console.log(this.state)
        axios.put(variables.API_URL + `Passengers/${this.state.Id}`, {
                Id: this.state.Id,
                FirstName: this.state.FirstName,
                LastName: this.state.LastName,
                Job: this.state.Job,
                Email: this.state.Email,
                Age: this.state.Age
        })
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }

    deleteClick(id) {
        if (window.confirm('Are you sure?')) {
            axios.delete(variables.API_URL + `Passengers/${this.state.Id}`, {
               
            })
                .then((result) => {
                    alert(result);
                    this.refreshList();
                }, (error) => {
                    alert('Failed');
                })
        }
    }



    render() {

        return (

            <div>
                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add Passenger
                </button>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                Passenger Id
                            </th>
                            <th>
                                First Name
                            </th>
                            <th>
                                Last Name
                            </th>
                            <th>
                                Job Title
                            </th>
                            <th>
                                Email
                            </th>
                            <th>
                                Age
                            </th>
                            <th>
                               
                            </th>
                            <th>

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.passengers.map(pass =>
                            <tr key={pass.Id}>
                                <td>{pass.Id}</td>
                                <td>{pass.FirstName}</td>
                                <td>{pass.LastName}</td>
                                <td>{pass.Job}</td>
                                <td>{pass.Email}</td>
                                <td>{pass.Age}</td>
                                <td>
                                <button type="button" className="btn btn-light mr-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    onClick={() => this.editClick(pass)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                    </svg>
                                </button>

                                <button type="button" className='btn btn-light mr-1'
                                    onClick={() => this.deleteClick(pass.Id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                    </svg>
                                </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{this.state.modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Id</span>
                                    <input type="text" className="form-control"
                                        value={this.state.Id}
                                        onChange={this.changeId} />
                                        </div>
                                        <div className="input-group mb-3">
                                    <span className="input-group-text">FirstName</span>
                                    <input type="text" className="form-control"
                                        value={this.state.FirstName}
                                        onChange={this.changeFirstName} />
                                        </div>
                                        <div className="input-group mb-3">
                                    <span className="input-group-text">LastName</span>
                                    <input type="text" className="form-control"
                                        value={this.state.LastName}
                                        onChange={this.changeLastName} />
                                        </div>
                                        <div className="input-group mb-3">
                                    <span className="input-group-text">Job</span>
                                    <input type="text" className="form-control"
                                        value={this.state.Job}
                                        onChange={this.changeJob} />
                                        </div>
                                        <div className="input-group mb-3">
                                    <span className="input-group-text">Email</span>
                                    <input type="text" className="form-control"
                                        value={this.state.Email}
                                        onChange={this.changeEmail} />
                                        </div>
                                        <div className="input-group mb-3">
                                    <span className="input-group-text">Age</span>
                                    <input type="text" className="form-control"
                                        value={this.state.Age}
                                        onChange={this.changeAge} />
                                </div>
                            </div>

                            {this.state.Id === 0 ?
                                <button type="button"
                                    className="btn btn-primary float-start"
                                    onClick={() => this.createClick()}
                                >Create</button>
                                : null}

                            {this.state.Id !== 0 ?
                                <button type="button"
                                    className="btn btn-primary float-start"
                                    onClick={() => this.updateClick()}
                                >Update</button>
                                : null}

                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
