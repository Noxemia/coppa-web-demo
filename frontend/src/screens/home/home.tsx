import React from 'react'
import styled from 'styled-components'

type Props = {}

const Main = styled.div`
    width: 90%;
    height: 300px;
    background: white;
`

const TextContainer = styled.p`
    margin: 5px;
`

const HomeScreen: React.FC<Props> = () => {
    return <> 
    <Main>
        <TextContainer>Are you a parent or a child?</TextContainer>
    </Main>
        
    
    </>
}

export default HomeScreen