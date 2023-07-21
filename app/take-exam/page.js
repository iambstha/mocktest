"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  const apiEndpointURL = 'http://localhost/mocktest/backend/mocktest/questions.php';

  const fetchDataFromServer = async () => {
    try {
      const response = await axios.post(apiEndpointURL);
      setData(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching data from server:', error);
      setError('An error occurred while fetching data.');
    }
  };

  useEffect(() => {
    fetchDataFromServer();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Collect the user's selected answers
    const formData = new FormData(event.target);
    const answers = [];
    formData.forEach((value, key) => {
      if (key.startsWith('option_for_')) {
        const questionId = key.replace('option_for_', '');
        answers.push({ question_id: parseInt(questionId), selected_option: value });
      }
    });
    console.log(answers)
  };

  return (
    <div className='w-full flex flex-col justify-center items-center p-4'>
      <h1 className='font-semibold p-2'>All Questions</h1>
      {error && <p>Error: {error}</p>}
      <form action="" method="post" className='w-3/4' onSubmit={handleSubmit}>
        {data && data.map((question) => (
          <div key={question.id} className='border p-4'>
            <p className='text-lg text-slate-950'>{question.question_text}</p>
            <div className='p-2'>
              <input type="radio" name={`option_for_${question.id}`} id={`option_for_${question.id}_1`} className='mr-4' value={question.option1} />
              <label htmlFor={`option_for_${question.id}_1`} className='text-lg text-slate-600'>{question.option1}</label>
            </div>
            <div className='p-2'>
              <input type="radio" name={`option_for_${question.id}`} id={`option_for_${question.id}_2`} className='mr-4' value={question.option2} />
              <label htmlFor={`option_for_${question.id}_2`} className='text-lg text-slate-600'>{question.option2}</label>
            </div>
            <div className='p-2'>
              <input type="radio" name={`option_for_${question.id}`} id={`option_for_${question.id}_3`} className='mr-4' value={question.option3} />
              <label htmlFor={`option_for_${question.id}_3`} className='text-lg text-slate-600'>{question.option3}</label>
            </div>
            <div className='p-2'>
              <input type="radio" name={`option_for_${question.id}`} id={`option_for_${question.id}_4`} className='mr-4' value={question.option4} />
              <label htmlFor={`option_for_${question.id}_4`} className='text-lg text-slate-600'>{question.option4}</label>
            </div>
          </div>
        ))}
        <button type="submit" className='py-2 px-4 mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded'>
          Submit Answers
        </button>
      </form>
    </div>
  );
}

export default App;
