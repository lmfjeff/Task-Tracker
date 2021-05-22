import React, { useState, useEffect, useCallback } from 'react'
import {
    Toast,
    ToastBody,
    ToastHeader
} from 'react-bootstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { clearError } from '../actions/errorAction'


const ErrorToast = ({ error, clearError }) => {

    const [show, setShow] = useState(false)

    useEffect(() => {
        if (error.msg.msg !== undefined) {
            setShow(true)
        }
    }, [error.msg.msg])


    // const handleClose = useCallback(() => {
    //         setShow(false)
    //         // clearError()
    //     },[clearError])


    return (
        <Toast
            onClose={() => setShow(false)}
            show={show}
            style={{ position: 'absolute', top: 0, right: 0, }}
            delay={3000} autohide>
            <ToastHeader>
                Error
            </ToastHeader>
            <ToastBody>
                {error.msg.msg}
            </ToastBody>
        </Toast>
    )
}

ErrorToast.propTypes = {
    error: PropTypes.object.isRequired,
    clearError: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    error: state.error
})

export default connect(mapStateToProps, { clearError })(ErrorToast)
