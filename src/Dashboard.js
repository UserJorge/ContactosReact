import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './modal.css';
const Modal=({handleClose, show, children})=>{
    const showHideClassName=show?"modal display-block":"modal display-none";
    return(
        <div className={showHideClassName}>           
            <section className='modal-main'>
              {children}             
              <button type='button' onClick={handleClose}>
                  Close
              </button>
            </section>
        </div>
    );
};
class Dashboard extends Component{
    constructor(){
        super();
        this.state={
            show:false
        };
        this.showModal=this.showModal.bind(this);
        this.hideModal=this.hideModal.bind(this);
    }
    showModal=()=>{
        this.setState({show:true});
    };
    hideModal=()=>{
        this.setState({show:false});
    };
    render(){
        return(
            <main>
                <h1>React Modal</h1>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    <div style={styles.wrapper} >
                    <div style={styles.window}>
                        <form>               
                            <input type="text" hidden></input>
                            <label>Nombre</label>
                            <input type="text" placeholder="nombre"></input><br/>
                            <input type="submit"></input>
                        </form>
                    </div>
                    </div>
                </Modal>
                <button type="button" onClick={this.showModal}>
                    Open
                </button>
            </main>
        );
    }
}
const styles={
    wrapper:{
        position:"absoulte",
        top:0,
        left:0,
        width:'100%',
        height:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    window:{
        position:'relative',
        background:'#FFF',
        borderRadius:5,
        padding:15,
        boxShadow:'2px 2px 10px rgba(0,0,0,3)',
        zindex:10,
        minWidth:320
    },
    closeBtn:
    {
        position:'abosulte',
        top:0,
        right:0
    }

};
export default Dashboard