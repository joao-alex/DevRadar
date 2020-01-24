import React,{useState} from 'react';
import {Icon,Dialog,DialogContent,DialogContentText, DialogTitle} from '@material-ui/core'

import api from '../../services/api'

import './styles.css'

export default function DevItem({dev}) {
    const [openDialog,setOpenDialog] = useState(false);
    const [latitude,setLatitude] = useState('');
    const [longitude,setLongitude] = useState('');
    async function handleDelete(_id){
        if(window.confirm('Deseja realmente excluir?')){
            await api.delete(`/devs/${_id}`)
            window.location.reload()
        }     
    }
    function handleOpen(){
        setOpenDialog(true)
    }
    function handleClose(){
        setOpenDialog(false)
    }

    async function handleEdit(_id){
        const response = await api.put(`/devs/${_id}/location`,{latitude,longitude})
        if(response.status === 200){
            window.location.reload()
        }
    }
  return (
    <li className="dev-item">
        <header>
            <img src={dev.avatar_url} alt={dev.name}/>
            <div className="user-info">
                <strong>{dev.name}, {dev.city}</strong>
                <span>{dev.techs.join(', ')}</span>
            </div>
        </header>
        <p>
            {dev.bio}
        </p>
        <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no GitHub</a>
        <div>
            <button className="btn" onClick={handleOpen}><Icon children="edit"/></button>
            <button className="btn" onClick={()=>{handleDelete(dev._id)}}><Icon children="delete"/></button>
        </div>
        <Dialog open={openDialog} onClose={handleClose}>
            <DialogTitle>Editar localizacao</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Digite a nova localização do Dev 
                </DialogContentText>
                <input placeholder="Latidude" value={latitude} onChange={event=>setLatitude(event.target.value)} required/>
                <input placeholder="Longitude" value={longitude} onChange={event=>setLongitude(event.target.value)} required/>
                <button className="btn" style={{width:'100%'}} onClick={()=>{handleEdit(dev._id)}}>Salvar</button>
            </DialogContent>   
        </Dialog>
        
    </li>
    );
}
