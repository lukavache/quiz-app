import React from 'react';

const Questy = ({ 
    showAnswers,
    handleAnswer, 
    handleNextQuestion,
    data: {question, correct_answer, answers}, 
}) => {

    return (
        <div className='flex flex-col'>
            <div className='bg-white text-red-500 font-semibold p-5 rounded shadow-md'>
                <h2 
                    className='text-2xl'
                    dangerouslySetInnerHTML={{ __html: 
                    question }}
                />
            </div>
            <div className='grid grid-cols-2 gap-6 mt-6'>
                { answers.map((answer, idx) => {
                    const textColor = showAnswers 
                        ? answer === correct_answer 
                            ? 'text-green-500'
                            : 'text-red-800'
                        : 'text-red-500';  
                    return (
                        <button 
                            key={ idx }
                            className={`bg-white ${textColor} p-4 text-red-500 font-semibold rounded shadow`}
                            onClick={() => handleAnswer
                            (answer)} 
                            dangerouslySetInnerHTML={{ __html: 
                            answer }}>
                        </button>
                    );    
                })}
            </div>
            {showAnswers && (
                <button
                    onClick={handleNextQuestion}
                    className={`ml-auto bg-red-600 text-white p-4 font-semibold rounded shadow mt-6`}>
                    Next Question
                </button>
            )}
        </div>
    );
};


export default Questy;