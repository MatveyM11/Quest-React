import React from 'react';
import styled from 'styled-components';
import ChatBubble from './ChatBubble';
import OptionBubble from './OptionBubble';

// Styled container for the chat interface
const Container = styled.div`
display: flex; /* Use flexbox for layout */
flex-direction: column; /* Arrange items vertically */
align-items: center; /* Center items horizontally */
width: 100%; /* Full width */
max-height: 70vh; /* Maximum height for the container */
overflow-y: auto; /* Enable vertical scrolling */
padding: 20px; /* Padding inside the container */
border: 1px solid #ccc; /* Border around the container */
border-radius: 10px; /* Rounded corners */
background-color: #fff; /* Background color */
box-sizing: border-box; /* Include padding and border in the element's total width and height */
`;

// Styled container for the option buttons
const OptionsContainer = styled.div`
display: flex; /* Use flexbox for layout */
flex-direction: row; /* Arrange items horizontally */
justify-content: center; /* Center items horizontally */
align-items: center; /* Center items vertically */
width: 100%; /* Full width */
gap: 10px; /* Space between items */
margin-top: 10px; /* Margin on top */
`;

// Styled container for the final option buttons
const SingleLineOptionsContainer = styled.div`
display: flex; /* Use flexbox for layout */
flex-direction: column; /* Arrange items vertically */
justify-content: center; /* Center items vertically */
align-items: center; /* Center items horizontally */
width: 100%; /* Full width */
gap: 10px; /* Space between items */
margin-top: 10px; /* Margin on top */
`;

// Styled wrapper for each option bubble
const OptionWrapper = styled.div`
flex: 0 0 auto; /* Flex item with no growth or shrink */
margin: 5px; /* Margin around each option */
`;

// ChatContainer component to display chat messages and options
const ChatContainer = ({ messages, options, onOptionClick, isQuizFinished }) => {
    // Function to render options in a row
    const renderOptions = () => {
        return (
            <OptionsContainer>
            {options.map((option, index) => (
                <OptionWrapper key={index}>
                <OptionBubble option={option} onClick={() => onOptionClick(option)} />
                </OptionWrapper>
            ))}
            </OptionsContainer>
        );
    };

    // Function to render options in a column
    const renderFinalOptions = () => {
        return (
            <SingleLineOptionsContainer>
            {options.map((option, index) => (
                <OptionWrapper key={index}>
                <OptionBubble option={option} onClick={() => onOptionClick(option)} />
                </OptionWrapper>
            ))}
            </SingleLineOptionsContainer>
        );
    };

    return (
        <Container>
        {messages.map((message, index) => (
            <ChatBubble key={index} message={message.text} isUser={message.isUser} />
        ))}
        {isQuizFinished ? renderFinalOptions() : renderOptions()}
        </Container>
    );
};

// Export the ChatContainer component for use in other parts of the app
export default ChatContainer;
