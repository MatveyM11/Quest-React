// ChatContainer.js
import React from 'react';
import styled from 'styled-components';
import ChatBubble from './ChatBubble';
import OptionBubble from './OptionBubble';

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
max-height: 70vh;
overflow-y: auto;
padding: 20px;
border: 1px solid #ccc;
border-radius: 10px;
background-color: #fff;
box-sizing: border-box;
`;

const OptionsContainer = styled.div`
display: flex;
flex-direction: column; /* Stack vertically */
justify-content: center;
align-items: center;
width: 100%;
gap: 10px;
margin-top: 10px;

@media (min-width: 600px) {
    flex-direction: row; /* Stack horizontally on larger screens */
}
`;

const SingleLineOptionsContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
gap: 10px;
margin-top: 10px;
`;

const OptionWrapper = styled.div`
flex: 0 0 auto;
margin: 5px;
word-wrap: break-word; /* Ensure long text wraps */
`;

const ChatContainer = ({ messages, options, onOptionClick, isQuizFinished }) => {
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
            <ChatBubble
            key={index}
            message={message.text}
            isUser={message.isUser}
            isLastMessage={index === messages.length - 1}
            />
        ))}
        {isQuizFinished ? renderFinalOptions() : renderOptions()}
        </Container>
    );
};

export default ChatContainer;
