import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import Location from "../../assets/location.svg";
import Document from "../../assets/Document.svg";
import Avocado from "../../assets/Avocado.png";
import MainHeader from "../../components/Header-main";
import Footer2 from "../../components/Footer-main";

export default function OrderDetails() {
  return (
    <>
      <MainHeader />
      <section className="h-100 gradient-custom" style={{ backgroundColor: "white" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="10" xl="8">
              <MDBCard style={{ borderRadius: "10px" }}>
                <MDBCardHeader className="px-4 py-3" style={{ fontSize: "1.5rem" }}>
                  <MDBTypography tag="h5" className="text-muted mb-0">
                    Completed
                  </MDBTypography>
                </MDBCardHeader>

                <MDBCardBody className="p-4">

                  <MDBCard className="shadow-0 border mb-4">
                    <MDBCardBody>

                      <MDBRow>
                        <MDBCol md="6" className="d-flex align-items-center">
                          <img src={Location} alt="Location" style={{ marginRight: "10px" }} />
                          <div>
                            <p className="mb-0">Pawan Dhanapala</p>
                            <p className="mb-0">0764707720</p>
                            <p className="mb-0">No.50/B, Dambawela Road, Ampitiya</p>
                            <p className="mb-0">Kandy, Central, Sri Lanka, 20160</p>
                          </div>
                        </MDBCol>
                        <MDBCol md="6">
                          <div className="d-flex align-items-center">
                            <img src={Document} alt="Document" style={{ marginRight: "10px" }} />
                            <div>
                              <p className="text-muted mb-0">Order No: <span style={{ color: "black" }}>#3113</span></p>
                              <p className="text-muted mb-0">Order placed on: <span style={{ color: "black" }}> Sep 22, 2023</span></p>
                              <p className="text-muted mb-0">Payment method: <span style={{ color: "black" }}> Credit/Debit card</span></p>
                            </div>
                          </div>
                        </MDBCol>
                      </MDBRow>
                      <hr className="mb-4" style={{ backgroundColor: "#e0e0e0", opacity: 1 }} />

                      {/* Track Order */}
                      <MDBRow className="align-items-center">
                        <div className="text-left mb-4">
                          <a href="link_to_store" target="_blank" rel="noopener noreferrer" className="btn" style={{ color: '#00BA29' }}>Visit Store &gt;</a>
                        </div>

                        <MDBCol md="2">
                          <MDBCardImage
                            src={Avocado}
                            fluid
                            alt="Avocado"
                          />
                        </MDBCol>

                        {/* Product Details */}
                        <MDBCol md="8">
                          <div className="d-flex flex-column">
                            <h6 className="mb-2 text-muted">Product Name: <span style={{ color: "black" }}>Avocado - 1Kg</span></h6>
                            <p className="text-muted mb-1">Qty:<span style={{ color: "black" }}> 1</span></p>
                            <p className="text-muted mb-1">Price: <span style={{ color: "black" }}>Rs.350.00</span></p>
                          </div>
                        </MDBCol>

                        {/* Buttons column */}
                        <MDBCol md="2">
                          <div className="d-flex flex-column">
                            <button className="btn btn-sm mb-2" style={{ backgroundColor: '#00BA29', color: 'white', borderRadius: '20px' }}>Add to Cart</button>
                            <button className="btn btn-sm " style={{ backgroundColor: 'white', borderColor: 'black', borderRadius: '20px' }}> Feedback</button>
                          </div>
                        </MDBCol>

                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>

                  {/* Rest of your code */}

                </MDBCardBody>
                <MDBCardFooter className="px-4 py-3" style={{ fontSize: "1.5rem" }}>
                <MDBTypography tag="h5" className="text-muted mb-0 d-flex justify-content-end" style={{ fontSize: "0.9rem" }}>
                <span>Total paid:</span> <span className="ms-2">Rs.470.00</span>
                </MDBTypography>
                </MDBCardFooter>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      <Footer2 />
    </>
  );
}
