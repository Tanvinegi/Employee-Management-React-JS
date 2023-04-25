import axios from "axios";
import React, { Component } from "react";
export default class Axios extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      person: [],
    };
  }
  // Axois give data directly no need of convert in string
  async componentDidMount() {
    const url = "https://jsonplaceholder.typicode.com/users";
    const response = await axios(url);
    const data = await response.data;
    console.log(data);
    this.setState({
      loading: false,
      person: data,
    });
  }
  renderdata = () => {
    return (
      <div>
        {this.state.loading ? (
          <div>Loading........</div>
        ) : (
          <div>
            {this.state.person.map((m) => (
              <tr key={m.id}>             
                <td>{m.id}</td>               
                <td>{m.name}</td>
                <td>{m.email}</td>
              </tr>
            ))}
          </div>
        )}
      </div>
    );
  };
  render() {
    return (
      <div className="container">
        <table className="table table-striped" >
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Eamil
              </th>
            </tr>
          </thead>
          <tbody>
            {this.renderdata()}
          </tbody>
        </table>
      </div>
    );
  }
}
