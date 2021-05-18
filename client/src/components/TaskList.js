import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Container, ListGroup } from 'react-bootstrap'
import { getProfile, deleteTask, changeTask } from '../actions/profileActions'
import PropTypes from 'prop-types'
import TaskItem from './TaskItem'

const TaskList = ({ getProfile, profile, deleteTask }) => {

    useEffect(() => {
        getProfile();
    }, [getProfile])

    const handleUpdate = (task) => {
        changeTask(task)
    }

    const handleDelete = (taskId) => {
        deleteTask(taskId)
    }

    let taskList

    if (profile !== null) {
        const { task } = profile
        taskList = (
            <Container fluid >
                <h2>{profile.name} </h2>
                <h3>{task.length === 0 ? "No Task to show" : ""} </h3>

                <ListGroup>
                    {task &&
                        task.map(
                            (task) => (
                                <TaskItem task={task} key={task._id} />
                            )
                        )
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
