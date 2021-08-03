import React, { Component } from 'react';
import { getEmployeeById } from '../services/EmployeeService';
import {employeeDataset} from '../utils/dataSet';

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            employee: {}
        }
    }

    async componentDidMount() {
        try {
            const { data } = await getEmployeeById(this.state.id);
            this.setState({ employee: data });
        } catch (err) {
            console.error(err);
        }
    }

    detailRowCreater = () => {
        return (
            employeeDataset.map(employee => (
                <div className="row">
                    <label> {employee.label}: </label>
                    <div> {this.state.employee[employee.value]}</div>
                </div>
            ))
        )
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center"> View Employee Details</h3>
                    <div className="card-body">
                        {this.detailRowCreater()}
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewEmployeeComponent;
