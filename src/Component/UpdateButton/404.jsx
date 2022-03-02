import { useEffect, useState} from "react";

export function Error404(){

    const [color, setColor] = useState('#00FFFF');
    const [bgColor, setbgColor] = useState('#FF0000');
  
    //array of possible colors for color and bgColor
    const colorArray = ['#00FFFF', '#FF0000', '#00FF00', '#0000FF', '#7FFF00', '#FF8C00', '#FF1493', '#FF00FF' ,'#800080', '#FFFF00'];


    //function that returns a random number between 2 limits
    function between(min, max) {  
        return Math.floor(
          Math.random() * (max - min) + min
        )
      }



    function changefontcolor(){
        let index = between(0, colorArray.length -1);
        let index2 = between(0, colorArray.length -1);
        setColor(colorArray[index]);
        setbgColor(colorArray[index2]);
    }

    useEffect(() => {
        const IntervalX = setInterval(changefontcolor, 3000);
        const intervalY  = setInterval(changefontcolor, 7000)
        return function cleanup(){
            clearInterval(IntervalX);
            clearInterval(intervalY);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    return(
    
        <div className="error-404" style={{color: color}}>
            <div style={{backgroundColor: bgColor}}>
                404
            </div>
        </div>
    
        
    )
}