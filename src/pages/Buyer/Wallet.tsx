import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import MainHeader from '../../components/Header-main';
import MainFooter from "../../components/Footer-main";
import ProPic from "../../assets/ProPic.png";

export default function Wallet() {
  return (
    <>
    <MainHeader/>
    <div >
      <MDBContainer className="container py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="12" xl="4">
            <MDBCard style={{ borderRadius: '15px' }}>
              <MDBCardBody className="text-center">
              <div className="mt-3 mb-4">
                    <MDBCardImage src={ProPic} alt="Profile Picture" style={{ width: '200px', borderRadius: '50%' }} />
                  </div>
                <MDBTypography tag="h4">Nehan Perera</MDBTypography>
                <MDBCardText className="text-muted mb-4">
                 <span className="mx-2">Pereranehan51@gmail.com</span>
                </MDBCardText>
                
                <div className="d-flex justify-content-between text-center mt-5 mb-2">
  <div className="d-flex flex-grow-1 align-items-center flex-column">
    <MDBCardText className="mb-1 h5">Rs.8471</MDBCardText>
    <MDBCardText className="small text-muted mb-0">Wallets Balance</MDBCardText>
  </div>
  <div className="d-flex flex-grow-1 align-items-center flex-column">
    <MDBCardText className="mb-1 h5">Rs.14751</MDBCardText>
    <MDBCardText className="small text-muted mb-0">Total Transactions</MDBCardText>
  </div>
  <div className="d-flex flex-grow-1 align-items-center flex-column">
  <button className="mb-1 h5" style={{backgroundColor:'#00BA29', color:'white', borderColor:'#00BA29', width:'23px', height:'23px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative'}}>
    <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>+</span>
  </button>
  <MDBCardText className="small text-muted mb-0">Recharge</MDBCardText>
</div>

</div>

              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
    <MainFooter/>
    </>
  );
}