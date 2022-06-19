import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'

import secToDays from './sec-to-days'

function CountDown({ time_remaining }) {
    const [targetTime, setTargetTime] = useState(time_remaining)
    const [countDownTime, setCountDownTime] = useState(secToDays(time_remaining))
    const [finishTime, setFinishTime] = useState(false)
    const [title, setTitle] = useState(targetTime >= 0 ? 'Remaining Timer' : 'End Remaining Timer')

    useEffect(() => {
        if (finishTime) return

        const timer = setInterval(() => {
            if (targetTime >= 0) {
                setTitle('Remaining Timer')
                setCountDownTime(secToDays(targetTime))
                return setTargetTime(time => time -= 1)
            }
            setTitle('End Remaining Timer')
            setCountDownTime({ days: '00', hours: '00', minutes: '00', seconds: '00' })
            return setFinishTime(true)
        }, 1000);

        return () => clearInterval(timer);
    })

    // useEffect(() => {
    //     if (!finishTime) return

    //     const timer = setInterval(() => {
    //         setCountDownTime({ days: (Math.floor(Math.random() * 80) + 11).toString(), hours: (Math.floor(Math.random() * 80) + 11).toString(), minutes: (Math.floor(Math.random() * 80) + 11).toString(), seconds: (Math.floor(Math.random() * 80) + 11).toString() })
    //     }, 100);

    //     return () => clearInterval(timer);
    // })

    return (
        <>
            <Col className='d-flex align-items-center pb-3' lg={{ span: 11 }}>
                <Image src='/images/title-icon.svg' alt="" width={25} height={7} />
                <h4 className='m-0 ps-2'>{title}</h4>
            </Col>
            <Col className='mb-3' lg={{ span: 7 }}>
                <Row>
                    {
                        finishTime ? (
                            <>
                                <Col className='d-flex justify-content-center justify-content-lg-start'>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className='d-flex'>
                                            <div style={{ width: '40px' }} className='h3 border rounded py-2 text-center me-1'>{countDownTime.days.charAt(0)}</div>
                                            <div style={{ width: '40px' }} className='h3 border rounded py-2 text-center'>{countDownTime.days.charAt(1)}</div>
                                        </div>
                                        <div className='text-secondary'>Days</div>
                                    </div>
                                    <div className='h3 mx-2 py-2'>:</div>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className='d-flex'>
                                            <div style={{ width: '40px' }} className='h3 border rounded py-2 text-center me-1'>{countDownTime.hours.charAt(0)}</div>
                                            <div style={{ width: '40px' }} className='h3 border rounded py-2 text-center'>{countDownTime.hours.charAt(1)}</div>
                                        </div>
                                        <div className='text-secondary'>Hours</div>
                                    </div>
                                    <div className='h3 mx-2 py-2'>:</div>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className='d-flex'>
                                            <div style={{ width: '40px' }} className='h3 border rounded py-2 text-center me-1'>{countDownTime.minutes.charAt(0)}</div>
                                            <div style={{ width: '40px' }} className='h3 border rounded py-2 text-center'>{countDownTime.minutes.charAt(1)}</div>
                                        </div>
                                        <div className='text-secondary'>Minutes</div>
                                    </div>
                                    <div className='h3 mx-2 py-2'>:</div>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className='d-flex'>
                                            <div style={{ width: '40px' }} className='h3 border rounded py-2 text-center me-1'>{countDownTime.seconds.charAt(0)}</div>
                                            <div style={{ width: '40px' }} className='h3 border rounded py-2 text-center'>{countDownTime.seconds.charAt(1)}</div>
                                        </div>
                                        <div className='text-secondary'>Seconds</div>
                                    </div>
                                </Col>
                            </>
                        ) : (
                            <>

                                <Col className='d-flex justify-content-center justify-content-lg-start'>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className='d-flex'>
                                            <div style={{ width: '40px' }} className='h3 border rounded py-2 text-center me-1'>{countDownTime.days.charAt(0)}</div>
                                            <div style={{ width: '40px' }} className='h3 border rounded py-2 text-center'>{countDownTime.days.charAt(1)}</div>
                                        </div>
                                        <div className='text-secondary'>Days</div>
                                    </div>
                                    <div className='h3 mx-2 py-2'>:</div>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className='d-flex'>
                                            <div style={{ width: '40px' }} className='h3 border rounded py-2 text-center me-1'>{countDownTime.hours.charAt(0)}</div>
                                            <div style={{ width: '40px' }} className='h3 border rounded py-2 text-center'>{countDownTime.hours.charAt(1)}</div>
                                        </div>
                                        <div className='text-secondary'>Hours</div>
                                    </div>
                                    <div className='h3 mx-2 py-2'>:</div>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className='d-flex'>
                                            <div style={{ width: '40px' }} className='h3 border rounded py-2 text-center me-1'>{countDownTime.minutes.charAt(0)}</div>
                                            <div style={{ width: '40px' }} className='h3 border rounded py-2 text-center'>{countDownTime.minutes.charAt(1)}</div>
                                        </div>
                                        <div className='text-secondary'>Minutes</div>
                                    </div>
                                    <div className='h3 mx-2 py-2'>:</div>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className='d-flex'>
                                            <div style={{ width: '40px' }} className='h3 border rounded py-2 text-center me-1'>{countDownTime.seconds.charAt(0)}</div>
                                            <div style={{ width: '40px' }} className='h3 border rounded py-2 text-center'>{countDownTime.seconds.charAt(1)}</div>
                                        </div>
                                        <div className='text-secondary'>Seconds</div>
                                    </div>
                                </Col>

                            </>
                        )
                    }
                </Row>
                <Row>
                    <p className='small mt-3 text-center text-lg-start'>The remaining time to participate in the lottery</p>
                </Row>
            </Col>
        </>
    )
}

export default CountDown