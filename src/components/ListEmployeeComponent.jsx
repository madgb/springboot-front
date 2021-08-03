import React, { Component } from 'react'
import { getEmployees, deleteEmployee } from '../services/EmployeeService'
import { employeeDataset } from '../utils/dataSet';

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employees: []
        }
    }

    async componentDidMount() {
        const { data } = await getEmployees();
        this.setState({
            employees: data
        });
    }

    deleteEmployee = async (id) => {
        try {
            const res = await deleteEmployee(id);
            console.log('deleteEmployee', res);
            this.setState({
                employees: this.state.employees.filter(employee => employee.id !== id)
            });
        } catch (err) {
            console.error(err);
        }
    }

    viewEmployee = (id) => {
        this.props.history.push(`/view-employee/${id}`);
    }

    editEmployee = (id) => {
        this.props.history.push(`/add-employee/${id}`);
    }


    addEmployee = () => {
        this.props.history.push('/add-employee/_add');
    }

    tableHeaderCreator = (isTh) => {
        const labels = employeeDataset.map(emp => emp.label);
        return labels.map(label => isTh ? <th> {label}</th> : <td> {label}</td>)
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Employees List</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addEmployee}> Add Employee</button>
                </div>
                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">

                        <thead>
                            <tr>
                                {this.tableHeaderCreator(true)}
                                <th> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                        <tr key={employee.id}>
                                            <td> {employee.firstName} </td>
                                            <td> {employee.lastName}</td>
                                            <td> {employee.emailId}</td>
                                            <td> {employee.address}</td>
                                            <td> {employee.managerName}</td>
                                            <td> {employee.department}</td>
                                            <td> {employee.phoneNumber}</td>
                                            <td>
                                                <button onClick={() => this.editEmployee(employee.id)} className="btn btn-info">Update </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.viewEmployee(employee.id)} className="btn btn-info">View </button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ListEmployeeComponent;
