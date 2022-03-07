import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const StyledNavLink = styled(NavLink)`
    min-height: 3rem;
    text-decoration: none;
    background-color: #161d31;
    width: 100%;
    text-align: center;
    color: #ffffff;
    justify-content: center;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    border: 1px solid gray;
    border-bottom: none;
    background-color: ${(props) => props.location === props.name ? "#007bff" : ""};
    color: ${(props) => props.location === props.name ? "#ffffff" : ""};

    &:hover{
        background-color: #d3d3d3;
        color: black;
        transition-property: background-color, color;
        transition-duration: 0.4s;
    }
`

const StyledMenuList = styled.div`
    display: flex;
    @media screen and (max-width: 1024px){
        flex-direction: column;
    }
`


function Menu(props){

    const [loc, setLoc] = useState(null);
    const name = props.name;
    const playername = props.playername;
    function handleClick(){
        props.handleClick(name);
    }
    let location = useLocation().pathname;

    useEffect(()=> {
        if(location.includes('/player')){
            let splitted = location.split('/'); //parse url and take last argument to navigate there later
            if(splitted[splitted.length -1] !== loc){
                setLoc(splitted[splitted.length -1]);
            }
        }
    }, [location, loc])
    
    
    
    return(
        <StyledNavLink 
            to={`player/${playername}/${name}`} 
            name = {name}
            location = {loc}
            onClick={handleClick} 
            /* style={({ isActive }) => {
                return {
                  backgroundColor: isActive ? "#007bff" : "",
                  color: isActive ? '#ffffff' : ''
                };
              }} */
        >
            {name}
        </StyledNavLink>
    )
}

export function MenuList(props){
    const menus = props.menus;

    function handleClick(menu){
        props.handleClick(menu);
    }

    return(
        <StyledMenuList>
            {menus.map(function(menu, index){
                return(
                    <Menu selected={props.selected} key={menu} name={menu} handleClick={handleClick} playername={props.playername}/>
                )
            })}
        </StyledMenuList>
    )
}