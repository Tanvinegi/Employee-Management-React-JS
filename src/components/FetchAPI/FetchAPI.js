import React, { Component } from 'react'
import * as ReactBootstrap from "react-bootstrap";
export default class FetchAPI extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         loading: true,
         person: null,
      }
    }
    //The data in fetch() is transformed to a string using the JSON. stringify method.
    async componentDidMount(){
        const url= "https://jsonplaceholder.typicode.com/users"
        const response= await fetch(url)
        const data= await response.json()
        console.log(data)

        this.setState({
            loading:false,
            person:data[0]
        })
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
                  <td>
                    {m.email}
                  </td>
                </tr>
              ))}
            </div>
          )}
        </div>
      );
    };
  render() {
    return (

      <div>
      <ReactBootstrap.Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>{this.renderdata()}</tbody>
      </ReactBootstrap.Table>
    </div>
    )
  }
}

      // <div><h1>Fetch Api</h1> <br/>
      //   {this.state.loading?<div>Loading.......</div>:<div>
      //       <div>{this.state.person.name}</div>
      //       <div>{this.state.person.username}</div>
      //       <div>{this.state.person.email}</div>
      //       <div>{this.state.person.address.street}</div>
      //       <div>{this.state.person.company.name}</div>
      //       <div>{this.state.person.company.catchPhrase}</div>
      //       </div>}
      // </div>