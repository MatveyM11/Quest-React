import React from 'react';
import styled from 'styled-components';

// Styled component for the bot message container
const BotMessageContainer = styled.div`
display: flex; /* Use flexbox for layout */
align-items: flex-start; /* Align items to the start vertically */
margin-bottom: 10px; /* Space between messages */
width: 100%; /* Full width for proper alignment */
`;

// Styled component for the user message container
const UserMessageContainer = styled.div`
display: flex; /* Use flexbox for layout */
align-items: flex-start; /* Align items to the start vertically */
justify-content: flex-end; /* Align items to the end horizontally */
margin-bottom: 10px; /* Space between messages */
width: 100%; /* Full width for proper alignment */
`;

// Styled component for the icon wrapper (for bot)
const IconWrapper = styled.div`
width: 70px; /* Set icon width */
height: 70px; /* Set icon height */
border-radius: 50%; /* Make the icon circular */
overflow: hidden; /* Hide overflow content */
margin-right: 10px; /* Space between icon and message */
flex-shrink: 0; /* Prevent shrinking */

@media (max-width: 600px) {
  width: 30px; /* Reduce size on small screens */
  height: 30px; /* Reduce size on small screens */
  margin-right: 5px; /* Reduce margin on small screens */
}
`;

// Styled component for the icon wrapper (for user)
const UserIconWrapper = styled.div`
width: 70px; /* Set icon width */
height: 70px; /* Set icon height */
border-radius: 50%; /* Make the icon circular */
overflow: hidden; /* Hide overflow content */
margin-left: 10px; /* Space between icon and message */
flex-shrink: 0; /* Prevent shrinking */

@media (max-width: 600px) {
  width: 30px; /* Reduce size on small screens */
  height: 30px; /* Reduce size on small screens */
  margin-left: 5px; /* Reduce margin on small screens */
}
`;

// Styled component for the icon image
const Icon = styled.img`
width: 100%; /* Full width of the container */
height: 100%; /* Full height of the container */
object-fit: cover; /* Cover the container area */
`;

// Styled component for the message bubble
const MessageBubble = styled.div`
background-color: ${props => (props.isUser ? '#007bff' : '#e9ecef')}; /* Background color based on user */
color: ${props => (props.isUser ? '#fff' : '#000')}; /* Text color based on user */
padding: 10px 15px; /* Padding inside the bubble */
border-radius: 15px; /* Rounded corners */
max-width: 60%; /* Maximum width */
word-wrap: break-word; /* Wrap long words */

@media (max-width: 600px) {
  max-width: 70%; /* Adjust max-width on small screens */
  padding: 8px 12px; /* Adjust padding on small screens */
}
`;

// Functional component for the chat bubble
const ChatBubble = ({ message, isUser }) => {
  if (isUser) {
    // Return user message layout
    return (
      <UserMessageContainer>
      <MessageBubble isUser>{message}</MessageBubble>
      <UserIconWrapper>
      <Icon src={`${process.env.PUBLIC_URL}/user_avatar.jpg`} alt="User Avatar" />
      </UserIconWrapper>
      </UserMessageContainer>
    );
  } else {
    // Return bot message layout
    return (
      <BotMessageContainer>
      <IconWrapper>
      <Icon src={`${process.env.PUBLIC_URL}/itglobal-circle.jpg`} alt="Bot Icon" />
      </IconWrapper>
      <MessageBubble>{message}</MessageBubble>
      </BotMessageContainer>
    );
  }
};

// Export the ChatBubble component for use in other parts of the app
export default ChatBubble;
