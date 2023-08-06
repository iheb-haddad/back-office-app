import React from 'react'
import {useState} from 'react'
import './Registration.css';

function Registration(props) {
    const [isChecked, setChecked] = useState(false);

    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [msgErreur1, setMsgErreur1] = useState('');
    const [msgErreur2, setMsgErreur2] = useState('');
  

    const handleChange = (event) => {
      setChecked(event.target.checked);
    };
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
      setMsgErreur1('');
      setMsgErreur2('');
    };
  
    const handleMotDePasseChange = (event) => {
      setMotDePasse(event.target.value);
      setMsgErreur2('');
    };
    const handleConnect = () => {
      // Make the GET request to the server
      fetch('https://urlsjsonserver.onrender.com/admins')
        .then((response) => response.json())
        .then((data) => {
          const user = data.find((item) => item.email === email);
          if (!user) {
            setMsgErreur1('Email invalide');
          } else {
            if (user.pass !== motDePasse) {
              setMsgErreur2('Mot de passe incorrect');
            } else {
              props.setConnectValide(true);
              props.setUsername(user.username);
              isChecked && (localStorage.setItem('connectValide', true), localStorage.setItem('username', user.username));
              // You can perform further actions after successful login here
            }
          }
        })
        .catch((error) => {
          console.error('Error connecting:', error);
          // Handle any error that occurred during the fetch request
        });
    };
  
  return (
    <div className='registration'>
        <div className="registrationBox">
            <div className="headBox">
            <div className="subtitle">Connecter-vous au BOS</div>
            <div className="title">Back Office Settings</div>
            </div>
            <div className="bodyContainer">
                <div className="bodyBox1">
                    <div className="inputBox">
                        <div className="inputLine">
                            <h3>EMAIL *</h3>
                            <input
                            type="text"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Entrer Email"                  
                            />
                        </div>
                        <div className="messageBox">
                            <div className="marg"></div>
                            <p>{msgErreur1}</p>
                        </div>     
                        <div className="inputLine">
                            <h3>MOT DE PASSE *</h3>
                            <input
                            type="text"
                            value={motDePasse}
                            onChange={handleMotDePasseChange}
                            placeholder="Entrer Mot de passe"
                            />
                        </div>
                        <div className="messageBox">
                            <div className="marg"></div>
                            <p>{msgErreur2}</p>
                        </div>
                    </div>
                    <div className="optionsBox">
                        <div className="options">
                            <label>
                                <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleChange}
                                />
                                Rester connecté
                            </label>
                            <h4>Mot de passe oublié</h4>
                        </div>
                        <button onClick={handleConnect}>Me Connecter</button>
                    </div>  
                </div>
                <div className="bodyBox2">
                    <h5>* Champ obligatoire</h5>
                    <h5>BOS = Back Office Settings</h5>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Registration
