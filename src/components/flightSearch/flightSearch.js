import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import './flightSearch.css';
import axios from 'axios';
import FlightCard from '../flightCard/flightCard';

function FlightSearch() {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [flightData, setFlightData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [airportOptions, setAirportOptions] = useState([]);
  const [airportDestOptions, setAirportDestOptions] = useState([]);
  const [cabinClass, setCabinClass] = useState(null);
  const [adults, setAdults] = useState(null);
  const [childrens, setChildrens] = useState(null);

  const fetchAirports = async (query) => {
    if (!query) return;

    setLoading(true);
    setError(null);

    const options = {
      method: "GET",
      url: "https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport",
      params: { query, locale: "en-US" },
      headers: {
            'x-rapidapi-key': process.env.KEY_API,
    'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
      },
    };

    try {
      const response = await axios.request(options);
      const airports = response.data.data.map((airport) => ({
        value: airport.skyId,
        label: airport.presentation.title,
        entityId: airport.entityId,
      }));
      setAirportOptions(airports);
    } catch (error) {
      setError("Failed to fetch airports.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAirportsDestination = async (query) => {
    if (!query) return;

    setLoading(true);
    setError(null);

    const options = {
      method: "GET",
      url: "https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport",
      params: { query, locale: "en-US" },
      headers: {
            'x-rapidapi-key': process.env.KEY_API,
            'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
      },
    };

    try {
      const response = await axios.request(options);
      const airports = response.data.data.map((airport) => ({
        value: airport.skyId,
        label: airport.presentation.title,
        entityId: airport.entityId,
      }));
      setAirportDestOptions(airports);
    } catch (error) {
      setError("Failed to fetch airports.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFromInputChange = (inputValue) => {
    fetchAirports(inputValue);
  };

  const handleToInputChange = (inputValue) => {
    fetchAirportsDestination(inputValue);
  };

  const searchFlight = async () => {
    if (!from || !to || !departureDate) {
      setError("Please fill in all required fields.");
      return;
    }

    const options = {
      method: 'GET',
      url: 'https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights',
      params: {
        originSkyId: from.value,
        destinationSkyId: to.value,
        originEntityId: from.entityId,
        destinationEntityId: to.entityId,
        date: departureDate,
        returnDate: returnDate || undefined,
        cabinClass: cabinClass,
        adults: adults,
        childrens: childrens,
        currency: 'USD',
        market: 'en-US',
        countryCode: 'US'
      },
      headers: {
            'x-rapidapi-key': process.env.KEY_API,
            'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setFlightData(response.data);
      console.log(response.data.data.itineraries);
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchFlight();
  };

  return (
    <Container className="flight-search-container">
    <Row className="justify-content-center">
      <Col md={11} className="search-box">
        <Form onSubmit={handleSubmit}>
          <Row className="form-row">
            <Col md={2} className="form-field">
              <label className="form-label">Class</label>
              <Form.Control
                as="select"
                className="google-style-select"
                value={cabinClass || "economy"}
                onChange={(e) => setCabinClass(e.target.value)}
              >
                <option value="economy">Economy</option>
                <option value="premium_economy">Premium Economy</option>
                <option value="business">Business</option>
                <option value="first">First Class</option>
              </Form.Control>
            </Col>
  
            <Col md={3} className="form-field">
              <div className="travelers-group">
                <div className="traveler">
                  <span>Adults</span>
                  <Form.Control
                    type="number"
                    min="1"
                    className="google-style-number-input"
                    value={adults || 1}
                    onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
                  />
                </div>
                <div className="traveler">
                  <span>Children</span>
                  <Form.Control
                    type="number"
                    min="0"
                    className="google-style-number-input"
                    value={childrens || 0}
                    onChange={(e) => setChildrens(parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
            </Col>
          </Row>
  
          <Row>
            <Col md={3} className='input'>
              <Form.Group controlId="formFrom">
                <Select
                  options={airportOptions}
                  value={from}
                  onInputChange={handleFromInputChange}
                  onChange={(selectedOption) => setFrom(selectedOption)}
                  placeholder="Where from?"
                />
              </Form.Group>
            </Col>
            <Col md={3} className='input'>
              <Form.Group controlId="formTo">
                <Select
                  options={airportDestOptions}
                  value={to}
                  onInputChange={handleToInputChange}
                  onChange={(selectedOption) => setTo(selectedOption)}
                  placeholder="Where to?"
                />
              </Form.Group>
            </Col>
            <Col md={3} className='input'>
              <Form.Group controlId="formDeparture">
                <Form.Control
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={3} className='input'>
              <Form.Group controlId="formReturn">
                <Form.Control
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
  
          <Row className="justify-content-center">
            <Col md={4}>
              <Button variant="primary" type="submit" className="explore-button" disabled={loading}>
                {loading ? "Loading..." : "Search Flights"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
    {flightData && flightData.data && flightData.data.itineraries ? (
  flightData.data.itineraries.length > 0 ? (
    <div className="flight-results">
      <h3>Available Flights</h3>
      {flightData.data.itineraries.map((itinerary, index) => (
        <FlightCard key={index} flight={itinerary} />
      ))}
    </div>
  ) : (
    <div className="card shadow-sm" style={{ marginTop: "30px" }}>
      <div className="flight-results">
        <h3>No flights available</h3>
        <p>Please adjust your search criteria and try again.</p>
      </div>
    </div>
  )
) : null}
  </Container>  
  );
}

export default FlightSearch;