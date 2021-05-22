import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Button, ListGroup } from 'react-bootstrap'
import { getProfile } from '../actions/profileActions'
import PropTypes from 'prop-types'
import TaskItem from './TaskItem'
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'

const TaskList = ({ getProfile, profile }) => {

    useEffect(() => {
        getProfile();
    }, [getProfile])

    const [sort, setSort] = useState('day-descending')

    let taskList

    const handleSortByDay = () => {
        if (sort !== 'day-ascending') {
            setSort('day-ascending')
        } else if (sort !== 'day-descending') {
            setSort('day-descending')
        }
    }

    const handleSortByReminder = () => {
        if (sort !== 'reminder-ascending') {
            setSort('reminder-ascending')
        } else if (sort !== 'reminder-descending') {
            setSort('reminder-descending')
        }
    }

    const sortedTask = (task) => {
        let taskArray = []
        task.map((task) => taskArray.push(task))

        if (sort === 'day-descending') {
            return taskArray.sort((a, b) => b.date - a.date)
        } else if (sort === 'day-ascending') {
            return taskArray.sort((a, b) => a.date - b.date)
        } else if (sort === 'reminder-descending') {
            return taskArray.sort((a, b) => b.reminder - a.reminder)
        } else if (sort === 'reminder-ascending') {
            return taskArray.sort((a, b) => a.reminder - b.reminder)
        } else {
            console.log('sort failed, return empty task array')
            return []
        }
    }

    if (profile !== null) {
        const { task } = profile

        taskList = (
            <div >
                <div style={{ display: 'flex' }}>
                    <h2>Welcome! {profile.name} </h2>

                    <div className='ml-auto'>
                        <Button variant='secondary' onClick={handleSortByReminder}>By Reminder</Button>
                        {sort === 'reminder-ascending' &&  <FaSortUp />}
                        {sort === 'reminder-descending' && <FaSortDown />}
                        {sort !== 'reminder-ascending' && sort !== 'reminder-descending' && <FaSort />}
                        <Button variant='secondary' onClick={handleSortByDay} className='ml-5'>By Date</Button>
                        {sort === 'day-ascending' &&  <FaSortUp />}
                        {sort === 'day-descending' && <FaSortDown />}
                        {sort !== 'day-ascending' && sort !== 'day-descending' && <FaSort />}
                    </div>
                </div>

                <h3>{task.length === 0 ? "No Task to show" : ""} </h3>

                <ListGroup >
                    {task &&
                        sortedTask(task).map(
                            (task) => (
                                <TaskItem task={task} key={task._id} />
                            )
                        )
                    }
                </ListGroup>
            </div>
        )
    } else {
        taskList = (
            <div className='container'>
                <h2>Please Login</h2>
            </div>
        )
    }

    return (
        taskList
    )
}

TaskList.propTypes = {
    getProfile: PropTypes.func.isRequired,
    profile: PropTypes.object
}

const mapStateToProps = (state) => ({
    profile: state.profile.profile
})

export default connect(mapStateToProps, { getProfile })(TaskList)
