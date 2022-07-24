
function Die(props) {
    return(
        <div 
        className="die"
        style={props.isHeld ? {backgroundColor: "#59E391"} : {backgroundColor: "#EEEEEE"}}
        onClick={props.clickHandle}
        >
            {props.value}
        </div>
    )
}

export default Die