import Image from 'next/image'
import { Row, Col } from 'react-bootstrap';

function Statistics({ gamers_count, money_count }) {
    return (
        <>
            <Row>
                <Col className='mb-4 mb-md-0 mb-lg-4' xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 12 }}>
                    <Row>
                        <Col lg={{ span: 5 }} className="d-flex align-items-center justify-content-center justify-content-lg-start mb-2">
                            <Image src='/images/amount-icon.svg' width={42} height={38} alt="" priority={true} />
                            <span className='small ms-2'>Amount Of Money Collected:</span>
                        </Col>
                        <Col lg={{ span: 7 }} className="display-6 text-center text-lg-start">${money_count.toLocaleString()}</Col>
                    </Row>
                </Col>
                <Col xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 12 }}>
                    <Row>
                        <Col lg={{ span: 5 }} className="d-flex align-items-center justify-content-center justify-content-lg-start mb-2">
                            <Image src='/images/users-icon.svg' width={42} height={38} alt="" priority={true} />
                            <span className='small ms-2'>Number Of Participants:</span>
                        </Col>
                        <Col lg={{ span: 7 }} className="display-6 text-center text-lg-start">{gamers_count.toLocaleString()}</Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default Statistics