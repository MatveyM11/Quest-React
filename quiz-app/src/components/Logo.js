import React from 'react';
import styled from 'styled-components';

// Styled component for the logo container
const LogoContainer = styled.div`
position: fixed; /* Fix position relative to the viewport */
top: 0; /* Stick to the top of the page */
left: 50%; /* Center horizontally */
transform: translateX(-50%); /* Adjust to perfectly center */
z-index: 1000; /* Ensure the logo stays on top */
pointer-events: none; /* Make it non-clickable */
`;

// Styled component for the logo image
const LogoImage = styled.img`
width: 200px; /* Adjust the width as needed */
height: 200px; /* Adjust the height as needed */
border-radius: 50%; /* Make it circular */
user-select: none; /* Make it non-selectable */
`;

// Functional component for the logo
const Logo = () => (
    <LogoContainer>
    <LogoImage src="/itglobal-logo-1200.webp" alt="ITGlobal Logo" />
    </LogoContainer>
);

// Export the Logo component for use in other parts of the app
export default Logo;
