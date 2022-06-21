import { Row, Col, Form, Button, InputGroup, FormControl, Card } from 'react-bootstrap';
import { ClipboardFill } from 'react-bootstrap-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Noty from 'noty';

function Ticket({ setReloadRanking }) {
    return (
        <>

            <Formik
                initialValues={{ txid: '', nickname: '' }}
                validationSchema={Yup.object().shape({
                    txid: Yup.string()
                        .required()
                        .label('TXID'),
                    nickname: Yup.string().label('Nickname'),
                })}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}sendtxid`, {
                        txid: values.txid,
                        nickname: values.nickname
                    }).then(({ data }) => {
                        resetForm();
                        setSubmitting(false)
                        setReloadRanking(count => count + 1)
                        return new Noty({
                            theme: 'metroui',
                            type: 'success',
                            layout: 'bottomRight',
                            timeout: '3000',
                            text: `${data.desc} ✔️`,
                        }).show()
                    }).catch(({ response }) => {
                        if (response.status === 422) {
                            const errors = Object.keys(response.data.errors)
                            errors.map(item => {
                                return new Noty({
                                    theme: 'metroui',
                                    type: 'error',
                                    layout: 'bottomRight',
                                    timeout: '3000',
                                    text: `${response.data.errors[item][0]} 🤥`,
                                }).show()
                            })
                        } else {
                            new Noty({
                                theme: 'metroui',
                                type: 'error',
                                layout: 'bottomRight',
                                timeout: '3000',
                                message: `server_error' ${response.status} 🤥`,
                            }).show()
                        }
                        setSubmitting(false)
                    })
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    setFieldValue,
                }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Row className='pb-5'>
                            <Col>
                                <Card className='box-glass border-0'>
                                    <Card.Body>
                                        <Row className='align-items-end'>
                                            <Col lg={{ span: 7 }}>
                                                <Form.Group className="mb-3" controlId="TXID">
                                                    <InputGroup hasValidation>
                                                        <Form.Label>TXID</Form.Label>
                                                        <InputGroup>
                                                            <FormControl
                                                                name="txid"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.txid}
                                                                style={{ backgroundColor: '#000E0D', color: '#ccc' }}
                                                                autoComplete='off'
                                                                type="text"
                                                                isInvalid={!!errors.txid}
                                                                placeholder="Paste Your TXID Here..." />
                                                            <Button onClick={() => {
                                                                navigator.clipboard.readText().then(
                                                                    clipText => setFieldValue('txid', clipText)
                                                                );

                                                            }} variant="outline-info" id="button-txid" className="pb-2"><ClipboardFill /> Paste</Button>
                                                        </InputGroup>
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>
                                            <Col lg={{ span: 5 }}>
                                                <Form.Group className="mb-3" controlId="NickName">
                                                    <Form.Label>NickName <small className='text-secondary text-small'>(Optional)</small></Form.Label>
                                                    <Form.Control
                                                        name='nickname'
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.nickname}
                                                        style={{ backgroundColor: '#000E0D', color: '#ccc' }}
                                                        autoComplete='off'
                                                        type="text"
                                                        placeholder="Type Your Nickname Here..." />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.nickname}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col lg={{ span: 5 }} className='mt-3 mx-auto'>
                                                <div className="d-grid gap-2">
                                                    <Button disabled={isSubmitting} variant="outline-info" type="submit" size="lg">
                                                        {isSubmitting ? 'Submitting...' : 'Submit'}
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Formik>

        </>
    )
}

export default Ticket