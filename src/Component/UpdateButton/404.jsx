import useWindowDimensions from "../../WindowDimensions";


export function Error404(props){
    const {width, height} = useWindowDimensions();
    console.log(width, height);
    return(
    <div className="error-parent">
        <div class="box"><div>404</div></div>
    </div>
        
    )
}