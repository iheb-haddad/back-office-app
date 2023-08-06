import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import './DocFormAjout.css'
import Select from "react-select";


function DocFormAjout() {
    const initialValues = {
        selectedApps: [],
        selectedLanguage: 'Francais',
        titleFr: '',
        titleAn: '',
        selectedTypeFr: 'Commun',
        selectedTypeAn: 'Common',
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
    
    const handleTitleFrChange = (event) => {
        setFormData((prevData) => ({
          ...prevData,
          titleFr: event.target.value,
        }));
      };
      
      const handleTitleAnChange = (event) => {
        setFormData((prevData) => ({
          ...prevData,
          titleAn: event.target.value,
        }));
      };

    const handleTypeFrChange = (event) => {
        setFormData((prevData) => ({
            ...prevData,
            selectedTypeFr: event.target.value,
          }));
          
      if (event.target.value === 'Commun' ){
        setFormData((prevData) => ({
            ...prevData,
            selectedTypeAn: 'Common',
          }));
      }else if (event.target.value === 'Fiche métier' ){
        setFormData((prevData) => ({
            ...prevData,
            selectedTypeAn: 'Job Description',
          }));
      }
      else{
        setFormData((prevData) => ({
            ...prevData,
            selectedTypeAn: 'Other',
          }));
      }
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
    const handleAddDocument = () => {
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
            titleFr: formData.titleFr,
            titleAn: formData.titleAn,
            typeFr: formData.selectedTypeFr,
            typeAn: formData.selectedTypeAn,
            application: valuesList,
            statut: formData.selectedStatut,
            urlDoc: formData.urlDocument,
          };
    
        fetch('https://urlsjsonserver-p2nq.onrender.com/documents', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newDocument),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('New document added:', data);
            setFormData(initialValues);
            setMessage("Le document est ajouté avec succés")
            setMessageColor("green")
            setTimeout(() => {
              setMessage("");
            }, 4000);
            // You can update your UI or perform other actions here
          })
          .catch((error) => {
            console.error('Error adding new document:', error);
            setMessage("Un problème effectue lors de l'ajout du document")
            setMessageColor("red")
            setTimeout(() => {
              setMessage("");
            }, 4000);
          });
        }
      };
  return (
    <div className='docFormAjout'>
        <div className="entete">
            <FontAwesomeIcon icon={faPlay} />
            <h1>AJOUT D'UN DOCUMENT</h1>
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
                 <h3>Titre (FR) *</h3>
                <input
                    type="text"
                    value={formData.titleFr}
                    onChange={handleTitleFrChange}
                    placeholder="Saisir titre en francais"
                    style={{border: showError && !formData.titleFr ? "1px solid red":"none"}}
                    />
            </div>
            <div className="configLine">
                <h3>Titre (EN) {formData.selectedLanguage === 'Anglais'? <span>*</span> : <span></span>}</h3>
                <input
                    type="text"
                    value={formData.titleAn}
                    onChange={handleTitleAnChange}
                    placeholder="Saisir titre en anglais"
                    style={{border: formData.selectedLanguage=== 'Anglais' && showError && !formData.titleAn ? "1px solid red":"none"}}
                    />
            </div>
            <div className="configLine">
                <h3>Type (FR) *</h3>
                <select value={formData.selectedTypeFr} onChange={handleTypeFrChange}>
                    <option value="Commun">Commun</option>
                    <option value="Fiche métier">Fiche métier</option>
                    <option value="Autre">Autre</option>
                </select>
            </div>  
            <div className="configLine">
                <h3>Type (EN)</h3>
                <div className="input">{formData.selectedTypeAn}</div>
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
              <button onClick={handleAddDocument}>Envoyer</button>
            </div>
        </div>
    </div>
  )
}

export default DocFormAjout