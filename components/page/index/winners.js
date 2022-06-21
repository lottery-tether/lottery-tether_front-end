import { useEffect, useState } from 'react';
import axios from 'axios'
import Image from 'next/image'
import { Row, Col, Table, Form } from 'react-bootstrap';
import Pagination from "react-js-pagination";

const refreshTime = process.env.NEXT_PUBLIC_STATISTICS_REFRESH_TIME

function Winners({ reloadRanking, setReloadRanking }) {
    const [loading, setLoading] = useState(false)
    const [transactions, setTransactions] = useState([])
    const [searchWinners, setSearchWinners] = useState({
        search: '',
        page: 1
    })

    useEffect(() => {
        fetchWinners(searchWinners)
    }, [reloadRanking, searchWinners])


    const fetchWinners = ({ search, page }) => {
        setLoading(true)
        axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}getwinners?page=${page}&search=${search}`).then(({ data }) => {
            setLoading(false)
            setTransactions(data)
        })
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setReloadRanking(count => count += 1)
        }, (1000 * 60 * refreshTime));

        return () => {
            clearInterval(timer)
        }
    })

    return (
        <>
            <Row id="winner">
                <Col className='d-flex flex-column flex-sm-row align-items-center justify-content-between col'>
                    <div className='d-flex pb-3'>
                        <Image src='/images/title-icon.svg' alt="" width={25} height={7} priority={true} />
                        <h4 className='m-0 ps-2'>Winners</h4>
                    </div>
                    <div className='pb-3'>
                        <Form.Control
                            name='nickname'
                            style={{ backgroundColor: '#000E0D', color: '#ccc' }}
                            autoComplete='off'
                            type="text"
                            onInput={e => setSearchWinners({ search: e.target.value, page: 1 })}
                            placeholder="Search..." />
                    </div>
                </Col>
            </Row>
            <Row className='pb-5'>
                <Col className='position-relative'>
                    <Table responsive striped bordered hover size='md' variant='dark'>
                        <thead>
                            <tr className='text-center'>
                                <th>Winner Withdraw TXID</th>
                                <th>Participate Deposit TXID</th>
                                <th>Participate Wallet</th>
                                <th>Nickname</th>
                                <th>Participate Fee</th>
                                <th>Winner Amount</th>
                                <th>Date of Lottery</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions?.data?.map((transaction, index) => (
                                <tr key={index} className='text-center'>
                                    <td><a target='_blank' rel="noreferrer" className='link-light text-decoration-none' href={`${process.env.NEXT_PUBLIC_TRONSCAN_URL_INFO}${transaction.txid_win_send}`}>{transaction.txid_win_send}</a></td>
                                    <td><a target='_blank' rel="noreferrer" className='link-light text-decoration-none' href={`${process.env.NEXT_PUBLIC_TRONSCAN_URL_INFO}${transaction.txid_participate}`}>{transaction.txid_participate}</a></td>
                                    <td>{transaction.wallet}</td>
                                    <td>{transaction.nickname}</td>
                                    <td>${parseInt(transaction.fee_participate).toLocaleString()}</td>
                                    <td>${parseInt(transaction.fee_win).toLocaleString()}</td>
                                    <td>{transaction.d} {transaction.t}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className='d-flex justify-content-center justify-content-lg-end  mt-2'>
                        <Pagination
                            activePage={transactions?.current_page ? transactions?.current_page : 0}
                            itemsCountPerPage={transactions?.per_page ? transactions?.per_page : 0}
                            totalItemsCount={transactions?.total ? transactions?.total : 0}
                            onChange={(pageNumber) => {
                                setSearchWinners(old => ({ ...old, page: pageNumber }))
                            }}
                            pageRangeDisplayed={8}
                            itemClass="page-item"
                            linkClass="page-link"
                            firstPageText="First"
                            lastPageText="Last"
                        />
                    </div>
                    {loading ? (
                        <div className='position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center' style={{ background: '#000e0dd1', borderRadius: '4px', zIndex: '3' }}>
                            <div style={{ width: '64px' }} className="loading">
                                <Image src='/images/logo192.png' alt="" width='100%' height="100%" priority={true} />
                            </div>
                        </div>
                    ) : ''}
                </Col>
            </Row>
        </>
    )
}

export default Winners