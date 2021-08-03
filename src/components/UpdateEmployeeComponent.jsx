import React, { Component } from 'react'
import { getEmployeeById, updateEmployee } from '../services/EmployeeService';

class UpdateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            middleName: '',
            initialName: '',
            emailId: '',
            address: '',
            managerName: '',
            department: '',
            phoneNumber: ''
        }
    }

    async componentDidMount() {
        try {
            const { data } = await getEmployeeById(this.state.id);
            this.setState({
                firstName: data.firstName,
                lastName: data.lastName,
                middleName: data.middleName,
                initialName: data.initialName,
                emailId: data.emailId,
                address: data.address,
                managerName: data.managerName,
                department: data.department,
                phoneNumber: data.phoneNumber
            });
        } catch (err) {
            console.error(err);
        }
    }

    updateEmployee = async (event) => {
        event.preventDefault();
        const { firstName, lastName, emailId, address, managerName, department, phoneNumber } = this.state;
        let employee = {
            firstName,
            lastName,
            emailId,
            address,
            managerName,
            department,
            phoneNumber
        };
        try {
            const res = await updateEmployee(employee, this.state.id);
            console.log('updateEmployee', res);
            this.props.history.push('/employees');
        } catch (err) {
            console.error(err);
        }
    }

    onChangeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    cancel = () => {
        this.props.history.push('/employees');
    }

    formGroup = () => {
        return (
            employeeDataset.map(employee => (
                <div className="form-group">
                    <label> {employee.label}: </label>
                    <input placeholder={employee.label} name={employee.value} className="form-control"
                        value={this.state[employee.value]} onChange={this.onChangeHandler} />
                </div>
            ))
        )
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Update Employee</h3>
                            <div className="card-body">
                                <form>
                                    {this.formGroup()}
                                    <button className="btn btn-success" onClick={this.updateEmployee}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default UpdateEmployeeComponent
