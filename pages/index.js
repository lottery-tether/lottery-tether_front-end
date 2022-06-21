import { useEffect, useState } from 'react';
import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { ThemeProvider, Container, Row, Col, Card, Button, ButtonGroup, Modal } from 'react-bootstrap';
import { CircleFill, Facebook, Github, Instagram, QrCode, Twitter } from 'react-bootstrap-icons';

import CountDown from '../components/page/index/count-down'
import Statistics from '../components/page/index/statistics'
import Ticket from '../components/page/index/ticket'
import Participants from '../components/page/index/participants'
import Winners from '../components/page/index/winners'
import Email from '../components/page/index/email';
import CopyButton from '../components/page/index/copy-button';

const walletID = process.env.NEXT_PUBLIC_WALLET_ID

export default function Home() {
  const [showQR, setShowQR] = useState(false)
  const [reloadRanking, setReloadRanking] = useState(0)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({
    time_remaining: 0
  })

  useEffect(() => {
    setLoading(true)
    axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}analytics`).then(response => {
      setData(response.data)
      setLoading(false)
    })
  }, [])

  return (
    <>
      <Head>
        <title>Lottery Tether</title>
      </Head>
      <ThemeProvider>
        {loading ? (
          <Container style={{ height: '100vh', width: '100vw' }} className="d-flex align-items-center justify-content-center">
            <div style={{ width: '192px', height: "192px" }} className="loading">
              <Image src='/images/logo192.png' alt="" width={192} height={192} layout="responsive" priority={true} />
            </div>
          </Container>
        ) : (
          <>
            <Container style={{ minHeight: '100vh' }} data-bs-spy="scroll">
              <Row className='py-5 text-center text-lg-start'>
                <Col>
                  <h1>Lottery Tether</h1>
                  <h6 className='text-secondary'>The first lottery platform on the blockchain</h6>
                </Col>
              </Row>
              <Row className='align-items-center pb-5  text-center text-md-start'>
                <Col md={{ span: 6 }}>
                  <h3 className='box-slogan mb-5 d-flex justify-content-around'><span>1 Tether<br />1 Chance</span><span style={{ borderRight: '3px solid' }}></span><span>‌X Tether<br />X Chance</span></h3>
                  <p className='text-secondary text-small'>This is our slogan.
                    Tether Lottery is a platform for those who want to participate in the lottery but anonymously, full transparency and no taxes
                    And all this is due to the Block Chain.</p>
                  <p className='text-secondary text-small'>The winner can also be tracked <a href="#winner" className='link-light text-decoration-none'>here</a> for complete transparency.</p>
                  <p className='text-secondary text-small'>The unit of payment in this platform is <a href={`${process.env.NEXT_PUBLIC_TRONSCAN_URL_CONTRACT}${process.env.NEXT_PUBLIC_USDT_CONTRACT}`} target='_blank' rel="noreferrer" className='link-light text-decoration-none'>Tether(USDT)</a> based on the TRC-20 protocol and <a href={`${process.env.NEXT_PUBLIC_TRONSCAN_URL_CONTRACT}${process.env.NEXT_PUBLIC_USDT_CONTRACT}`} target='_blank' rel="noreferrer" className='link-light text-decoration-none'>{process.env.NEXT_PUBLIC_USDT_CONTRACT}</a> Contract.</p>
                  <p className='text-secondary text-small p-0 m-0'>5% of each lottery is used for maintenance and advertising costs.</p>
                  <p className='text-secondary text-small p-0 m-0'>All source code of this platform is available in <a href="https://github.com/lotterytether" target='_blank' rel="noreferrer" className='link-light text-decoration-none'>GitHub</a>.</p>
                  <p className='text-secondary text-small p-0 mb-5'>If you want to donate or invest in this project, contact us by <a href="mailto:donate@lotterytether.com" target='_blank' rel="noreferrer" className='link-light text-decoration-none'>donate@lotterytether.com</a> or <a href="mailto:invest@lotterytether.com" target='_blank' rel="noreferrer" className='link-light text-decoration-none'>invest@lotterytether.com</a>.
                  </p>
                </Col>
                <Col md={{ span: 6 }} lg={{ span: 5, offset: 1 }}>
                  <Card className='box-glass border-0 mb-3'>
                    <Card.Body className='d-flex flex-column align-items-center'>
                      <span className='display-1'>${data.money_lottery}{data.money_lottery_unit}</span>
                      <p>Achievement of this lottery</p>
                    </Card.Body>
                  </Card>
                  <p className='text-secondary text-small'>The time of the lottery depends on the achievement of the goal or the end of the remaining time.</p>
                </Col>
              </Row>
              <Row className='pb-5'>
                <CountDown time_remaining={data.time_remaining} />
                <Col className='mb-5' lg={{ span: 5 }}>
                  <Statistics gamers_count={data.gamers_count} money_count={data.money_count} />
                </Col>
              </Row>
              <Row className='pb-3'>
                <Col className='d-flex align-items-center'>
                  <h5 className='m-0 ps-2'>Follow these two steps to participate in the lottery</h5>
                </Col>
              </Row>
              <Row className='pb-3'>
                <Col className='d-flex align-items-center'>
                  <CircleFill />
                  <h6 className='m-0 ps-2'>Step 1 - <small className='text-secondary'>Transfer (Withdraw) Tether(USDT-TRC20) To This Wallet</small></h6>
                </Col>
              </Row>
              <Row className='pb-5'>
                <Col>
                  <Card className='box-glass border-0'>
                    <Card.Body className='d-flex flex-column flex-md-row align-items-center pe-3' style={{ overflow: 'hidden' }}>
                      <span className='col wallet-text text-center pb-3 pb-md-0'>{walletID}</span>
                      <ButtonGroup>
                        <Button onClick={() => setShowQR(true)} size="sm" className="pb-2" variant='outline-secondary'><QrCode /></Button>
                        <CopyButton variant="outline-info" text={walletID} />
                      </ButtonGroup>
                    </Card.Body>
                  </Card>
                </Col>
                <Modal
                  show={showQR}
                  onHide={() => setShowQR(false)}
                  size="sm"
                  centered
                >
                  <Modal.Body>
                      <Image src='/images/qrcode.jpg' alt="" layout="responsive" width={365} height={365} priority={true} />
                  </Modal.Body>
                </Modal>
              </Row>
            </Container>
            <Container>
              <Row className='pb-3'>
                <Col className='d-flex align-items-center'>
                  <CircleFill />
                  <h6 className='m-0 ps-2'>Step 2 - <small className='text-secondary'>Paste Transaction Hash To Participate</small></h6>
                </Col>
              </Row>
              <Ticket setReloadRanking={setReloadRanking} />
              <Participants reloadRanking={reloadRanking} setReloadRanking={setReloadRanking} />
              <Winners reloadRanking={reloadRanking} setReloadRanking={setReloadRanking} />
            </Container>
            <div style={{ backgroundColor: '#081312' }}>
              <Container>
                <Row className='py-3 d-flex align-items-center'>
                  <Col className='d-none d-md-block' md={{ span: 5 }}>
                    <Image src='/images/emails.png' alt="" layout="responsive" width={663}
                        height={442} priority={true}/>
                  </Col>
                  <Col className=' py-3' md={{ span: 7 }}>
                    <Row className='pb-3'>
                      <Col className='d-flex align-items-center'>
                          <Image src='/images/title-icon.svg' alt="" width={25} height={7} priority={true} />
                        <h4 className='m-0 ps-2'>Email Address</h4>
                      </Col>
                    </Row>
                    <Email />
                  </Col>
                </Row>
              </Container>
            </div>
            <Container>
              <div className='d-flex flex-column flex-sm-row align-items-center'>
                <Col className='py-3 text-center text-sm-start' sm={{ span: 6 }}>
                  <div className='d-flex justify-content-center justify-content-sm-start'>
                    <div className='me-2'>
                        <Image src='/images/logo192.png' alt="" width='32px' height="32px" priority={true} />
                    </div>
                    <h5>Lottery Tether</h5>
                  </div>
                  <p className='small text-secondary'>The first lottery platform on the blockchain</p>
                  <a href="mailto:info@lotterytether.com" target='_blank' rel="noreferrer" className='link-light text-decoration-none'>info@lotterytether.com</a>
                </Col>
                <Col className='py-3 text-center text-sm-end' sm={{ span: 6 }}>
                  <div className='d-flex justify-content-end mb-2'>
                    <ButtonGroup>
                      <Button href="https://facebook.com/lotterytether" rel="noreferrer" target='_blank' variant="outline-secondary" size="sm" className="pb-2"><Facebook /></Button>
                      <Button href="https://instagram.com/lotterytether" rel="noreferrer" target='_blank' variant="outline-secondary" size="sm" className="pb-2"><Instagram /></Button>
                      <Button href="https://twitter.com/lotterytether" rel="noreferrer" target='_blank' variant="outline-secondary" size="sm" className="pb-2"><Twitter /></Button>
                      <Button href="https://github.com/lotterytether" rel="noreferrer" target='_blank' variant="outline-secondary" size="sm" className="pb-2"><Github /></Button>
                    </ButtonGroup>
                  </div>
                  <p className='small m-0 text-secondary'>Copyright © {new Date().getFullYear()}</p>
                </Col>
              </div>
            </Container>
          </>
        )}
      </ThemeProvider>
    </>
  )
}
