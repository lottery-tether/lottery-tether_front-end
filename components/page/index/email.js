import { Button, Col, Form, Row } from 'react-bootstrap'
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Noty from 'noty';

function Email() {
    return (
        <Formik
            initialValues={{ email: '', }}
            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .email()
                    .required(),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}sendemail`, {
                    email: values.email,
                }).then(({ data }) => {
                    resetForm();
                    setSubmitting(false)
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
            }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Row className='align-items-end'>
                        <Col md={{ span: 9 }}>
                            <Form.Group className="mb-3" controlId="NickName">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    style={{ backgroundColor: '#000E0D', color: '#ccc' }}
                                    autoComplete='off'
                                    type="email"
                                    isInvalid={!!errors.txid}
                                    placeholder="Type Your Email Address..." />
                            </Form.Group>
                        </Col>
                        <Col md={{ span: 3 }} className="mb-3">
                            <Button disabled={isSubmitting} variant="light" type="submit" size="lg">
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            )}
        </Formik>
    )
}

export default Email