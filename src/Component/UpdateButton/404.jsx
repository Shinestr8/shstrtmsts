import { useEffect, useState } from "react";
import useWindowDimensions from "../../WindowDimensions";


export function Error404(props){

    const [count, setCount] = useState(0);
    const [color, setColor] = useState(null);
    const [index, setIndex] = useState(0)

    var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];


    // let colorTable = ['#ff0000', '#00ff00', '#0000ff', '#f0f0f0']

    function between(min, max) {  
        return Math.floor(
          Math.random() * (max - min) + min
        )
      }

    useEffect(() => {
      setInterval(() => {
        setCount(prevCount => prevCount + 1);
      }, 1000);
    }, []);

    useEffect(()=> {
        console.log(count);
        if(count % 3 === 0){
            let newIndex = between(0, colorArray.length - 1)
            console.log("pocx")
            setColor(colorArray[newIndex]);
        }
        if(count % 7 === 0){
            let newIndex = between(0, colorArray.length - 1)
            console.log("pocx")
            setColor(colorArray[newIndex]);
        }
        
    },[count])

    

    const {width, height} = useWindowDimensions();


    // let color = '#000000';
    

    return(
    <div className="error-parent">
        <div className="box coloranim" style={{color: color}}><div>{404}</div></div>
    </div>
        
    )
}