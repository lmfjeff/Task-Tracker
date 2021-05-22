import React, { useState, useCallback, useEffect } from 'react'
import {
    Modal,
    ModalBody,
    ModalTitle,
    Button,
    Form
} from 'react-bootstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { deleteAccount } from '../actions/profileActions'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'

const DeleteModal = ({ deleteAccount,isAuthenticated }) => {

    const [modal, setModal] = useState(false)

    const handleToggle = useCallback(() => {
        setModal(!modal);
    }, [modal]);

    const OnSubmit = (e) => {
        e.preventDefault()

        deleteAccount()
        handleToggle()
    }

    return (
        <>
            {isAuthenticated && 
            <Button 
                variant='danger'
                onClick={handleToggle}>
                Delete Account
            </Button>}

            <Modal show={modal} onHide={handleToggle}>
                <ModalHeader closeButton>
                    <ModalTitle>Confirm Delete Account?</ModalTitle>
                </ModalHeader>

                <ModalBody>
                    <Form onSubmit={OnSubmit}>
                        <Button type="submit">
                            Yes
                        </Button>
                    </Form>
                </ModalBody>

            </Modal>

        </>
    )
}

DeleteModal.propTypes = {
    deleteAccount: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.profile.isAuthenticated,
})

export default connect(mapStateToProps, { deleteAccount })(DeleteModal)

