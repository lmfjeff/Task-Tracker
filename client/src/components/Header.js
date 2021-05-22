import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Logout from './Logout'
import RegisterModal from './RegisterModal'
import LoginModel from './LoginModel'
import { useLocation } from 'react-router-dom'
import Button from './Button'
import {Spinner} from 'react-bootstrap'


const Header = ({ title, onAdd, showAdd, isAuthenticated, loading }) => {
    const location = useLocation()

    const authFragment = (
        <>
            <Logout />
        </>
    )

    const guestFragment = (
        <>
            <RegisterModal />
            <LoginModel />
        </>
    )

    return (
        <div >
            <header className='header'>
                <h1>{title}</h1>

                <div className='ml-5'>
                    {isAuthenticated ? authFragment : guestFragment}
                    {loading && <Spinner animation='border' />}
                </div>


                <div className='ml-auto'>
                    {location.pathname === '/' &&
                        <Button
                            color={showAdd ? 'red' : 'green'}
                            text={showAdd ? 'Close' : 'Add'}
                            onClick={onAdd}
                        />
                    }
                </div>
            </header>
        </div>
    )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.profile.isAuthenticated,
    loading: state.profile.loading,
})

// const headingStyle = {
//     color: 'red', 
//     backgroundColor: 'black'
// }

export default connect(mapStateToProps, null)(Header)
