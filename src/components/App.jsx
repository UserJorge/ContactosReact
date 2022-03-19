import  React,{Component,useState} from 'react';
import {ReactDom} from 'react-dom';
import axios  from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table,Button,Container,ModalBody,ModalHeader,FormGroup,ModalFooter} from 'reactstrap';

const url="https://www.181g0249.81g.itesrc.net/api/producto/";

class App extends Component {
 
  state={
    data:[],
    form:
    {
      id:'',
      nombre:'',
      descripcion:'',
      precioKilo:0,
      precioMayoreo:0,
      precioPza:0,    
      unidadMedida:0
    }
  }
  componentDidMount(){
    axios.get(url).then(response=>{this.setState({data:response.data}); console.log(response.data);});
  }
  render(){
  return (
      <Container>
    <div className="App">
      <br/>
      <Button >Agregar contacto</Button>
      <table className="table">
        <thead>
          <tr>
            <th>id</th>
            <th>nombre</th>
            <th>descripcion</th>
            <th>precioKilo</th>    
            <th>precioMayoreo</th>      
            <th>precioPza</th>        
            <th>unidadMedida</th>   
          </tr>
        </thead>
        <tbody>
        {
            this.state.data.map
            (
              producto=>
            {
              <tr>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.descripcion}</td>
                <td>{producto.precioKilo}</td>
                <td>{producto.precioMayoreo}</td>
                <td>{producto.precioPza}</td>              
                <td>{producto.unidadMedida}</td>
                <td>
                  <button >Editar</button>
                  {"  "}
                  <button >Eliminar</button>
                </td>
              </tr>         
            }
          )
          }
        </tbody>      
      </table>
    </div>
    </Container>
  );
}

}

export default App;