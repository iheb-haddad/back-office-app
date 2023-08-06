import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight,faBars} from '@fortawesome/free-solid-svg-icons';
import './Body.css';

function Body(props) {
    
  return (
    <div className="body">
          <div className="headBody">{props.screenWidth < 850 && <FontAwesomeIcon icon={faBars} onClick={props.showNavbar} style={{fontSize:"1.8rem",color:"white" ,cursor:"pointer"} }/>}</div>
        <div className="navigation">
            <div className="path">
                <div className="pathName">Admin</div>
                <FontAwesomeIcon icon={faChevronRight} />
                <div className="pathName2">{props.pathName}</div>
            </div>
        </div>        
        {props.componentCharged}
    </div>
  )
}

export default Body