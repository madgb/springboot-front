import React, { Component } from 'react'
import { getEmployeeById, createEmployee, updateEmployee } from '../services/EmployeeService';
import { employeeDataset } from '../utils/dataSet';

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
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

    // step 3
    async componentDidMount() {
        // step 4
        if (this.state.id === '_add') {
            return;
        } else {
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
    }
    saveOrUpdateEmployee = async (event) => {
        event.preventDefault();
        const { firstName, lastName, emailId } = this.state;
        let employee = { firstName, lastName, emailId };

        // step 5
        if (this.state.id === '_add') {
            try {
                const res = await createEmployee(employee);
                console.log('res', res);
                this.props.history.push('/employees');
            } catch (err) {
                console.error(err);
            }
        } else {
            try {
                const res = await updateEmployee(employee, this.state.id);
                console.log('res', res);
                this.props.history.push('/employees');
            } catch (err) {
                console.error(err);
            }
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

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">Add Employee</h3>
        } else {
            return <h3 className="text-center">Update Employee</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    {this.formGroup()}
                                    <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
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

export default CreateEmployeeComponent
