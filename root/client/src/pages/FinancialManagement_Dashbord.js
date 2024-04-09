import React from 'react'
import styled from 'styled-components'
// import Navbar from './Navbar'
import Analytic from '../components/FinancialManagement_Analytic'
import Balance from '../components/FinancialManagement_Balance'
import History from '../components/FinancialManagement_History'
function Dashboard() {
    return (
        <Section>
           
            <div className="grid">        
                    {/* <Navbar /> */}
                    <Analytic />
                    <Balance />
                    <History />    
            </div>
        </Section>
    )
}

export default Dashboard
const Section = styled.section `
margin-left: 5vw;
margin-right: 14px;
padding: 2rem;
height: 60rem;
background-color: #F5F5FD;
.grid{ 
    margin-top: 0.5rem;
    z-index: 2;
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
   
}

`;