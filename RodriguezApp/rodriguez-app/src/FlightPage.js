import React, { Component } from 'react';
import { variables } from './Variables.js';
import axios from "axios";

export class FlightPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flights: [],
            modalTitle: "",
            Id: 0,
            PlaneId: 0,
            DepartDT: "",
            ArriveDT: "",
            DepartAP: "",
            ArriveAP: "",
            PassengerLimt: 0
        }
    }

    refreshList() {
        axios.get(variables.API_URL + 'Flights')
            .then((response) => {
                this.setState({ flights: response.data })
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeId = (e) => {
        this.setState({ Id: e.target.value });
    }

    changePlaneId = (e) => {
        this.setState({ PlaneId: e.target.value });
    }

    changeDepartDT = (e) => {
        this.setState({ DepartDT: e.target.value });
    }

    changeArriveDT = (e) => {
        this.setState({ ArriveDT: e.target.value });
    }

    changeDepartAP = (e) => {
        this.setState({ DepartAP: e.target.value });
    }

    changeArriveAP = (e) => {
        this.setState({ ArriveAP: e.target.value });
    }

    changePassengerLimt = (e) => {
        this.setState({ PassengerLimt: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Add Flight",
            Id: 0,
            PlaneId: 0,
            DepartDT: "",
            ArriveDT: "",
            DepartAP: "",
            ArriveAP: "",
            PassengerLimt: 0

        });
    }

    editClick(fly) {
        console.log(fly)
        this.setState({
            modalTitle: "Add Flight",
            Id: fly.Id,
            PlaneId: fly.PlaneId,
            DepartDT: fly.DepartDT,
            ArriveDT: fly.ArriveDT,
            DepartAP: fly.DepartAP,
            ArriveAP: fly.ArriveAP,
            PassengerLimt: fly.PassengerLimt
        });
    }

    createClick() {
        axios.post(variables.API_URL + 'Flights', {
            
                Id: this.state.Id,
                PlaneId: this.state.PlaneId,
                DepartDT: this.state.DepartDT,
                ArriveDT: this.state.ArriveDT,
                DepartAP: this.state.DepartAP,
                ArriveAP: this.state.ArriveAP,
                PassengerLimt: this.state.PassengerLimt
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
        axios.put(variables.API_URL + `Flights/${this.state.Id}`, {
           
                Id: this.state.Id,
                PlaneId: this.state.PlaneId,
                DepartDT: this.state.DepartDT,
                ArriveDT: this.state.ArriveDT,
                DepartAP: this.state.DepartAP,
                ArriveAP: this.state.ArriveAP,
                PassengerLimt: this.state.PassengerLimt
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
            axios.delete(variables.API_URL + `Flights/${this.state.Id}`, {
                
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
                    Add Flight
                </button>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                Flight Id
                            </th>
                            <th>
                                Plane Id
                            </th>
                            <th>
                                Depart Date/Time
                            </th>
                            <th>
                                Arrive Date/Time
                            </th>
                            <th>
                                Depart Airport
                            </th>
                            <th>
                                Arrival Airport
                            </th>
                            <th>
                                Passenger Limit
                            </th>
                            <th>

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.flights.map(fly =>
                            <tr key={fly.Id}>
                                <td>{fly.Id}</td>
                                <td>{fly.PlaneId}</td>
                                <td>{fly.DepartDT}</td>
                                <td>{fly.ArriveDT}</td>
                                <td>{fly.DepartAP}</td>
                                <td>{fly.ArriveAP}</td>
                                <td>{fly.PassengerLimt}</td>
                                <td>
                                <button type="button" className="btn btn-light mr-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    onClick={() => this.editClick(fly)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                    </svg>
                                </button>

                                <button type="button" className='btn btn-light mr-1'
                                    onClick={() => this.deleteClick(fly.Id)}>
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
                                    <span className="input-group-text">PlaneId</span>
                                    <input type="text" className="form-control"
                                        value={this.state.PlaneId}
                                        onChange={this.changePlaneId} />
                                        </div>
                                        <div className="input-group mb-3">
                                    <span className="input-group-text">DepartDT</span>
                                    <input type="text" className="form-control"
                                        value={this.state.DepartDT}
                                        onChange={this.changeDepartDT} />
                                        </div>
                                        <div className="input-group mb-3">

                                    <span className="input-group-text">ArriveDT</span>
                                    <input type="text" className="form-control"
                                        value={this.state.ArriveDT}
                                        onChange={this.changeArriveDT} />
                                        </div>
                                        <div className="input-group mb-3">

                                    <span className="input-group-text">DepartAP</span>
                                    <input type="text" className="form-control"
                                        value={this.state.DepartAP}
                                        onChange={this.changeDepartAP} />
                                        </div>
                                        <div className="input-group mb-3">

                                    <span className="input-group-text">ArriveAP</span>
                                    <input type="text" className="form-control"
                                        value={this.state.ArriveAP}
                                        onChange={this.changeArriveAP} />
                                        </div>
                                        <div className="input-group mb-3">

                                    <span className="input-group-text">PassengerLimt</span>
                                    <input type="text" className="form-control"
                                        value={this.state.PassengerLimt}
                                        onChange={this.changePassengerLimt} />
                                        
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