import { NavLink } from "react-router-dom";

function Menu(props){
    const name = props.name;
    const selected = props.selected;
    const playername = props.playername;
    function handleClick(){
        props.handleClick(name);
    }
    
    return(
        <NavLink 
            to={`player/${playername}/${name}`} 
            className="menu" 
            onClick={handleClick} 
            // style={name === selected ? style : {}}
            style={({ isActive }) => {
                return {
                  backgroundColor: isActive ? "#007bff" : "",
                  color: isActive ? '#ffffff' : ''
                };
              }}
        >
            {name}
        </NavLink>
    )
}

export function MenuList(props){
    const menus = props.menus;

    function handleClick(menu){
        props.handleClick(menu);
    }

    return(
        <div className="menuList">
            {menus.map(function(menu, index){
                return(
                    <Menu selected={props.selected} key={menu} name={menu} handleClick={handleClick} playername={props.playername}/>
                )
            })}
        </div>
    )
}