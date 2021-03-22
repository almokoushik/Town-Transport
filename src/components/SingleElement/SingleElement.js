import { event } from 'jquery';
import React from 'react';
import { useHistory } from 'react-router';
import Destination from '../Destination/Destination';

const SingleElement = (props) => {
    const {name,img,id}=props.item
    const history=useHistory()

    const destinationPlace = () => {
    const url=`/destination/${id}`
    history.push(url)   
    }
    return (
        <div className="g-5 col-lg-3 col-sm-12 col-md-12 " >
            <div onClick={() =>destinationPlace()} style={{ textAlign: "center", backgroundColor: "#BAEA72", borderRadius: "10px" }}>
                <img style={{ height: "100px", margin: "15px" }} src={img} alt="" />
                <h1 style={{ textAlign: "center" }}>{name}</h1>
            </div>
        </div>
    );
};

export default SingleElement;