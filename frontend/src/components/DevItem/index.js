import React from 'react';
import {Icon} from '@material-ui/core'

import api from '../../services/api'

import './styles.css'

export default function DevItem({dev}) {
    async function handleDelete(_id){
        if(window.confirm('Deseja realmente excluir?')){
            await api.delete(`/devs/${_id}`)
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
            <button className="btn"><Icon children="edit"/></button>
            <button className="btn" onClick={()=>{handleDelete(dev._id)}}><Icon children="delete"/></button>
        </div>
        
    </li>
    );
}
