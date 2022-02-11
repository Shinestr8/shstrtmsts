function Menu(props){
    const name = props.name;
    const selected = props.selected;
    function handleClick(){
        props.handleClick(name);
    }

    const style={
        backgroundColor: '#007bff',
        color: '#ffffff'
    }

    return(
        <div className="menu" onClick={handleClick} style={name === selected ? style : {}}>
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
        <div className="menuList">
            {menus.map(function(menu, index){
                return(
                    <Menu selected={props.selected} key={menu} name={menu} handleClick={handleClick}/>
                )
            })}
        </div>
    )
}