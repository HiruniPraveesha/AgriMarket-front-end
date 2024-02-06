import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../assets/Logo1.png';
import Bell from '../assets/Bell.svg';
import Cart from '../assets/Cart.svg';
import login from '../assets/Login.svg';
import Search from '../assets/Search.svg';
import language from '../assets/Languages.svg';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const MainHeader = () => {
  const imgStyle = {
    margin: '0 2px 0 0', 
  };
  
  
  const activeLinkStyle = {
    color: '#00BA29',
  };

  const listItemStyle3 = {
    margin: '0 20px', 
  };

  const dropdownStyle = {
    backgroundColor: '#00BA29',
    borderColor: '#00BA29', 
    color: '#FFFFFF',
    padding: '8px 16px',
    borderRadius: '0',
  };

  const dropdownItemStyle = {
    padding: '8px 16px', // Adjust the padding as needed
  };

  const buttonStyle = {
    backgroundColor: '#00BA29',
    borderColor: '#00BA29', 
    borderRadius: '0',
  };

  
  return (
    <>
    <Container fluid>
      <Row style={{ padding: ' 0 10px', backgroundColor: '#F5F5F5' }}>
        <Col sm={2}></Col>
        <Col sm={2}>
        <Dropdown >
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            <img src={language} alt="Language" style={{width:'18px', height:'18px'}}/>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {/* Add your dropdown items here */}
            <Dropdown.Item href="#/action-1">English</Dropdown.Item>
            <Dropdown.Item href="#/action-2">සිංහල</Dropdown.Item>
            {/* Add more items as needed */}
          </Dropdown.Menu>
        </Dropdown>
        </Col>
        <Col sm={4}></Col>
        <Col sm={1} className="d-flex align-items-center justify-content-center">
          <a href='#' className='text-decoration-none' style={{color: 'black', fontSize: '14px'}}>Help</a>
        </Col>
        <Col sm={1} className="d-flex align-items-center justify-content-center">
        
        <a href='#' className='text-decoration-none' style={{color: '#00BA29', fontSize: '14px'}}><img src={login} style={imgStyle}></img>Login/Register</a>

        </Col>
        <Col sm={2}></Col>
      </Row>
      <Row style={{ padding: ' 0 10px', backgroundColor: 'white' }}>
        <Col sm={2}></Col>
        <Col sm={2}>
        <a href="#">
            <img src={Logo} style={{height:'84px', width:'70px'}}></img>
        </a>
        </Col>
        <Col sm={4}>


          <Row className="align-items-center justify-content-center" style={{height: '100%'}}>

      <div className="d-flex align-items-center">
      <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic" style={dropdownStyle}>
            All categories
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {/* Add your dropdown items here */}
            <Dropdown.Item href="#/action-1" style={dropdownItemStyle}>1</Dropdown.Item>
            <Dropdown.Item href="#/action-2" style={dropdownItemStyle}>2</Dropdown.Item>
            <Dropdown.Item href="#/action-2" style={dropdownItemStyle}>3</Dropdown.Item>
            <Dropdown.Item href="#/action-2" style={dropdownItemStyle}>4</Dropdown.Item>
            {/* Add more items as needed */}
          </Dropdown.Menu>
        </Dropdown>

        <input className="form-control mr-sm-2" type="search" aria-label="Search" style={{ borderRadius: '0', width: '300px' }}/>
        <button className="btn btn-success my-2 my-sm-0" type="submit" style={buttonStyle}>
            <img src={Search}></img>
        </button>
      </div>
    
    </Row>
        </Col>
        <Col sm={1} className="d-flex align-items-center justify-content-center">
        
        </Col> 
         <Col sm={1} className="d-flex align-items-center justify-content-center">
         <a className="nav-link" href="#" style={{margin: '0 20px'}}>
                <img src={Bell}></img>
              </a>
         <a className="nav-link" href="#" style={{margin: '0 20px'}}>
                <img src={Cart}></img>
              </a>
        </Col>
        <Col sm={2}></Col>
      </Row>
      <Row style={{backgroundColor: '#F5F5F5' }}>
      <Col sm={2}></Col>
      <Col sm={8}>
      <nav className="navbar navbar-expand" >
      <div className="container-fluid">
        <a className="navbar-brand" href="#" style={{...activeLinkStyle, fontSize:'14px'}} >HOME</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item" style={listItemStyle3}>
              <a className="nav-link active" aria-current="page" href="nav-bar.tsx" style={{fontSize:'14px'}} >PRODUCT MAP</a>
            </li>
            <li className="nav-item" style={listItemStyle3}>
              <a className="nav-link" href="#" style={{fontSize:'14px'}}>PRODUCT CALENDAR</a>
            </li>
            <li className="nav-item" style={listItemStyle3}>
              <a className="nav-link" href="#" style={{fontSize:'14px'}}>CONTACT US</a>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item" >
              <a className="nav-link" href="#" style={{fontSize:'14px'}}>CALL US NOW +94 76 335 2254</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </Col>
    <Col sm={2}></Col>
      </Row>
      
    </Container>
    </>
  )
}

export default MainHeader;
