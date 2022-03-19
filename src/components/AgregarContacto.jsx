import React from 'react';
import axios from 'axios';

export default class AgregarContacto extends React.Component {
  state = {
      id:0,
    nombre: ''
  }

  handleChange = event => {
    this.setState({ nombre: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const contacto = {
        id:this.state.id,
      nombre: this.state.nombre
    };

    axios.post(`http://81g.itesrc.net/api/contactos`, { contacto })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
           Nombre del Contacto
            <input type="text" name="nombre" onChange={this.handleChange} />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}
