import React, { useEffect, useState } from 'react'

import axios from 'axios'
import styled from 'styled-components'

import bodybutton from '../../components/bodybutton'
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

const ChildScreen: React.FC<Props> = () => {

    const [text, setText] = useState("loading")

    const [active, setActive] = useState(false)

    const [currReq, setReq] = useState(true)

    const [btnText, setBtnText] = useState('Send Request')

    useEffect(() => {
        axios.get('http://localhost:4000/activerequest')
        .then((req_response: any) => {

            axios.get('http://localhost:4000/avaliableconsent')
            .then((cons_response: any) => {

                if(cons_response.data){
                    setText('Your parent has given consent, do you still want to send your info?')
                    setActive(true)
                    setReq(false)
                    setBtnText('Send Info')
                }else {
                    if(!req_response.data){ setActive(true)}
                    req_response.data ? setText('You have already asked for consent') : setText('Do you want to request consent from your parent?')
                }

            }).catch(err => console.log(err))



        
        }).catch(err => console.log(err))




    }, [])

    

    function sendReq() {
        if(currReq) {
            axios.post('http://localhost:4000/setrequest')
            .then(() => {setText('Request Sent'); setActive(false)})
            .catch(err => console.log(err))
        }else {
            setActive(false)
            setText('Your info has been sent!')
        }
        
        
    }

 

    return <> 
    <Main>
        <TextContainer>
            Welcome Child! <br/>
            {text}
        </TextContainer>
        <BodyButton func={sendReq} text={btnText} active={active}/>
    </Main>
    
    </>
}

export default ChildScreen