import '../../Trackmania/trackmania.css'

export function ThemeSwitch(props){
    return(
        <div>
            <label className="switch">
                <input type="checkbox" onChange={props.handleChange}/>
                <div className="slider round"></div>
            </label>
            {/* <span style={{color:'red'}}>Switch theme</span> */}
        </div>
        
    )
}