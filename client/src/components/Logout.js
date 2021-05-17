import React from 'react'
import { logout } from '../actions/profileActions'
import { connect } from 'react-redux';
import {
    Button,
} from 'react-bootstrap'
import PropTypes from 'prop-types'

const Logout = ({logout}) => {

    return (
        <>
            <Button onClick={logout}>
                Logout
            </Button>

        </>
    )
}

Logout.propTypes = {
    logout: PropTypes.func.isRequired,
}

export default connect(null, {logout})(Logout)
