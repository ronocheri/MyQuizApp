import React from 'react';
import Loading from './components/Loading';
import StartQuiz from "./components/StartQuiz"
import {useGlobalContext} from "./context"

function App() {
  const{
     waiting,
     loading,
     questions,
     index,
     correct,
     checkAnswer,
     showScore,
     closeScoreBoard

  }=useGlobalContext();

  if(waiting)
  {
    return <StartQuiz/>
  }
  
  if(loading)
  {
    return <Loading/>
  }

  const{question,incorrect_answers,correct_answer}=questions[index];
  let answers =[...incorrect_answers];
  const tempIndex=Math.floor(Math.random()*4);
if(answers.length===3)
{
  if(tempIndex===3)
    answers.push(correct_answer)
  else
  {
    answers.push(answers[tempIndex]);
    answers[tempIndex]=correct_answer;
  }
}
else
  answers.push(correct_answer)

  return (
    <main>
      <section className="quiz">
      {showScore ? (
				<div className='score-section' style={{'textAlign':"center"}}>
					You scored {correct} out of {questions.length}
          <br /><button className="btn btn-success close-btn" onClick={closeScoreBoard}>Play again</button>
				</div>
        
			) : (
        <>
        <p style={{'color':"black"}}><b>Correct answer:{correct}/{index}</b></p>
        <article className="container">
          <h2 style={{'textAlign':"center",'color':"#ffffff"} } dangerouslySetInnerHTML={{__html:question}}/>
          <h5 style={{'textAlign':"center"}} dangerouslySetInnerHTML={{__html:questions[index].category}}/>

          <div style={{'textAlign':"center"}}>
            {answers.map((answer,index)=>{
              if(answer!="" && answer!=" ")
              {
                return(
                  <>
                  <button key={index} style={{width:"60%"}} onClick={()=>checkAnswer(correct_answer===answer)}
                  dangerouslySetInnerHTML={{__html:answer}}/>
                  </>
                )
              }
            })}

          </div>
          
          
        </article>
        </>
			)}
      </section>
    </main>
    
  );
}

export default App;
