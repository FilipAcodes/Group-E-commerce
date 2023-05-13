import styled from "styled-components"
import { COLORS } from "../constats"

const Footer = () => {
    return (
        <FooterDiv>
        </FooterDiv>
    )
}

const FooterDiv = styled.footer`
position: fixed;
bottom: 0;
left: 0;
width: 100%;
height: 50px;
background-color: ${COLORS.backgroundGreen};
`

export default Footer