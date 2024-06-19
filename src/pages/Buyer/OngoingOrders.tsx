import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBProgress,
  MDBProgressBar,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React from "react";
import MainHeader from "../../components/Header-main";
import MainFooter from "../../components/Footer-main";
import More from "../../assets/more.svg"; 
import { Link } from "react-router-dom";


export default function OngoingOrders() {
  return (
    <>
     <MainHeader/>
      <section style={{margin:'0 20%'}}>
        <div>
        <p style={{ fontSize: '17px', fontWeight: 'bold', marginTop: '50px' }}>Ongoing Orders</p>
      </div>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="12" xl="10">
              <MDBCard style={{ borderRadius: "10px" }}>

                <MDBCardBody className="p-4">

                  <MDBCard className="shadow-0 border mb-4">
                    <MDBCardBody>
                      <MDBRow>
                        <MDBCol
                          md="2"
                          className="text-center d-flex justify-content-center align-items-center"
                        >
                          <p className="text-muted mb-0">#1234</p>
                        </MDBCol>
                        <MDBCol
                          md="4"
                          className="text-center d-flex justify-content-center align-items-center"
                        >
                          <p className="text-muted mb-0 small">Carrot - 2Kg</p>
                        </MDBCol>
                        
                        <MDBCol
                          md="2"
                          className="text-center d-flex justify-content-center align-items-center"
                        >
                          <p className="text-muted mb-0 small">Qty: 1</p>
                        </MDBCol>
                        <MDBCol
                          md="3"
                          className="text-center d-flex justify-content-center align-items-center"
                        >
                          <p className="text-muted mb-0 small">Rs.450.00</p>
                        </MDBCol>
                        <MDBCol
                          md="1"
                          className="text-center d-flex justify-content-center align-items-center">
                          <img src={More} alt="More" style={{ width: '20px', height: '20px', transform: 'rotate(-90deg)' }} />
                        </MDBCol>
                      </MDBRow>
                      <hr
                        className="mb-4"
                        style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
                      />
                      <MDBRow className="align-items-center">
                        <MDBCol md="2">
                          <p className="text-muted mb-0 small">Track Order</p>
                        </MDBCol>
                        <MDBCol md="10">
                          <MDBProgress
                            style={{ height: "6px", borderRadius: "16px" }}
                          >
                            <MDBProgressBar
                              style={{
                                borderRadius: "16px",
                                backgroundColor: "#00BA29",
                              }}
                              width={65}
                              valuemin={0}
                              valuemax={100}
                            />
                          </MDBProgress>
                          <div className="d-flex justify-content-around mb-1">
                            <p className="text-muted mt-1 mb-0 small ms-xl-5">
                              Out for delivary
                            </p>
                            <p className="text-muted mt-1 mb-0 small ms-xl-5">
                              Delivered
                            </p>
                          </div>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>

                  <MDBCard className="shadow-0 border mb-4">
                    <MDBCardBody>
                      <MDBRow>
                        <MDBCol md="2"
                          className="text-center d-flex justify-content-center align-items-center"
                        >
                          <p className="text-muted mb-0">#4542</p>
                        </MDBCol>

                        <MDBCol
                          md="4"
                          className="text-center d-flex justify-content-center align-items-center"
                        >
                          <p className="text-muted mb-0 small">Avocado - 1Kg</p>
                        </MDBCol>

                        <MDBCol
                          md="2"
                          className="text-center d-flex justify-content-center align-items-center"
                        >
                          <p className="text-muted mb-0 small">
                            Qty: 1
                          </p>
                        </MDBCol>
                        <MDBCol
                          md="3"
                          className="text-center d-flex justify-content-center align-items-center"
                        >
                          <p className="text-muted mb-0 small">Rs. 540.00</p>
                        </MDBCol>
                        <MDBCol
                          md="1"
                          className="text-center d-flex justify-content-center align-items-center"
                        ><Link to="/order-details">
                          <img src={More} alt="More" style={{ width: '20px', height: '20px', transform: 'rotate(-90deg)' }} /></Link>
                        </MDBCol>
                      </MDBRow>
                      <hr
                        className="mb-4"
                        style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
                      />
                      <MDBRow className="align-items-center">
                        <MDBCol md="2">
                          <p className="text-muted mb-0 small">Track Order</p>
                        </MDBCol>
                        <MDBCol md="10">
                          <MDBProgress
                            style={{ height: "6px", borderRadius: "16px" }}
                          >
                            <MDBProgressBar
                              style={{
                                borderRadius: "16px",
                                backgroundColor: "#00BA29",
                              }}
                              width={20}
                              valuemin={0}
                              valuemax={100}
                            />
                          </MDBProgress>
                          <div className="d-flex justify-content-around mb-1">
                            <p className="text-muted mt-1 mb-0 small ms-xl-5">
                              Out for delivary
                            </p>
                            <p className="text-muted mt-1 mb-0 small ms-xl-5">
                              Delivered
                            </p>
                          </div>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>

                  <MDBCard className="shadow-0 border mb-4">
                    <MDBCardBody>
                      <MDBRow>
                        <MDBCol
                          md="2"
                          className="text-center d-flex justify-content-center align-items-center"
                        >
                          <p className="text-muted mb-0">#5652</p>
                        </MDBCol>
                        <MDBCol
                          md="4"
                          className="text-center d-flex justify-content-center align-items-center"
                        >
                          <p className="text-muted mb-0 small">Beans - 2Kg</p>
                        </MDBCol>
                        
                        <MDBCol
                          md="2"
                          className="text-center d-flex justify-content-center align-items-center"
                        >
                          <p className="text-muted mb-0 small">Qty: 2</p>
                        </MDBCol>
                        <MDBCol
                          md="3"
                          className="text-center d-flex justify-content-center align-items-center"
                        >
                          <p className="text-muted mb-0 small">Rs.680.00</p>
                        </MDBCol>
                        <MDBCol
                          md="1"
                          className="text-center d-flex justify-content-center align-items-center">
                          <img src={More} alt="More" style={{ width: '20px', height: '20px', transform: 'rotate(-90deg)' }} />
                        </MDBCol>
                      </MDBRow>
                      <hr
                        className="mb-4"
                        style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
                      />
                      <MDBRow className="align-items-center">
                        <MDBCol md="2">
                          <p className="text-muted mb-0 small">Track Order</p>
                        </MDBCol>
                        <MDBCol md="10">
                          <MDBProgress
                            style={{ height: "6px", borderRadius: "16px" }}
                          >
                            <MDBProgressBar
                              style={{
                                borderRadius: "16px",
                                backgroundColor: "#00BA29",
                              }}
                              width={85}
                              valuemin={0}
                              valuemax={100}
                            />
                          </MDBProgress>
                          <div className="d-flex justify-content-around mb-1">
                            <p className="text-muted mt-1 mb-0 small ms-xl-5">
                              Out for delivary
                            </p>
                            <p className="text-muted mt-1 mb-0 small ms-xl-5">
                              Delivered
                            </p>
                          </div>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>

                </MDBCardBody>
                
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      <MainFooter/>
    </>
  );
}
