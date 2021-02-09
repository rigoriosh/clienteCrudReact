import React, { useEffect, useState } from 'react'

import Axios from 'axios';

export const Crud = () => {
    const urlServer = 'http://localhost:3001/api/';
    const [movieName, setMovieName] = useState('');
    const [review, setReview] = useState('');
    const [moviewReviewList, setMoviewReviewList] = useState([]);
    const [newReview, setNewReview] = useState('');


    useEffect(() => {//se ejecuta automaticamente al cargar el componente
        traerDtaDB();
        return () => {

        }
    }, []);

    /* method to get all register from DB */
    const traerDtaDB = () => {
        console.log('traerDtaDB')
        setTimeout(() => {
            Axios.get(`${urlServer}get`)
                .then(response => {
                   
                    if(response.data === "") {
                        setMoviewReviewList([]);
                        alert('there is not data')
                    }else{
                        setMoviewReviewList(response.data);
                    }                                        
                })
        }, 500);    //un tiempo por lo de async
    }

    /* method to create a new review */
    const submitReview = () => {
        if (movieName || review) {
            console.log('submitReview');
            Axios.post(`${urlServer}insert/`, { movie_name: movieName, movie_review: review });
            traerDtaDB();
        } else {
            console.log('without data')
        }
    }

    /* method for delete a review */
    const deleteReview = (movie) => {
        console.log('deleteReview', `${urlServer}delete/${movieName}`)
        Axios.delete(`${urlServer}delete/${movie}`);
        traerDtaDB();
    }

    /* mrthod to update a review */
    const updateReview = (movie) => {
        console.log('updateReview')
        Axios.put(`${urlServer}update`, {
            movie_name: movie, movie_review: newReview
        });
        setNewReview('');
        traerDtaDB();
    }

    return (
        <div className="App">
            <h1>PRORGRAMA DE CREDITOS</h1>
            <div className="form">
                <label>Movie Name: </label>
                <input type="text" name="movieName" onChange={(e) => { setMovieName(e.target.value) }} />
                <label>Review: </label>
                <input type="text" name="review" onChange={(e) => { setReview(e.target.value) }} />

                <button onClick={submitReview}>Submit</button>
                {
                    moviewReviewList.map((e) => {
                        return (
                            <div className="card" key={e.idmovie_reviews}>
                                <h4 >Movie name: {e.movie_name}</h4>
                                <p>Movie Review: {e.movie_review}</p>
                                <button onClick={() => { deleteReview(e.movie_name) }}>Delete</button>
                                <input type="text" id="updateInput" onChange={(e) => {
                                    setNewReview(e.target.value)
                                }}></input>
                                <button onClick={() => { updateReview(e.movie_name) }}>Update</button>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    );
}
