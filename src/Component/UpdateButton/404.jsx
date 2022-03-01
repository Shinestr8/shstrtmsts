import { useEffect, useState } from "react";

export function Error404(){

    const [count, setCount] = useState(0);
    const [color, setColor] = useState(null);
    const [bgColor, setbgColor] = useState(null);

    //array of possible colors for color and bgColor
    const colorArray = ['#00FFFF', '#FF0000', '#00FF00', '#0000FF', '#7FFF00', '#FF8C00', '#FF1493', '#FF00FF' ,'#800080', '#FFFF00'];


    //function that returns a random number between 2 limits
    function between(min, max) {  
        return Math.floor(
          Math.random() * (max - min) + min
        )
      }


    function changeFontColor(){
        if(count % 3 === 0 || count % 7 === 0){
            let newIndex = between(0, colorArray.length - 1);
            let newColor = colorArray[newIndex];
            while(newColor === color){
                newIndex = between(0, colorArray.length - 1);
                newColor = colorArray[newIndex];
            }
            setColor(colorArray[newIndex]);
        }
    }

    function changeBgColor(){
        if(count % 3 === 0 || count % 7 === 0){
            let newIndex = between(0, colorArray.length - 1);
            let newColor = colorArray[newIndex];
            while(newColor === bgColor && newColor !== color){
                newIndex = between(0, colorArray.length - 1);
                newColor = colorArray[newIndex];
            }
            setbgColor(colorArray[newIndex]);
        }
    }

    //useEffect to setCount
    useEffect(() => {
      setInterval(() => {
        setCount(prevCount => prevCount + 1);
      }, 1000);
    }, []);

    //useEffect to change color
    useEffect(()=> {
        console.log(count);
        changeFontColor();
        changeBgColor();
        
    },[count])
    

    return(
    <div className="error-parent">
        <div className="box coloranim" style={{color: color}}><div style={{backgroundColor: bgColor}}>404</div></div>
    </div>
        
    )
}