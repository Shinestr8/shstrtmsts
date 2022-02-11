import {faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function LoadingIcon(){
    return(
        <div className="loading">
            <FontAwesomeIcon icon={faSpinner} size="2x"spin/>
        </div>
    )
}