import React from 'react';
import styled from 'styled-components';
import useTypewriter from '../hooks/useTypewriter';

// Styled component for the bot message container
const BotMessageContainer = styled.div`
display: flex;
align-items: flex-start;
margin-bottom: 10px;
width: 100%;
`;

// Styled component for the user message container
const UserMessageContainer = styled.div`
display: flex;
align-items: flex-start;
justify-content: flex-end;
margin-bottom: 10px;
width: 100%;
`;

// Styled component for the icon wrapper (for bot)
const IconWrapper = styled.div`
width: 70px;
height: 70px;
border-radius: 50%;
overflow: hidden;
margin-right: 10px;
flex-shrink: 0;

@media (max-width: 600px) {
  width: 30px;
  height: 30px;
  margin-right: 5px;
}
`;

// Styled component for the icon wrapper (for user)
const UserIconWrapper = styled.div`
width: 70px;
height: 70px;
border-radius: 50%;
overflow: hidden;
margin-left: 10px;
flex-shrink: 0;

@media (max-width: 600px) {
  width: 30px;
  height: 30px;
  margin-left: 5px;
}
`;

// Styled component for the icon image
const Icon = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
`;

// Styled component for the message bubble
const MessageBubble = styled.div`
background-color: ${props => (props.isUser ? '#007bff' : '#e9ecef')};
color: ${props => (props.isUser ? '#fff' : '#000')};
padding: 10px 15px;
border-radius: 15px;
max-width: 60%;
word-wrap: break-word;

@media (max-width: 600px) {
  max-width: 70%;
  padding: 8px 12px;
}
`;

// Functional component for the chat bubble
const ChatBubble = ({ message, isUser, isLastMessage }) => {
  const typewriterText = useTypewriter(message, 50);

  if (isUser) {
    return (
      <UserMessageContainer>
      <MessageBubble isUser>{isLastMessage ? typewriterText : message}</MessageBubble>
      <UserIconWrapper>
      <Icon src={`${process.env.PUBLIC_URL}/user_avatar.jpg`} alt="User Avatar" />
      </UserIconWrapper>
      </UserMessageContainer>
    );
  } else {
    return (
      <BotMessageContainer>
      <IconWrapper>
      <Icon src={`${process.env.PUBLIC_URL}/itglobal-circle.jpg`} alt="Bot Icon" />
      </IconWrapper>
      <MessageBubble>{isLastMessage ? typewriterText : message}</MessageBubble>
      </BotMessageContainer>
    );
  }
};

export default ChatBubble;
