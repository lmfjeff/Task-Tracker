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
import { register } from '../actions/profileActions'
import { clearError } from '../actions/errorAction'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'

const RegisterModal = ({ register, isAuthenticated, error, clearError }) => {

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
        if (error.id === 'REGISTER_FAIL') {
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

        const registerData = {
            name,
            password,
        }

        register(registerData)

    }

    return (
        <>
            <Button onClick={handleToggle}>
                Register
            </Button>

            <Modal show={modal} onHide={handleToggle}>
                <ModalHeader closeButton>
                    <ModalTitle>Register</ModalTitle>
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
                            Register
                        </Button>
                    </Form>
                    {msg ? <Alert variant='danger'>{msg} </Alert>: null }
                </ModalBody>

            </Modal>

        </>
    )
}

RegisterModal.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearError: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.profile.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { register,clearError })(RegisterModal)

