import React from 'react';
import {useGlobalContext} from '../context';
import logo from '../images/jake&doug.jpg';

const StartQuiz=()=>{
    const {quiz,handleChange,handleSubmit,error}=useGlobalContext();
    return (
        <section className="quiz quiz-small" style={{'textAlign':"center"}}>
            <h2>Welcome!</h2>
            <img src={logo} alt="Logo" className="center"/>
            <button type="submit" onClick={handleSubmit} className="btn btn-primary-btn" style={{'backgroundColor': "#ffffff"}}>Start</button>
        </section>  
    )
}
export default StartQuiz;