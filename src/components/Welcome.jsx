import React from 'react'
import styled from 'styled-components';
import robot from '../assets/robot.gif';

const Container = styled.div`
display : flex;
align-items: center;
justify-content: center;
flex-direction: column;
color: white;
img{
    height: 20rem;
}
span{
    color:#4e0eff;
}
`;

const Welcome = ({currentUser}) => {
  return (
    <Container>
        <img src={robot} alt="Robot" />
        <h1>
            Welcome, <span>{currentUser.username}!</span>
        </h1>
        <h3>Please select a chat to Start Messaging.</h3>
    </Container>
  )
}

export default Welcome