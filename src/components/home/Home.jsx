import './Home.css'
import React, { useEffect,useState } from 'react';
import { Navbar ,Body} from '../index'
import {DocFormAjout } from '../index';
function Home(props) {

  const handleAdd = () => {
    const newObject = {
      urlApp: urlApp,
      urlDoc: urlDoc,
      id: Math.random().toString(36).substring(7), // Generate a random id
    };

    fetch('https://urlsjsonserver.onrender.com/mappings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newObject),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('New object added:', data);
        // You can update your UI or perform other actions here
      })
      .catch((error) => {
        console.error('Error adding new object:', error);
      });
  };

  const handleDelete = () => {
    fetch('https://urlsjsonserver.onrender.com/mappings')
      .then((response) => response.json())
      .then((data) => {
        // Find the object with the matching urlApp
        const objectToDelete = data.find((obj) => obj.urlApp === urlApp);
  
        if (!objectToDelete) {
          console.log('Object not found with the provided urlApp:', urlApp);
          return;
        }
  
        // Perform the delete operation using the object's id
        fetch(`https://urlsjsonserver.onrender.com/mappings/${objectToDelete.id}`, {
          method: 'DELETE',
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Object deleted:', data);
            // You can update your UI or perform other actions here
          })
          .catch((error) => {
            console.error('Error deleting object:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching objects:', error);
      });
  };

  const handleModify = () => {
    fetch('https://urlsjsonserver.onrender.com/mappings')
      .then((response) => response.json())
      .then((data) => {
        // Find the object with the matching urlApp
        const objectToModify = data.find((obj) => obj.urlApp === urlApp);
  
        if (!objectToModify) {
          console.log('Object not found with the provided urlApp:', urlApp);
          return;
        }
  
        // Modify the object's urlDoc property
        objectToModify.urlDoc = urlDoc;
  
        // Perform the update operation using the object's id
        fetch(`https://urlsjsonserver.onrender.com/mappings/${objectToModify.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(objectToModify),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Object modified:', data);
            // You can update your UI or perform other actions here
          })
          .catch((error) => {
            console.error('Error modifying object:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching objects:', error);
      });
  };

  const [operation , setOperation] = useState("AJOUT D'UN MAPPING")
  const [buttonType,setButtonType] = useState(1);
  const [buttonName,setButtonName] = useState("Ajouter")
  const [urlDoc, setUrlDoc] = useState('');
  const [urlApp, setUrlApp] = useState('');

  const handleSubmit = () => {
    // Call the appropriate handler based on the value of buttonType
    if (buttonType === 1) {
      handleAdd();
    } else if (buttonType === 2) {
      handleModify();
    } else if (buttonType === 3) {
      handleDelete();
    }
  };
  const handleAnnuler = () => {
    setUrlApp('');
    setUrlDoc('');
  };
  const clickAdd = () => {
    setOperation("AJOUT D'UN MAPPING");
    setButtonType(1);
    setButtonName('Ajouter')
  };
  const clickModify = () => {
    setOperation("MODIFICATION D'UN MAPPING");
    setButtonType(2);
    setButtonName('Modifier')
  };
  const clickDelete = () => {
    setOperation("SUPPRESSION D'UN MAPPING");
    setButtonType(3);
    setButtonName('Supprimer')
  };
  const handleDeconnect = () =>{
    props.setConnectValide(false);
    localStorage.removeItem('connectValide');
    localStorage.removeItem('username');
  }
  const [componentCharged , setComponentCharged] = useState(<DocFormAjout />);
  const [pathName, setPathName] = useState('');

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      screenWidth > 700 && setnormalPanelExp(false);
    };

    // Attach the handleResize function to the 'resize' event
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [showNavbar , setShowNavbar] = useState(false);
  const handleShowNavbar = () => {
    setShowNavbar((prev) => { return !prev })
  };

  return (
    <>
      <div className="container">          
          {(screenWidth > 850 || showNavbar) && <Navbar 
          handleDeconnect={handleDeconnect} 
          username={props.username} 
          handleChargeComponent={setComponentCharged}
          setPathname={setPathName}
          showNavbar={handleShowNavbar}/>}
          {(!showNavbar || screenWidth > 450) 
          && <Body componentCharged={componentCharged}
           pathName={pathName}
            showNavbar={handleShowNavbar}
            screenWidth={screenWidth}/>}
      </div>
    </>
  )
}

export default Home