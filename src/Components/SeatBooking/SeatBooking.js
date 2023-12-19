import React, { useState, useEffect } from 'react';
import "./SeatBooking.css"

const SeatBooking = () => {
    const [selectedSeat, setSelectedSeat] = useState([]);
    const [moviePrice, setMoviePrice] = useState(0)
    const movies = [{name: "Conjuring", price: 200}, {name: "The Red Door", price: 150}];
    const [selectedMovie, setSelectedMovie] = useState(movies[0].name);
    const [bookedSeats, setBookedSeats] = useState([]);
    const [seatsInfo, setSeatsInfo] = useState([{name: "N/A", color: "#ffffff"}, {name: "Selected", color: "green"}, {name: "Occupied", color: "#353434"}])

    useEffect(() => {
        let index = movies.findIndex((movie) => movie.name === selectedMovie)
        setMoviePrice(movies[index].price)
    },[selectedMovie])

    const handleSeatSelection = (seat) => {
        if(!selectedSeat.includes(seat)) {
            setSelectedSeat([...selectedSeat,seat]);
        }
        else {
            let index = selectedSeat.findIndex((seatinfo) => seatinfo === seat)
            let tempSelectedSeat = [...selectedSeat]
            tempSelectedSeat.splice(index, 1)
            setSelectedSeat(tempSelectedSeat)
        }
    };

    const handleSeatBooking = () => {
        let tempBookedSeats = bookedSeats
        tempBookedSeats[selectedMovie] = [...( bookedSeats[selectedMovie] ? bookedSeats[selectedMovie] : []), ...selectedSeat]
        setBookedSeats(tempBookedSeats);
        setSelectedSeat([])
    };

    const seatRows = [{'A': ["1" , "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"]}, 
    {'B': ["1" , "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"]},
    {'C': ["1" , "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"]},
    {'D': ["1" , "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"]},
    {'E': ["1" , "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"]},
    {'F': ["1" , "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"]},
    {'G': ["1" , "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"]},
    {'H': ["1" , "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"]}];

    const onMovieChange = (val) => {
        setSelectedMovie(val)
    }

    return (
        <div>
            <div className = "movie-selection-main-div">
                <div className = "movie-selection-text">SELECT A MOVIE</div>
                <select className = "movie-dropDown" onChange = {(e) => onMovieChange(e.target.value)}>
                    {movies.map((movie) => (
                        <option>
                            {movie.name}
                        </option>
                    ))} 
                </select>
            </div>
            <div className = "seats-info-main-div">
                {seatsInfo.map((seatinfo) => (
                    <div className = "seats-info-individual-div">
                        <div style = {{background: seatinfo.color, height: "15px", width: "15px", marginRight: "8px"}}></div>
                        <div>{seatinfo.name}</div>
                    </div>
                ))}
            </div> 
            <div className = "seats-selection-main-div">
            <div class="curved-line">Your screen is here</div>
                {seatRows.map(row => (
                    <div key={Object.keys(row)[0]}>
                        {Object.values(row)[0].map((rowss) => {
                            const seat = `${Object.keys(row)[0]}${rowss}`
                            return (
                                <button className = "seats-button" style = {{background: `${selectedSeat.includes(seat) ? "green" :  bookedSeats[selectedMovie] && bookedSeats[selectedMovie].includes(seat) ? "#353434" : "white"}`}} key={seat} onClick={() => !bookedSeats.includes(seat) && handleSeatSelection(seat)}/>
                            );
                        })}
                    </div>
                ))}
            </div>
        <div className = "seat-booking-footer">
            <p className = "seat-booking-footer-content">{selectedSeat ? `You have selected ${selectedSeat.length} seats for Rs.${selectedSeat.length * moviePrice}` : 'No seat selected.'}</p>
            <button className = "seat-booking-btn" onClick={handleSeatBooking}>BOOK NOW</button>
        </div>
        </div>
    );
};

export default SeatBooking;
