import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Logout from './Logout'
import RegisterModal from './RegisterModal'
import LoginModel from './LoginModel'

const Access = ({ isAuthenticated, profile }) => {


    const authFragment = (
        <Logout />
    )

    const guestFragment = (
        <>
            <RegisterModal />
            <LoginModel />
        </>
    )

    return (
        <>
            {isAuthenticated ? authFragment : guestFragment}
            {profile? <p>Welcome! {profile.name}</p>: null}
        </>
    )
}

Access.propTypes = {
    isAuthenticated: PropTypes.bool,
    profile: PropTypes.object
}

const mapStateToProps = state => ({
    isAuthenticated: state.profile.isAuthenticated,
    profile: state.profile.profile
})


export default connect(mapStateToProps, null)(Access)
