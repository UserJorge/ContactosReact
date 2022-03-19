import React from "react";
import  ReactDOM  from "react-dom";
import {Table,Button,Container,Modal,ModalBody,ModalHeader,FormGroup,ModalFooter} from 'reactstrap';

const agregarForm=document.getElementById("agregar");
class AgregarForm extends React.Component{
    constructor(props){
        super(props);
        this.el=document.createElement("div");
    }


    componentDidMount=()=>{
        agregarForm.appendChild(this.el);
    }
    componentWillUnmount=()=>{
        agregarForm.removeChild(this.el);
    }
    render(){
        const {child}=this.props;
        return ReactDOM.createPortal(child,this.el);
   
}
}