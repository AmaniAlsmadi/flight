import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./flightCard.css";

function FlightCard({ flight }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDetails = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="card flight-card shadow-sm p-3 mb-3">
    <div className="card-body d-flex flex-column flex-md-row align-items-center justify-content-between">
      <div className="flight-img me-3">
        <img
          src={flight.legs[0].carriers.marketing[0].logoUrl || "../../src/assets/airline.jpg"}
          alt="Airline"
          className="img-fluid"
          style={{width:'50px', height:'50px'}}
        />
      </div>

      <div className="flights-info d-flex align-items-center justify-content-between text-center text-md-start flex-grow-1">
       <div style={{marginLeft:'40px'}}>
        <h5 className="mb-1" >{flight.legs[0].carriers.marketing[0].name}</h5>
        <p className="flight-duration text-muted">
          {Math.floor(flight.legs[0].durationInMinutes / 60)}h {flight.legs[0].durationInMinutes % 60}m
        </p>
        </div>
        <p>
          <strong>{flight.legs[0].origin.city}</strong> → <strong>{flight.legs[0].destination.city}</strong>
        </p>
        <h3 className="flight-price text-success fw-bold" style={{marginRight:'40px'}}>{flight.price.formatted}</h3>
      </div>

      <button className="btn btn-sm" onClick={toggleDetails}>
        {isExpanded ? "▲" : "▼"}
      </button>
    </div>

    {isExpanded && (
      <div className="card-body flight-details border-top mt-3">
        <div className="flight-container">
          <div className="row text-center text-md-start">
            <div className="col-md-4">
              <p className="flight-time text-primary fw-bold">
                {new Date(flight.legs[0].departure).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
              <p className="airport">
                {flight.legs[0].origin.name} ({flight.legs[0].origin.displayCode})
              </p>
            </div>

            <div className="col-md-4 text-muted">
              <p>Travel Time:</p>
              <p className="fw-bold">
                {Math.floor(flight.legs[0].durationInMinutes / 60)}h {flight.legs[0].durationInMinutes % 60}m
              </p>
            </div>

            <div className="col-md-4">
              <p className="flight-time text-primary fw-bold">
                {new Date(flight.legs[0].arrival).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
              <p className="airport">
                {flight.legs[0].destination.name} ({flight.legs[0].destination.displayCode})
              </p>
            </div>
          </div>

          <div className="mt-3">
            {flight.legs.map((leg, legIndex) => (
              <div key={legIndex} className="border rounded p-2 mb-2">
                {leg.segments.map((segment, segmentIndex) => (
                  <div key={segmentIndex} className="mb-1">
                    <p>
                      <strong>{segment.origin.country} - {segment.origin.name}</strong> →
                      <strong> {segment.destination.country} - {segment.destination.name}</strong>
                    </p>
                    <p className="small text-muted">
                      {flight.cabinClass} | {segment.operatingCarrier.name} | Flight: {segment.marketingCarrier.alternateId} {segment.flightNumber}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {flight.legs[0].stopCount > 0 && (
            <div className="alert alert-warning d-flex align-items-center mt-3">
              <span className="me-2">⚠️</span>
              <div>
                <p className="mb-0"><strong>Stops:</strong> {flight.legs[0].stopCount} ({Math.floor(flight.legs[0].durationInMinutes / 60)}h {flight.legs[0].durationInMinutes % 60}m layover)</p>
                <small>Operated by: {flight.legs[0].carriers.marketing[0].name} ({flight.legs[0].carriers.marketing[0].alternateId})</small>
              </div>
            </div>
          )}

          <div className="text-center mt-3">
            <h5 className="text-success fw-bold">Total: {flight.price.formatted}</h5>
            <p className="text-muted small">Includes taxes and fees</p>
          </div>
        </div>
      </div>
    )}
  </div>
  
  
  );
}

export default FlightCard;
