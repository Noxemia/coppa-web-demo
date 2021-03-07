import React from 'react'
import styled from 'styled-components'



type Props = {
    text: string,
    func: any,
    active: boolean
}

const BodyButton: React.FC<Props> = ({text, func, active}) => {

    const ReqButton = styled.div`
    width: 200px;
    height: 30px;
    background: ${active ? 'lightgray': 'darkgrey'};
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.5% 0 0 2%;
    cursor: ${active ? 'pointer': 'default'};
    &:hover {
        background: darkgray;
    }
`

    const activeFunc = () => {
        if(active) func()
    } 

    return <ReqButton onClick={activeFunc}>{text}</ReqButton>
}

export default BodyButton