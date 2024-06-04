// OptionBubble.js
import React from 'react';
import styled from 'styled-components';

const Bubble = styled.button`
background-color: #007bff;
color: #fff;
border: none;
padding: 10px 20px;
border-radius: 5px;
cursor: pointer;
word-wrap: break-word; /* Ensure long text wraps */
max-width: 100%; /* Allow it to take up available width */

&:hover {
    background-color: #0056b3;
}
`;

const OptionBubble = ({ option, onClick }) => {
    return (
        <Bubble onClick={onClick}>
        {option}
        </Bubble>
    );
};

export default OptionBubble;
