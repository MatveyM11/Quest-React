import React, { useState } from 'react';
import styled from 'styled-components';

// Styled container for the email input form
const EmailInputContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 100%;
max-width: 400px;
margin: 0 auto;
`;

// Styled input field for the email
const EmailInputField = styled.input`
width: 100%;
padding: 10px;
margin-bottom: 10px;
border: 1px solid #ccc;
border-radius: 5px;
font-size: 16px;
`;

// Styled submit button for the email form
const EmailSubmitButton = styled.button`
width: 100%;
padding: 10px;
border: none;
border-radius: 5px;
background-color: #007bff;
color: white;
font-size: 16px;
cursor: pointer;

&:hover {
    background-color: #0056b3;
}
`;

// Error message styling
const ErrorMessage = styled.div`
color: red;
margin-bottom: 10px;
`;

// Styled heading for the text above the form
const Heading = styled.h2`
margin-bottom: 20px;
text-align: center;
font-size: 18px;
`;

// EmailInput component to handle email submission
const EmailInput = ({ onEmailSubmit }) => {
    const [email, setEmail] = useState(''); // State to manage the email input
    const [error, setError] = useState(''); // State to manage the error message

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        if (form.checkValidity()) {
            onEmailSubmit(email); // Call the onEmailSubmit function when the form is submitted
            setError(''); // Clear any previous error message
        } else {
            setError('Пожалуйста введите правильный email адрес.'); // Set error message for invalid email
        }
    };

    return (
        <EmailInputContainer>
        <Heading>Нужно ли вам самое дорогое железо?</Heading> {/* Heading text */}
        <form onSubmit={handleSubmit} noValidate> {/* noValidate to prevent default validation */}
        {error && <ErrorMessage>{error}</ErrorMessage>} {/* Display error message if exists */}
        <EmailInputField
        type="email" // Input type as email
        placeholder="Введите вашу почту" // Placeholder text
        value={email} // Bind state to input value
        onChange={(e) => setEmail(e.target.value)} // Update state on input change
        required // Make input required
        />
        <EmailSubmitButton type="submit">Отправить</EmailSubmitButton> {/* Submit button */}
        </form>
        </EmailInputContainer>
    );
};

// Export the EmailInput component for use in other parts of the app
export default EmailInput;
