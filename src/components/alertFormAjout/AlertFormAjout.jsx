import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import './AlertFormAjout.css'
import Select from "react-select";
function AlertFormAjout() {
    const initialValues = {
        selectedApps: [],
        selectedLanguage: 'Francais',
        descriptionFr: '',
        descriptionAn: '',
        selectedType: 'Instruction',
        selectedStatut: 'Public',
        urlDocument: '',
      };
      const [formData, setFormData] = useState(initialValues);
      const handleAnnuler = () => {
        setFormData(initialValues);
      };

    // Array of all Apps
    const appsList = [
      { value: "http://localhost:3000/", label: "App1" },
      { value: "App2", label: "App2" },
      { value: "App3", label: "App3" },
    ];
    function handleSelectApp(data) {
        setFormData((prevData) => ({
            ...prevData,
            selectedApps : data
          }));
    }
    
    const handleLanguageChange = (event) => {
        setFormData((prevData) => ({
            ...prevData,
            selectedLanguage : event.target.value
          }));
          event.target.value === 'Anglais' ? setOblg('*') : setOblg('')
    };
    
    const handleDescriptionFrChange = (event) => {
        setFormData((prevData) => ({
          ...prevData,
          descriptionFr: event.target.value,
        }));
      };
      
      const handleDescriptionAnChange = (event) => {
        setFormData((prevData) => ({
          ...prevData,
          descriptionAn: event.target.value,
        }));
      };

    const handleTypeChange = (event) => {
        setFormData((prevData) => ({
            ...prevData,
            selectedType: event.target.value,
          }));
    };

    const handleStatutChange = (event) => {
        setFormData((prevData) => ({
            ...prevData,
            selectedStatut: event.target.value,
          }));
    };

    const handleUrlDocumentChange = (event) => {
        setFormData((prevData) => ({
            ...prevData,
            urlDocument: event.target.value,
          }));
    };
    const [message ,setMessage] = useState("")
    const [messageColor , setMessageColor] = useState("black")
    const [showError,setShowError] = useState(false)
    const handleAddAlerte = () => {
      const hasEmptyFields = Object.values(formData).some((value) => value === '');
      setShowError(hasEmptyFields);
      if (hasEmptyFields){
        setMessage("Il faut remplir tout les champs obligatoires *")
        setMessageColor("red")
        setTimeout(() => {
          setMessage("");
        }, 4000);
        }else{
        const valuesList = formData.selectedApps.map((app) => app.value);
        const newDocument = {
            id: Math.random().toString(36).substring(7),
            langue: formData.selectedLanguage,
            descriptionFr: formData.descriptionFr,
            descriptionAn: formData.descriptionAn,
            application: valuesList,
            statut: formData.selectedStatut,
            urlDoc: formData.urlDocument,
          };
        var path ='';
        formData.selectedType === 'Instruction' ? path = 'instructions' : path = 'alertes';  
    
        fetch('https://urlsjsonserver-p2nq.onrender.com/'+path, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newDocument),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('New alerte added:', data);
            setFormData(initialValues);
            setMessage("L'"+formData.selectedType+" est ajouté avec succés")
            setMessageColor("green")
            setTimeout(() => {
              setMessage("");
            }, 4000);
            // You can update your UI or perform other actions here
          })
          .catch((error) => {
            console.error('Error adding new document:', error);
            setMessage("Un problème effectue lors de l'ajout de l'"+formData.selectedType)
            setMessageColor("red")
            setTimeout(() => {
              setMessage("");
            }, 4000);
          });
        }
      };

  return (
    <div className='alertFormAjout'>
        <div className="entete">
            <FontAwesomeIcon icon={faPlay} />
            <h1>AJOUT INSTRUCTION / ALERTE</h1>
        </div>
        <div className="configBox">
        <div className="configLine">
                <h3>Langue *</h3>
                <select value={formData.selectedLanguage} onChange={handleLanguageChange}>
                    <option value="Francais">Francais</option>
                    <option value="Anglais">Anglais</option>
                </select>
            </div> 
            <div className="configLine">
                 <h3>Description (FR) *</h3>
                <input
                    type="text"
                    value={formData.descriptionFr}
                    onChange={handleDescriptionFrChange}
                    placeholder="Saisir description en francais"
                    style={{border: showError && !formData.descriptionFr ? "1px solid red":"none"}}
                    />
            </div>
            <div className="configLine">
                <h3>Description (EN) {formData.selectedLanguage === 'Anglais'? <span>*</span> : <span></span>}</h3>
                <input
                    type="text"
                    value={formData.descriptionAn}
                    onChange={handleDescriptionAnChange}
                    placeholder="Saisir description en anglais"
                    style={{border: formData.selectedLanguage=== 'Anglais' && showError && !formData.descriptionAn ? "1px solid red":"none"}}
                    />
            </div>
            <div className="configLine">
                <h3>Type *</h3>
                <select value={formData.selectedType} onChange={handleTypeChange}>
                    <option value="Instruction">Instruction</option>
                    <option value="Alerte">Alerte</option>
                </select>
            </div>  
            <div className="configLine">
                <h3>Application *</h3>
                <Select className={showError && !formData.selectedApps[0] ? 'dropDown-menu error':'dropDown-menu'}
                    options={appsList}
                    placeholder="Select application"
                    value={formData.selectedApps}
                    onChange={handleSelectApp}
                    isSearchable={true}
                    isMulti
                />
            </div>
            <div className="configLine">
                <h3>Statut *</h3>
                <select value={formData.selectedStatut} onChange={handleStatutChange}>
                    <option value="option1">Public</option>
                    <option value="option2">Brouillon</option>
                </select>
            </div>
            <div className="configLine">
                 <h3>URL Document *</h3>
                <input
                    type="text"
                    value={formData.urlDocument}
                    onChange={handleUrlDocumentChange}
                    placeholder="Saisir Url du document"
                    style={{border: showError && !formData.urlDocument ? "1px solid red":"none"}}
                    />
            </div>                                  
        </div>
        <div className="buttons">
        <div className="message" style={{color:messageColor}}>{message}</div>
           <div>
              <button onClick={handleAnnuler}>Annuler</button>
              <button onClick={handleAddAlerte}>Envoyer</button>
            </div>
        </div>
    </div>
  )
}

export default AlertFormAjout