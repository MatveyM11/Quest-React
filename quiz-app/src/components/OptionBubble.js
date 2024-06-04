import React from 'react';
import styled from 'styled-components';

// Styled component for the option bubble
const Bubble = styled.div`
padding: 10px 20px; /* Padding inside the bubble */
margin: 5px; /* Margin around the bubble */
border-radius: 20px; /* Rounded corners */
background-color: #007bff; /* Background color */
color: white; /* Text color */
cursor: pointer; /* Cursor changes to pointer on hover */
white-space: nowrap; /* Prevent text from wrapping */
text-align: center; /* Center the text */

&:hover {
    background-color: #0056b3; /* Change background color on hover */
}
`;

// Functional component for the option bubble
const OptionBubble = ({ option, onClick }) => {
    return <Bubble onClick={onClick}>{option}</Bubble>; // Render the bubble with an onClick event
};

// Export the OptionBubble component for use in other parts of the app
export default OptionBubble;
