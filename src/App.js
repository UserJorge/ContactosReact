import {Component, React} from 'react';
import {ReactDom} from 'react-dom';
import axios  from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table,Button,Container,Modal,ModalBody,ModalHeader,FormGroup,ModalFooter} from 'reactstrap';

const url="http://81g.itesrc.net/api/contactos";
class App extends Component {
  state={
    data:[],
    modalInsertar:false,
    form:{
      id:'',
      nombre:''
    }
  }
  peticionGet=()=>{
    axios.get(url).then(response=>{this.setState({data:response.data})})
  }
  peticionPost=()=>{
    axios.post(url,this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
    })
    .catch
    (
      error=>
      {console.log(error.message);}
    )
  }
  modalInsertar=()=>{
    this.setState({modalInsertar:!this.state.modalInsertar});
  }
  componentDidMount(){
    this.peticionGet();
  }
  render(){
  return (
    <div className="App">
      <br/>
      <Button onClick={()=>this.modalInsertar()}>Agregar contacto</Button>
      <table className="table">
        <thead>
          <tr>
            <th>id</th>
            <th>nombre</th>
          </tr>
        </thead>
        <tbody>
            {this.state.data.map(contacto=>{
            return(
              <tr>
                <td>{contacto.id}</td>
                <td>{contacto.nombre}</td>
                <td>
                  <Button className='btn btn-primary'>Editar</Button>
                  {"  "}
                  <Button className='btn btn-danger'>Eliminar</Button>
                </td>
              </tr>
            );
          })}
        </tbody>      
      </table>
    </div>
  );
}
}

export default App;
