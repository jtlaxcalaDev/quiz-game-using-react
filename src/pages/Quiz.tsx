import {FunctionComponent, useContext} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import QuestionContext from '../contexts/questions/question-context';
import QuestionItem from '../components/question-item';
import '../styles/quiz.css';

const Quiz: FunctionComponent = () => {

  const {
    questions, 
    loading,
    error,
    setLoading,
    validateAnswers,
    setValidateAnswers,
    countCorrectAnswers
  } = useContext(QuestionContext);

  const ItemsView: any/*¿data type?*/ = () => {
    if (error) {
      return <h3>{error}</h3>;
    } else {
      return questions.map(item => (
        <QuestionItem
          key={item.id}
          title={item.question}
          answers={item.answers}
          correctAnswer={item.correctAnswer}
          selectedAnswer={item.selectedAnswer}
        />
      ));
    }
    
  };

  const ErrorFallback: FunctionComponent = () => {
    return (
      <div role='alert'>
        <h2 style={{color: '#E0E1DD', width: '16em'}}>
          There was an error: {`${error}`}
        </h2>
      </div>
    );
  };

  const VerifyAnswers: any = () => {
    return (
      questions.length > 0 && (
        <div className='cta-check-retry'>
          {validateAnswers && (
            <span className='score'>
              You scored {countCorrectAnswers()}/5 correct answers
            </span>
          )}
          {
            !loading &&
            <button
              disabled={!validateCompleteAnswers()}
              onClick={() => handleClick(validateAnswers)}
              className='btn-check-answers'>
              {!validateAnswers ? 'Check answers' : 'Play again'}
            </button>
          }
        </div>
      )
    );
  };

  /* una sola funte de verdad, un solo estado que controle : video 31 scrimba */
  function handleClick(validate: boolean) {
    if(validateAnswers){
      setValidateAnswers(false)
      setLoading(true);
    }else{
      setValidateAnswers(!validate)
    }
  }

  const Loader = () => {
    return (
      <div className="lds-ripple"><div></div><div></div></div>
    )
  }

  function validateCompleteAnswers(): boolean{
    let countAnswers = 0

    questions.map(question => {
      if(question.selectedAnswer){
        countAnswers++
      }
    })

    return countAnswers === 5 ? true : false 
  }

  return (
    <>
      <div className='items-list-container'>
        <div className='title'>{ validateAnswers ? 'Your Results' : 'Books quiz game'}</div>  
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          resetKeys={[error, loading]}>
            { loading ? <Loader /> : <ItemsView /> }
        </ErrorBoundary>       
          
      </div>
      {
        <VerifyAnswers />        
      }
    </>
  );
};

export default Quiz;
