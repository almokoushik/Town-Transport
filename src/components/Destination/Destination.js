import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react';
import { Col, Form, ListGroup } from 'react-bootstrap';
import Header from '../Header/Header';
import Map from "../images/Map.png"
import SimpleMap from '../GoogleMap/GoogleMap';
import { useParams } from 'react-router';
import fakeData from "../Home/Home"
import FakeData from "../FakeData.json"
import { Card } from '@material-ui/core';
import { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import PeopleIcon from '@material-ui/icons/People';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const Destination = (props) => {
    const { id } = useParams()
    const [exactMedium, setExactMedium] = useState({})
    const [medium, setMedium] = useState([])
    useEffect(() => {
        setMedium(FakeData)
    }, [])

    const [places, setPlaces] = useState({
        start: "",
        end: "",
        selected: false
    })
    const destination = (event) => {
        if (event.target.name === "to") {
            const newPlace = { ...places }
            newPlace.start = event.target.value
            setPlaces(newPlace)

        }
        if (event.target.name === "from") {
            const newPlace = { ...places }
            newPlace.end = event.target.value
            setPlaces(newPlace)

        }

    }
    const submitDest = (e) => {
        if (places.start && places.end) {

            const setSelect = { ...places }
            setSelect.select = true
            setPlaces(setSelect)
            const data = medium.find(v => v.id === parseInt(id))
            console.log(data)
            setExactMedium(data)
        }
        e.preventDefault()
    }

    return (
        <div>
            <Header></Header>
            {/* <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-lg-4 ">1</div>


                    <div className="col-xs-12 col-sm-12  col-lg-8 ">2</div>

                </div>

            </div> */}
            <div className="container">
                <div className="row" >
                    <div xs={12} className="col-xs-12 col-sm-12 col-md-4 col-lg-4" style={{ textAlign: "center", border: "1px solid navy",  borderRadius: "10px", backgroundColor: "lightgray", marginBottom: "20px", marginTop: "20px" }}>
                        {
                            !places.select ? <Form >

                                <Col xs={10} className="mx-auto">
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Destination</Form.Label>
                                        <Form.Control required onBlur={destination} name="to" type="text" placeholder="Your Destination" />
                                    </Form.Group>
                                </Col>

                                <Col xs={10} className="mx-auto">
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>From</Form.Label>
                                        <Form.Control required onBlur={destination} name="from" type="text" placeholder="Your Place" />
                                    </Form.Group>

                                </Col >


                                <Col xs={10} className="mx-auto">
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Control onClick={submitDest} type="submit" value="Search" />
                                    </Form.Group>
                                </Col >

                            </Form> :
                                <Col xs={10} className="mx-auto">
                                    <Card className="mx-auto" style={{ width: '18rem' }}>
                                        <ListGroup variant="flush" >
                                            <ListGroup.Item>From: {places.start}</ListGroup.Item>
                                            <ListGroup.Item>To:   {places.end}</ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </Col>
                        }
                        {
                            exactMedium.id &&
                            <Col xs={10} className="mx-auto">
                                <Card className="mx-auto" style={{ width: '18rem' }}>
                                    <ListGroup variant="flush" >
                                    <ListGroup.Item > <span><img className="mx-2" style={{ height: "50px" }} src={exactMedium.img} alt="" /></span> <span className="mx-2" > <PeopleIcon></PeopleIcon> {exactMedium.availablity}</span>  < span className="mx-2" ><AttachMoneyIcon></AttachMoneyIcon>{exactMedium.price}</span> </ListGroup.Item>
                                    <ListGroup.Item > <span><img className="mx-2" style={{ height: "50px" }} src={exactMedium.img} alt="" /></span> <span className="mx-2" > <PeopleIcon></PeopleIcon> {exactMedium.availablity}</span>  < span className="mx-2" ><AttachMoneyIcon></AttachMoneyIcon>{exactMedium.price}</span> </ListGroup.Item>
                                    <ListGroup.Item > <span><img className="mx-2" style={{ height: "50px" }} src={exactMedium.img} alt="" /></span> <span className="mx-2" > <PeopleIcon></PeopleIcon> {exactMedium.availablity}</span>  < span className="mx-2" ><AttachMoneyIcon></AttachMoneyIcon>{exactMedium.price}</span> </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        }
                    </div>

                     <div className=" col-sm-12 col-xs-12 col-md-8 col-lg-8">
                            <SimpleMap></SimpleMap>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Destination;