import React, { useState, useContext } from 'react';
import axios from 'axios';
import swal from 'sweetalert';


const API_ENDPOINT="https://opentdb.com/api.php?amount=10";

const AppContext=React.createContext();



const AppProvider=({children})=>{

const[waiting,setWaiting]=useState(true);
const[loading,setLoading]=useState(false);
const[questions,setQuestions]=useState([]);
const[correct,setCorrect]=useState(0);
const[index,setIndex]=useState(0);
const[error,setError]=useState(false);
const [showScore, setShowScore] = useState(false);

const fetchQuestions= async(url)=>{
            setLoading(true);
            setWaiting(false);

            console.log(url);
            const response= await axios(url).catch((err) => console.log(err));

        if(response) //success
        {
            const data = response.data.results;
            console.log(data);
            if(data.length>0)
            {
                setQuestions(data);
                setLoading(false);
                setWaiting(false);
                setError(false);
            }
            else{
                setWaiting(true);
                setError(true);
            }
        }
        else
        {
            setWaiting(true);
            console.log("error! couldn't retrieve any question");
        }
    }

    const nextQuestion=()=>{

        setIndex((oldIndex)=>{
            const index=oldIndex+1;
            if(index>questions.length-1)    //end of the game
            { 
               setShowScore(true);
               return 0; 
            }
            else                            //not the end of the game
                return index;
        })
    }

    const checkAnswer=(value)=>{
        if(value){
            setCorrect((oldState=>oldState+1))
            swal("Good job!", "You are correct!", "success");
        }
        else
            swal("Opps...", "You are wrong", "error");
        nextQuestion();
    }

    const closeScoreBoard=()=>{
        setWaiting(true);
        setCorrect(0);
        setShowScore(false);

    }


    const handleSubmit=(e)=>{
        e.preventDefault();

        const url=`${API_ENDPOINT}`
        fetchQuestions(url);
    }

    return(
        <AppContext.Provider value={{
            waiting,
            loading, 
            questions,
            index,
            correct,
            error,
            showScore,
            checkAnswer,
            closeScoreBoard,
            handleSubmit,
        }}>

            {children}
        </AppContext.Provider> 
    )

}

export const useGlobalContext=()=>
{
    return useContext(AppContext)
}

export{AppContext,AppProvider}