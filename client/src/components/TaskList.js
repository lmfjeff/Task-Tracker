import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import { getProfile, deleteTask } from '../actions/profileActions'
import PropTypes from 'prop-types'

const TaskList = ({ getProfile, profile, deleteTask }) => {

    useEffect(() => {
        getProfile();
    }, [getProfile])


    const handleDelete = (taskId) => {
        deleteTask(taskId)
    }

    let taskList

    if (profile !== null) {
        const {task} = profile
        taskList = (
            <Container>
                <h2>{profile.name} </h2>
                <h3>{task.length===0? "No Task to show": ""} </h3>

                <ListGroup>
                    {   task &&
                        task.map(({ _id, text, day, reminder }) => (
                            <ListGroupItem key={_id}>
                                <h3>
                                    {text}
                                    <Button onClick={() => handleDelete(_id)}>
                                        Cancel
                                </Button>
                                </h3>
                                <p>{day}</p>
                            </ListGroupItem>
                        ))
                    }
                </ListGroup>
            </Container>
        )
    } else {
        taskList = (
            <Container>
                <h2>Please Login</h2>
            </Container>
        )
    }

    return (
        taskList
    )
}

TaskList.propTypes = {
    getProfile: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    profile: PropTypes.object
}

const mapStateToProps = (state) => ({
    profile: state.profile.profile
})

export default connect(mapStateToProps, { getProfile, deleteTask })(TaskList)
