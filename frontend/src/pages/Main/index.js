import React, {useState,useEffect} from 'react';
import api from '../../services/api'

import DevList from '../../components/DevItem';

import './styles.css'

export default function Main(){
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [techs,setTechs] = useState('');
    const [github_username, setGithub_username] = useState('');
    const [devs,setDevs] = useState([]);
    const [att ,setAtt] = useState(false);

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(position=>{
            setLatitude(position.coords.latitude.toFixed(7));
            setLongitude(position.coords.longitude.toFixed(7));
        })
    },[])

    useEffect(()=>{
        async function listDevs(){
            const response = await api.get('/devs');
            setDevs(response.data)
        }
        listDevs()
    },[att])

    async function handleSubmit(event){
        event.preventDefault();
        await api.post('/devs',{github_username,techs,latitude,longitude})
        setAtt(!att);
        setGithub_username('')
        setTechs('')
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>
                    Cadastrar
                </h1>
                <label>Usuario do GitHub</label>
                <input type="text" className="username" onChange={event=>setGithub_username(event.target.value)} value={github_username} required/>
                <label>Tecnologias</label>
                <input type="text" className="techs" onChange={event=>setTechs(event.target.value)} value={techs} required/>
                <div className="locationbox">
                    <div className="column">
                        <label>Latitude</label>
                        <input className="latitude" onChange={event=>setLatitude(event.target.value)} value={latitude} required/>
                    </div>
                    <div className="column">
                        <label>Longitude</label>
                        <input className="longitude" onChange={event=>setLongitude(event.target.value)} value={longitude} required/>
                    </div>
                </div>
                <button type="submit" className="btn">
                    Salvar
                </button>
            </form>
            <div className="boxes">
                <ul>
                    {devs ? devs.map(dev =>
                        <DevList key={dev._id} dev={dev}/>
                    ): <h1>Nenhum dev cadastrado...</h1>}
        
                </ul>
            </div>
        </>
    )
}