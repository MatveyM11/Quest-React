import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ChatContainer from './components/ChatContainer';
import EmailInput from './components/EmailInput';
import Logo from './components/Logo'; // Import the Logo component
import quizConfig from './quiz_config.json'; // Import the quiz config

// Styled container for the entire app
const AppContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
height: 100vh;
background-color: #e9ecef;
width: 100%;
position: relative; /* Ensure the logo can be positioned correctly */
`;

// Styled wrapper for the content
const ContentWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
flex: 1;
margin-top: 120px; /* Space for the logo */
width: 100%;
overflow-y: auto; /* Ensure the content wrapper can scroll */
`;

// Function to determine the ending based on user's answers
const determineEnding = (answers, endings) => {
    for (const ending of endings) {
        if (ending.conditions.every(cond => answers.includes(cond))) {
            return ending.message;
        }
    }
    return endings.find(ending => ending.conditions.length === 0).message;
};

const App = () => {
    // State declarations
    const [questions, setQuestions] = useState([]);
    const [showCorrectOrIncorrect, setShowCorrectOrIncorrect] = useState(false);
    const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
    const [messages, setMessages] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [endOptions, setEndOptions] = useState([]);
    const [showTryAgain, setShowTryAgain] = useState(false); // State for the "Try again?" bubble
    const [answerSequence, setAnswerSequence] = useState([]);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [userEmail, setUserEmail] = useState('');
    const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);

    // Load quiz questions and settings from JSON file on component mount
    useEffect(() => {
        setQuestions(quizConfig.questions);
        setShowCorrectOrIncorrect(quizConfig.showCorrectOrIncorrect || false);
        setShowCorrectAnswers(quizConfig.showCorrectAnswers || false);
    }, []);

    // Handle email submission
    const handleEmailSubmit = (email) => {
        setUserEmail(email);
        setIsEmailSubmitted(true);
        // Display the first question
        setMessages([{ text: quizConfig.questions[0].question, isUser: false }]);
    };

    // Handle option click
    const handleOptionClick = (option) => {
        // Prevent option clicks if the quiz is finished or the question is already answered
        if (isQuizFinished || answeredQuestions.includes(currentQuestionIndex)) return;

        const newMessages = [
            ...messages,
            { text: option, isUser: true } // Add user's selected option to the messages
        ];

        const isCorrect = option === questions[currentQuestionIndex].answer;

        if (isCorrect) {
            setScore(score + 1); // Increment score if the answer is correct
            if (showCorrectOrIncorrect) {
                newMessages.push({ text: 'Correct!', isUser: false }); // Print correct answer
            }
        } else {
            if (showCorrectOrIncorrect) {
                newMessages.push({ text: 'Incorrect.', isUser: false }); // Print incorrect answer without revealing the correct one
            }
            if (showCorrectAnswers) {
                newMessages.push({ text: `The correct answer is ${questions[currentQuestionIndex].answer}.`, isUser: false }); // Optionally print correct answer
            }
        }

        // Store the answer in the sequence and mark the question as answered
        setAnswerSequence([...answerSequence, { question: questions[currentQuestionIndex].question, selectedOption: option, isCorrect }]);
        setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);

        setMessages(newMessages);
        handleNextQuestion(newMessages, currentQuestionIndex + 1, isCorrect, option); // Proceed to the next question
    };

    // Handle the transition to the next question
    const handleNextQuestion = (newMessages, nextQuestionIndex, isCorrect, option) => {
        setTimeout(() => {
            if (nextQuestionIndex < questions.length) {
                setTimeout(() => {
                    setMessages([
                        ...newMessages,
                        { text: questions[nextQuestionIndex].question, isUser: false } // Print next question
                    ]);
                    setCurrentQuestionIndex(nextQuestionIndex);
                }, 500); // Delay before printing the next question
            } else {
                const finalAnswerSequence = [...answerSequence, { question: questions[currentQuestionIndex].question, selectedOption: option, isCorrect }];
                const endingMessage = determineEnding(finalAnswerSequence.map(a => a.selectedOption), quizConfig.endings);

                setMessages([
                    ...newMessages,
                    { text: endingMessage, isUser: false },
                    { text: `Игра закончена! Ваш результат ${score + (isCorrect ? 1 : 0)}/${questions.length}.`, isUser: false }
                ]);
                setIsQuizFinished(true); // Set quiz as finished
                setEndOptions(['Да', 'Нет']); // Show end options

                // Save the answer sequence to local storage
                localStorage.setItem('answerSequence', JSON.stringify(finalAnswerSequence));

                // Send the answer sequence and ending to the server
                const dataToSend = {
                    email: userEmail,
                   answers: finalAnswerSequence,
                   ending: endingMessage
                };

                console.log('Sending data:', dataToSend); // Add logging

                fetch('http://192.168.3.3:5000/save-answers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToSend)
                })
                .then(response => response.text())
                .then(data => {
                    console.log('Success:', data);
                    setTimeout(() => {
                        setMessages((prevMessages) => [
                            ...prevMessages,
                            { text: 'Хотите повторить?', isUser: false }
                        ]);
                        setShowTryAgain(true); // Delay showing "Try again?" bubble by 500ms
                    }, 500);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            }
        }, 500); // Delay after showing the answer before moving to the next question
    };

    // Handle end option click (Да or Нет)
    const handleEndOptionClick = (option) => {
        if (option === 'Да') {
            // Reset the quiz
            setMessages([{ text: questions[0].question, isUser: false }]);
            setCurrentQuestionIndex(0);
            setScore(0);
            setIsQuizFinished(false);
            setShowTryAgain(false);
            setEndOptions([]);
            setAnswerSequence([]);
            setAnsweredQuestions([]);
            localStorage.removeItem('answerSequence'); // Clear stored answers
        } else {
            // Reset to the email entering page
            setIsEmailSubmitted(false);
            setUserEmail('');
            setMessages([]);
            setCurrentQuestionIndex(0);
            setScore(0);
            setIsQuizFinished(false);
            setShowTryAgain(false);
            setEndOptions([]);
            setAnswerSequence([]);
            setAnsweredQuestions([]);
            localStorage.removeItem('answerSequence'); // Clear stored answers
        }
    };

    // Determine the current options to display
    const currentOptions = isQuizFinished ? endOptions : (questions[currentQuestionIndex] ? questions[currentQuestionIndex].options : []);

    return (
        <AppContainer>
        <Logo /> {/* Add the Logo component */}
        <ContentWrapper>
        {!isEmailSubmitted ? (
            <EmailInput onEmailSubmit={handleEmailSubmit} />
        ) : (
            <ChatContainer
            messages={messages}
            options={currentOptions}
            onOptionClick={isQuizFinished ? handleEndOptionClick : handleOptionClick}
            isQuizFinished={isQuizFinished} // Pass the quiz finished state
            />
        )}
        </ContentWrapper>
        </AppContainer>
    );
};

export default App;
