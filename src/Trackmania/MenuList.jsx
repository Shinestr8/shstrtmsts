function Menu(props){
    const name = props.name;

    function handleClick(){
        props.handleClick(name);
    }

    return(
        <div onClick={handleClick}>
            {name}
        </div>
    )
}

export function MenuList(props){
    const menus = props.menus;

    function handleClick(menu){
        props.handleClick(menu);
    }

    return(
        <div style={{display:'flex', justifyContent:'space-around'}}>
            {menus.map(function(menu, index){
                return(
                    <Menu key={menu} name={menu} handleClick={handleClick}/>
                )
            })}
        </div>
    )
}