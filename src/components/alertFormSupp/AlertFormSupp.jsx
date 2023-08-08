import React ,{useState}from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import './AlertFormSupp.css'
import Select from "react-select";
function AlertFormSupp() {
    const initialValues = {
        selectedApps: [],
        descriptionFr: '',
        selectedType: 'Instruction',
        urlDocument: '',
      };
      const [formData, setFormData] = useState(initialValues);
      const handleAnnuler = () => {
        setFormData(initialValues);
      };  

      const appsList = [
        { value: "app1", label: "App1" },
        { value: "http://localhost:3000/", label: "App2" },
        { value: "App3", label: "App3" },
      ];
      function handleSelectApp(data) {
          setFormData((prevData) => ({
              ...prevData,
              selectedApps : data
            }));
      };

      const handleDescriptionFrChange = (event) => {
        setFormData((prevData) => ({
          ...prevData,
          descriptionFr: event.target.value,
        }));
      };

      const handleTypeChange = (event) => {
        setFormData((prevData) => ({
            ...prevData,
            selectedType: event.target.value,
          }));
        };
        
        const handleUrlDocumentChange = (event) => {
            setFormData((prevData) => ({
                ...prevData,
                urlDocument: event.target.value,
              }));
        };

        const checkApplications = (appsList1, appsList2) => {
          var ch = []
          var i = 0
            for (const app of appsList1) {
              if (appsList2.includes(app)) {
                console.log(`${app} is present in list2.`);
              } else {
                console.log(`${app} is not present in list2.`);
                ch[i] = app
                i++
              }
            }
            console.log(ch)
              return ch;
          };
          const [message ,setMessage] = useState("")
          const [messageColor , setMessageColor] = useState("black")
          const handleDeleteDocument = (documentId) => {
            var path ='';
            formData.selectedType === 'Instruction' ? path = 'instructions' : path = 'alertes';
            fetch(`https://urlsjsonserver-p2nq.onrender.com/`+path+`/${documentId}`, {
              method: 'DELETE',
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(formData.selectedType+" deleted:", data);
                setMessage("L'"+formData.selectedType+" est supprimé avec succés")
                setMessageColor("green")
                setTimeout(() => {
                  setMessage("");
                }, 4000);
                // You can update your UI or perform other actions here
              })
              .catch((error) => {
                console.error('Error deleting '+formData.selectedType, error);
                setMessage("Un erreur s'effectue lors du suppression de l'"+formData.selectedType)
                setMessageColor("red")
                setTimeout(() => {
                  setMessage("");
                }, 4000);
              });
          };

          const handleDeleteApp = (documentId,updatedApplicationsList,msg) => {
            var path ='';
            formData.selectedType === 'Instruction' ? path = 'instructions' : path = 'alertes';
            fetch(`https://urlsjsonserver-p2nq.onrender.com/`+path+`/${documentId}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ application: updatedApplicationsList }),
              })
                .then((response) => response.json())
                .then((updatedDocument) => {
                  console.log(formData.selectedType+" updated:", updatedApplicationsList);
                  setMessage("Le lien entre cet "+formData.selectedType+" et "+msg+" est supprimé avec succés")
                  setMessageColor("green")
                  setTimeout(() => {
                    setMessage("");
                  }, 4000);
                  // You can perform additional actions here if needed
                })
                .catch((error) => {
                  console.error('Error updating document:'+formData.selectedType, error);
                  setMessage("Un erreur s'effectue lors du suppression du lient entre l'"+formData.selectedType+" et "+msg)
                  setMessageColor("red")
                  setTimeout(() => {
                    setMessage("");
                  }, 4000);
                });
          }
          const [showError,setShowError] = useState(false)
        const searchDocuments = () => {
          const hasEmptyFields = Object.values(formData).some((value) => value === '');
          setShowError(hasEmptyFields);
          if (hasEmptyFields){
            setMessage("Il faut remplir tout les champs obligatoires *")
            setMessageColor("red")
            setTimeout(() => {
              setMessage("");
            }, 4000);
          }else{
            // Construct the query parameters
            const queryParams = new URLSearchParams({
            descriptionFr: formData.descriptionFr,
            type: formData.selectedType,
            urlDoc: formData.urlDocument,
            }).toString();

            var path ='';
            formData.selectedType === 'Instruction' ? path = 'instructions' : path = 'alertes';
            // Send the GET request with the query parameters
            fetch(`https://urlsjsonserver-p2nq.onrender.com/`+path+`?${queryParams}`)
            .then((response) => response.json())
            .then((data) => {
                var ch = []
                if(data.length != 0){
                    console.log(data[0].application);
                    const valuesList = formData.selectedApps.map((app) => app.value);
                    if((ch=checkApplications(valuesList,data[0].application)).length==0){
                        if(valuesList.length === data[0].application.length){
                            handleDeleteDocument(data[0].id);
                        }else{
                            const updatedList = data[0].application.filter((app) => !valuesList.includes(app));
                            var msg2 =''
                            valuesList.forEach((c) => {msg2+=c+" "});
                            handleDeleteApp(data[0].id,updatedList,msg2)
                        }
                        setFormData(initialValues);
                    }else{
                      var msg =''
                      ch.forEach((c) => {msg+=c+" "});
                      setMessage("Il n y a pas de correspondance entre cet "+formData.selectedType+" et "+msg)
                      setMessageColor("red")
                      setTimeout(() => {
                        setMessage("");
                      }, 4000);
                    }
                } else{
                  setMessage("Il n y a pas d'"+formData.selectedType+" avec ces paramètres ")
                  setMessageColor("red")
                  setTimeout(() => {
                    setMessage("");
                  }, 4000);
                }

            })
            .catch((error) => {
                console.error("Error searching "+formData.selectedType+":", error);
            });
          }
        };
  return (
    <div className='alertFormSupp'>
        <div className="entetes">
            <FontAwesomeIcon icon={faPlay} />
            <h1>SUPPRESSION INSTRUCTION / ALERTE</h1>
        </div>
        <div className="configBoxs">
            <div className="configLines">
                 <h3>Description (FR) *</h3>
                 <input
                    type="text"
                    value={formData.descriptionFr}
                    onChange={handleDescriptionFrChange}
                    placeholder="Saisir description en francais"
                    style={{border: showError && !formData.descriptionFr ? "1px solid red":"none"}}
                    />
            </div>
            <div className="configLines">
                <h3>Type *</h3>
                <select value={formData.selectedType} onChange={handleTypeChange}>
                    <option value="Instruction">Instruction</option>
                    <option value="Alerte">Alerte</option>
                </select>
            </div>  
            <div className="configLines">
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
            <div className="configLines">
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
        <div className="buttonss">
        <div className="message" style={{color:messageColor}}>{message}</div>
           <div>
              <button onClick={handleAnnuler}>Annuler</button>
              <button onClick={searchDocuments}>supprimer</button>
            </div>
        </div>
    </div>
  )
}

export default AlertFormSupp
