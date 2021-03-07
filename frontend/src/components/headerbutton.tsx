import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

type Props = {
    text: string,
    to: string
}

const Button = styled.div`
    width: 160px;
    height: 70%;
    background: lightgray;
    margin-right: 0.5%;
    cursor: pointer;
    &:hover {
        background: darkgray;
    }
`

const StyledLink = styled(Link)`
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`


const HeaderButton: React.FC<Props> = ({text, to}) => {

    return <Button><StyledLink to={to}><p>{text}</p></StyledLink></Button>
}

export default HeaderButton