import React, { useState, useCallback, useEffect } from 'react'
import {
    Button,
    Modal,
    ModalTitle,
    ModalBody,
    Form,
    FormGroup,
    Alert,
    FormLabel,
    FormControl,
} from 'react-bootstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../actions/profileActions'
import { clearError } from '../actions/errorAction'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'

const LoginModal = ({ login, isAuthenticated, error, clearError }) => {

    const [modal, setModal] = useState(false)
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState(null)

    const handleToggle = useCallback(() => {
        clearError()
        setModal(!modal);
        setName('')
        setPassword('')
    }, [modal,clearError]);
    const handleChangeName = (e) => setName(e.target.value)
    const handleChangePassword = (e) => setPassword(e.target.value)

    useEffect(() => {
        if (error.id === 'LOGIN_FAIL') {
            setMsg(error.msg.msg)
        } else {
            setMsg(null);
        }

        if(modal){
            if(isAuthenticated){
                handleToggle()
            }
        }
    }, [error,modal,isAuthenticated,handleToggle])

    const OnSubmit = (e) => {
        e.preventDefault()

        const loginData = {
            name,
            password,
        }

        login(loginData)

    }

    return (
        <>
            <Button onClick={handleToggle}>
                Login
            </Button>

            <Modal show={modal} onHide={handleToggle}>
                <ModalHeader closeButton>
                    <ModalTitle>Login</ModalTitle>
                </ModalHeader>

                <ModalBody>
                    <Form onSubmit={OnSubmit}>
                        <FormGroup controlId="name">
                            <FormLabel>Name</FormLabel>
                            <FormControl
                                type="text"
                                placeholder="Name"
                                onChange={handleChangeName}
                            />
                        </FormGroup>
                        <FormGroup controlId="password">
                            <FormLabel>Password</FormLabel>
                            <FormControl
                                type="password"
                                placeholder="Password"
                                onChange={handleChangePassword}
                            />
                        </FormGroup>
                        <Button type="submit">
                            Login
                        </Button>
                    </Form>
                    {msg ? <Alert variant='danger'>{msg} </Alert>: null }
                </ModalBody>

            </Modal>

        </>
    )
}

LoginModal.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearError: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.profile.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { login,clearError })(LoginModal)

