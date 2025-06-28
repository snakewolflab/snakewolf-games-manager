import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #1a1e22;
  padding: 20px 40px;
  text-align: center;
  color: var(--disable-gray);
  margin-top: auto; /* コンテンツが少ないページでも下に固定 */
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
`;

function Footer() {
  return (
    <FooterContainer>
      <p>&copy; 2025 GameSphere. All rights reserved.</p>
    </FooterContainer>
  );
}

export default Footer;