import React, { useEffect, useState } from 'react';
import SingleElement from '../SingleElement/SingleElement';
import bg2 from "../images/bg2.jpg"
import { nodeName } from 'jquery';
import Header from '../Header/Header';
import FakeData from "../FakeData.json"

const Home = () => {
    
    // const fakeData = [
    //     { name: "Bike", img: Frame,key:1,availablity:20 },
    //     { name: "Car", img: Frame2, key: 2, availablity: 10},
    //     { name: "Bus", img: Frame1, key: 3, availablity: 8},
    //     { name: "Train", img: Group, key: 4, availablity: 5}
    // ]; 
    const [vehicle, setVehicle] = useState([])
    useEffect(() => {
        setVehicle(FakeData)
    }, [])

    return (
        
        <div style={{backgroundImage:`url(${bg2})`,backgroundRepeat:"no-repeat",width:"100%",height:"800px"}}>
            <Header></Header>
            <div style={{marginTop:"200px"}} className="row ">
                {
                    vehicle.map(data => <SingleElement key={data.id} item={data}></SingleElement>)
                }
            </div>
            
        </div>
    );
};

export default Home;