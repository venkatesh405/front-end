import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { Navbar, ButtonToolbar, Button } from 'react-bootstrap';
import Aux from './Aux';
// import Axios from 'axios';

class employeeTable extends Component {

  state = {
    columns: [
      { title: 'id', field: 'id', type: 'numeric' },
      { title: 'Work Item', field: 'workItem', type: 'string' },
      { title: 'Due Date', field: 'dueDate', type: 'date' },
      {
        title: 'No of Resources',
        field: 'noOfRes',
        type: 'numeric',
      },
      {
        title: 'Status',
        field: 'rStatus',
        lookup: { 1: 'Overdue', 2: 'In Progress', 3: 'Done' },
      }
    ],
    data: JSON.parse(localStorage.getItem("data"))
    // [
    //   { id: 1, workItem: 'start tempting', dueDate: '23/05/2018', noOfRes: 3 },
    // ]
    ,
    noOfWorItems: JSON.parse(localStorage.getItem("data")).length
  };

  getSheetValues = async () => {
    alert("data uploaded successfully");
    
    const request = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/1Dra6B_3n2r5OgU3VjYrg31exQucwnPY52o6KtzuANHM/batchGet`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ya29.GlvfBtCQ5SHDvUIlEk_CJyAqhAcBGBeJvOn4OkyxW6q95Jb7xmWrvQnmWZv6il14WBCtjUWPxCASbN42QLNRYI-8e7AopGU_N4UqpU0HhCbu4SjBFHS2w6ssZBiO"
        }
      });
    const data = await request.json();
  }

  render() {
    return (
      <Aux>
        <Navbar>
          <Navbar.Brand className="brand-name"><b>EMPLOYEE STATUS</b></Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Number Of Work Items : {this.state.noOfWorItems}
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        <div className="pull-right" >
          <ButtonToolbar>
            <Button variant="info" onClick={this.getSheetValues}>Upload To Drive</Button>
          </ButtonToolbar>
        </div>
        <MaterialTable
          title=""
          columns={this.state.columns}
          data={this.state.data}
          editable={{
            onRowAdd: newData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...this.state.data];
                  data.push(newData);
                  this.setState({ ...this.state, data, noOfWorItems: data.length });
                  localStorage.setItem("data", JSON.stringify(data));
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...this.state.data];
                  data[data.indexOf(oldData)] = newData;
                  this.setState({ ...this.state, data, noOfWorItems: data.length });
                  localStorage.setItem("data", JSON.stringify(data));
                }, 600);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...this.state.data];
                  data.splice(data.indexOf(oldData), 1);
                  this.setState({ ...this.state, data, noOfWorItems: data.length });
                  localStorage.setItem("data", JSON.stringify(data));
                }, 600);
              }),

          }}
          options={{
            actionsColumnIndex: -1
          }}
        />
      </Aux>
    );
  }
}

export default employeeTable;