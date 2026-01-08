import React from 'react'
import { Outlet} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from '../NavBar/NavBar';
import SideBar from '../../../Shared/components/SideBar/SideBar';


export default function MasterLayout() {

  return (

    <Container fluid className='p-0'>
      <Row className='g-0'>
        <Col>
         <NavBar/>
        </Col>
      </Row>

      <Row className='g-0'>
        <Col xs="auto">
         <SideBar/>
        </Col>
        <Col className='main-content'>
         <Outlet/>
        </Col>
      </Row>
    </Container>

  )
}
