import React from "react";


const Filter = (props) => {
    return(
        <div className="col col-sm-4">
            <input className= "form-control" 
            placeholder="Type to Search..." 
            value={props.value} onChange={(event) => props.setSearchValue(event.target.value)}>
            </input>
        </div>
    );
};

export default Filter;