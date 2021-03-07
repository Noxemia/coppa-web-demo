import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'

import BodyButton from '../../components/bodybutton'

const Main = styled.div`
    width: 90%;
    height: 300px;
    background: white;
`

const TextContainer = styled.p`
    margin: 5px;
`

type Props = {}

const ParentScreen: React.FC<Props> = () => {

    const [text, setText] = useState("loading")

    const [active, setActive] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:4000/pendingrequest')
        .then((res: any) => {
            if(res.data.active ){
                setText(res.data.policy)
            }else {
                setText('No requests awaits you')
                setActive(false)
            }
        })
    }, [])

    const sendConsent = () => {
        axios.post('http://localhost:4000/giveconsent')
        .then(() => {
            setActive(false)
            setText('Consent sent!')
        })
    }

    return <> 
    <Main>
        <TextContainer>
            Welcome Parent! <br/>
            {text}
        </TextContainer>
        <BodyButton func={sendConsent} text='consent' active={active}/>
    </Main>
    
    </>
}

export default ParentScreen