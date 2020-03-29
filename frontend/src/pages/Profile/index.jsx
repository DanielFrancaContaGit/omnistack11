import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import './style.css';


export default function Profile() {

  const [ incidents, setIncidents ] = useState([]);

  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');
  const history = useHistory();

  useEffect(()=>{
    api.get('profile',{
      headers: {
        Authorization: ongId,
      }
    }).then(response => {
      setIncidents(response.data);
    })
  },[ongId]);

  async function handleDelite(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        }
      });
      setIncidents(incidents.filter(incidents => incidents.id !== id));
    } catch (error) {
      alert("Erro aou deletar tente novamente ");
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return(
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero"/>
          <span>Bem vinda {ongName}</span>
        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout} type="button">
          <FiPower siza={18} color="#f02041"/>
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
       {incidents.map(incident => (
          <li key={incident.id}>
          <strong>Caso:</strong>
          <p>{incident.title}</p>

          <strong>Descrição:</strong>
          <p>{incident.description}</p>

          <strong>Valor:</strong>
          <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

          <button  onClick={() => handleDelite(incident.id)} type="button">
            <FiTrash2 size={20}  color="#a8a8bc" />
          </button>
        </li>
       ))}
      </ul>
    </div>
  );
}