import React, { useState } from 'react';
import styled from 'styled-components';

// Styled component for the input container
const InputContainer = styled.div`
display: flex; /* Use flexbox for layout */
margin-top: 20px; /* Space above the input box */
`;

// Styled component for the input field
const Input = styled.input`
flex: 1; /* Take up remaining space */
padding: 10px; /* Padding inside the input */
font-size: 16px; /* Font size for input text */
border: 2px solid #007bff; /* Border styling */
border-radius: 20px; /* Rounded corners */
outline: none; /* Remove default outline */
`;

// Styled component for the send button
const Button = styled.button`
padding: 10px 20px; /* Padding inside the button */
margin-left: 10px; /* Space between input and button */
background-color: #007bff; /* Button background color */
color: white; /* Button text color */
border: none; /* Remove default border */
border-radius: 20px; /* Rounded corners */
cursor: pointer; /* Cursor changes to pointer on hover */
font-size: 16px; /* Font size for button text */
`;

// Functional component for the input box
const InputBox = ({ onSend }) => {
    const [message, setMessage] = useState(''); // State to keep track of input value

    const handleSend = () => {
        onSend(message); // Call the onSend function with the message
        setMessage(''); // Clear the input field
    };

    return (
        <InputContainer>
        <Input
        type="text" // Input type as text
        value={message} // Bind state to input value
        onChange={(e) => setMessage(e.target.value)} // Update state on input change
        placeholder="Type your answer..." // Placeholder text
        />
        <Button onClick={handleSend}>Send</Button> {/* Button to send the message */}
        </InputContainer>
    );
};

// Export the InputBox component for use in other parts of the app
export default InputBox;
