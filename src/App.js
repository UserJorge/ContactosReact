import  React,{Component} from 'react';
import {ReactDom} from 'react-dom';
import axios  from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table,Button,Container,ModalBody,ModalHeader,FormGroup,ModalFooter,Modal} from 'reactstrap';

const url="https://www.181g0249.81g.itesrc.net/api/producto/";
var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});



class App extends Component {
  state={
    data:[],
    modalInsertar:false,
    modalEliminar:false,
    tipoModal:'',
    form:{
      id:'',
      nombre:'',
      descripcion:'',
      precioKilo:formatter.format(0),
      precioMayoreo:formatter.format(0),
      precioPza:formatter.format(0),
      unidadMedida:0,   
    }
  }
  peticionGet=()=>{
    axios.get(url).then(response=>{this.setState({data:response.data}); console.log(response.data);}).catch(error=>{console.log(error.message)});
  }
  componentDidMount(){
    this.peticionGet();
  }
  modalInsertar=()=>{
    this.setState({modalInsertar:!this.state.modalInsertar});
  }
  
  handleChange= async e=>{
    e.persist();
    await this.setState({
      form:{
        ...this.state.form,
        [e.target.name]:e.target.value
      }
    }
    );
    console.log(this.state.form);
  }
  peticionPost=async ()=>{
    delete this.state.form.id;
    await axios.post(url,this.state.form).then(response=>{this.modalInsertar(); this.peticionGet();}).catch(error=>{console.log(error.message)});
  }
  seleccionarProducto=(producto)=>{
this.setState({
  tipoModal:'actualizar',
  form:{
    id:producto.id,
    nombre:producto.nombre,
    descripcion:producto.descripcion,
    precioKilo:producto.precioKilo,
    precioMayoreo:producto.precioMayoreo,
    precioPza:producto.precioPza,
    unidadMedida:producto.unidadMedida
  }
})
  }
  peticionPut=async ()=>{
    await axios.put(url,this.state.form).then(response=>{this.modalInsertar();this.peticionGet();}).catch(error=>{console.log(error.message)});
  }
  peticionDelete=()=>{
     axios.delete(url+this.state.form.id).then(response=>{this.setState({modalEliminar:false});this.peticionGet();}).catch(error=>{console.log(error.message)});
  }
  render(){
    const {form}=this.state;
  return (
      <Container>
    <div className="App">
      <br/>
      <Button onClick={()=>{ this.setState({tipoModal:'insertar'}); this.modalInsertar(); }} >Agregar contacto</Button>
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
              return(
              <tr>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.descripcion}</td>
                <td>{formatter.format(producto.precioKilo)}</td>
                <td>{formatter.format(producto.precioMayoreo)}</td>
                <td>{formatter.format(producto.precioPza)}</td>              
                <td>{producto.unidadMedida}</td>
               
                <td>
                  <button onClick={()=>{this.seleccionarProducto(producto); this.modalInsertar();}}>Editar</button>
                  {"  "}
                  <button  onClick={()=>{this.seleccionarProducto(producto); this.setState({modalEliminar:true})}}>Eliminar</button>
                </td>
              </tr>     
              )    
            }

          )
          }
        </tbody>      
      </table>
    </div>
    <Modal isOpen={this.state.modalInsertar}>
      <ModalHeader style={{display:'block'}}>
        <span style={{float:'right'}}></span>
      </ModalHeader>
      <ModalBody>
        <div className='form-group'>
          <label htmlFor='id'>ID</label>
          <input className='form-control' type="text" name="id" id="id" readOnly value={form? form.id:this.state.data.length+1}/>
          <br/>
          <label htmlFor='nombre'>Nombre</label>
          <input className='form-control' type="text" name="nombre" id="nombre" onChange={this.handleChange} value={form?form.nombre:''} />
          <br/>
          <label htmlFor='descripcion'>Descripci??n</label>
          <input className='form-control' type="text" name="descripcion" id="descripcion" onChange={this.handleChange} value={form?form.descripcion:''}/>
          <br/>
          <label htmlFor='precioKilo'>Precio por Kilo</label>
          <input className='form-control' type="number" name="precioKilo" id="precioKilo" onChange={this.handleChange} value={form?form.precioKilo:formatter.format(0)} />
          <br/>
          <label htmlFor='precioMayoreo'>Precio al Mayoreo</label>
          <input className='form-control' type="number" name="precioMayoreo" id="precioMayoreo" onChange={this.handleChange} value={form?form.precioMayoreo:formatter.format(0)}/>
          <br/>
          <label htmlFor='precioPza'>Precio por Pieza</label>
          <input className='form-control' type="number" name="precioPza" id="precioPza" onChange={this.handleChange} value={form?form.precioPza:formatter.format(0)}/>
          <br/>
          <label htmlFor='unidadMedida'>Unidad de medida</label>
          <input className='form-control' type="number" name="unidadMedida" id="unidadMedida" onChange={this.handleChange}  value={form?form.unidadMedida:formatter.format(0)}/>

        </div>
      </ModalBody>
      <ModalFooter>
        { 
          this.state.tipoModal==="insertar"?
          <button className='btn btn-success' onClick={()=>this.peticionPost()}>Insertar</button>: <button className='btn btn-primary' onClick={()=>this.peticionPut()}>Actualizar</button>
        }
        
        <button className='btn btn-danger' onClick={()=>this.modalInsertar()}>Cancelar</button>
      </ModalFooter>
    </Modal>
    <Modal isOpen={this.state.modalEliminar}>
      <ModalBody>
        ??Estas seguro de que quieres eliminar el producto {form && form.nombre}?
      </ModalBody>
      <ModalFooter>
        <button className='btn btn-danger' onClick={()=>this.peticionDelete()}>S??</button>
        <button className='btn btn-secundary' onClick={()=>this.setState({modalEliminar:false})}>No</button>

      </ModalFooter>

    </Modal>

    </Container>
  );
}

}
export default App;