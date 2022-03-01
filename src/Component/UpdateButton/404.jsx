import { useEffect, useState } from "react";
import useWindowDimensions from "../../WindowDimensions";


export function Error404(props){

    const [count, setCount] = useState(0);
    const [color, setColor] = useState(null);
    const [bgColor, setbgColor] = useState(null);
    const [index, setIndex] = useState(0)

    var colorArray = ['#00FFFF', '#FF0000', '#00FF00', '#0000FF', '#7FFF00', '#FF8C00', '#FF1493', '#FF00FF' ,'#800080', '#FFFF00'];


    // let colorTable = ['#ff0000', '#00ff00', '#0000ff', '#f0f0f0']

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

    useEffect(() => {
      setInterval(() => {
        setCount(prevCount => prevCount + 1);
      }, 1000);
    }, []);

    useEffect(()=> {
        console.log(count);
        changeFontColor();
        changeBgColor();
        
    },[count])

    

    const {width, height} = useWindowDimensions();


    // let color = '#000000';
    

    return(
    <div className="error-parent">
        <div className="box coloranim" style={{color: color}}><div style={{backgroundColor: bgColor}}>{404}</div></div>
    </div>
        
    )
}