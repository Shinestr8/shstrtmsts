import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';


export function UpdateButton(props){

    let [spin, setSpin] = useState(false);

    return(
        <div className='reload-button'>
            <FontAwesomeIcon 
            icon = {faRotate} 
            size = "1x" 
            // className='loading'
            // style={{marginLeft: '1em', cursor: 'pointer'}}
            spin={spin}
            onMouseEnter={() => setSpin(true)} 
            onMouseLeave= {() => setSpin(false)}
            onClick={props.onClick}
        />
        </div>
        
    )
}