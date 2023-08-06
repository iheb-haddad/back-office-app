import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRightFromBracket ,faPlay ,faX} from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import {DocFormAjout ,AlertFormAjout,DocFormSupp,AlertFormSupp} from '../index';
import './Navbar.css'
function Navbar(props) {
    const [isClickedDoc, setIsClickedDoc] = useState(false);
    const [isClickedAlert, setIsClickedAlert] = useState(false);
    const handleClickDoc = (doc) => {
        isClickedDoc? props.setPathname('') : props.setPathname('Documents')
        setIsClickedDoc(prev => !prev)
        setIsClickedAlert(false)
    };
    const handleClickAlert = (doc) => {
        isClickedAlert? props.setPathname('') : props.setPathname('Instructions et Alertes')
        setIsClickedAlert(prev => !prev)
        setIsClickedDoc(false)
    };

    const handleChargeAddDoc = () => {
        props.handleChargeComponent(<DocFormAjout/>)
        props.showNavbar();
    }
    const handleChargeAddAlert = () => {
        props.handleChargeComponent(<AlertFormAjout/>)
        props.showNavbar();
    }
    const handleChargeDelDoc = () => {
        props.handleChargeComponent(<DocFormSupp/>)
        props.showNavbar();
    }
    const handleChargeDelAlert = () => {
        props.handleChargeComponent(<AlertFormSupp/>)
        props.showNavbar();
    }
  return (
    <div style={{display:"flex"}}>
    <div className="navbar">
    <div className="head">
              <div className="croix"><FontAwesomeIcon icon={faX} style={{cursor:'pointer'}} onClick={props.showNavbar}/></div>
        <div className="title">Back Office Settings</div>
        <div className="subtitle">Panneau latéral</div>
    </div>
        <div className="userInfo">
            <h3>Vous etes connecté en tant que...</h3>
            <div className="username">
                <FontAwesomeIcon icon={faUser} /><span>{props.username}</span>
            </div>
            <button onClick={props.handleDeconnect}>
                <span>Me Déconnecter</span>
                <FontAwesomeIcon icon={faRightFromBracket} beat />
            </button>
        </div>
        <div className="navLine">
            <div className="icon"><FontAwesomeIcon icon={faPlay} /></div>
            <div className="title" onClick={handleClickDoc}>Documents</div>
        </div>
        { isClickedDoc &&
            <div className="subLine">
                    <div className="icon"></div>
                    <div className="title" onClick={handleChargeAddDoc}>Ajouter</div>
            </div>}
        { isClickedDoc &&    
            <div className="subLine">
                <div className="icon"></div>
                <div className="title" onClick={handleChargeDelDoc}>Supprimer</div>
            </div>}
        <div className="navLine">
            <div className="icon"><FontAwesomeIcon icon={faPlay} /></div>
            <div className="title" onClick={handleClickAlert}>Alertes et instructions</div>
        </div>
        { isClickedAlert &&
            <div className="subLine">
                    <div className="icon"></div>
                    <div className="title" onClick={handleChargeAddAlert}>Ajouter</div>
            </div>}
        { isClickedAlert &&    
            <div className="subLine">
                <div className="icon"></div>
                <div className="title" onClick={handleChargeDelAlert}>Supprimer</div>
            </div>}       
  </div>
  <div className="blur-overlay"></div>
  </div>
  )
}

export default Navbar