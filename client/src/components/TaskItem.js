import React, { useEffect, useRef, useState } from 'react'
import { deleteTask, changeTask } from '../actions/profileActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FormControl, InputGroup, ListGroupItem } from 'react-bootstrap'
import { FaTimes, FaEdit, FaCheck, FaTrash, FaBell } from 'react-icons/fa'

const TaskItem = ({ task, deleteTask, changeTask }) => {

    const [isEditing, setEditing] = useState(false)
    const [editText, setEditText] = useState("")
    const [editDay, setEditDay] = useState("")
    const { _id, text, day, reminder } = task
    const inputRef = useRef(null)

    useEffect(() => {
        if (inputRef && inputRef.current && isEditing === true) {
            inputRef.current.focus()
        }
    }, [inputRef, isEditing])

    const toggleReminder = () => {
        const toggledTask = {
            task: {
                ...task,
                reminder: !reminder
            }
        }
        changeTask(toggledTask)
    }

    const handleOnBlur = (e) => {
        if (e.relatedTarget == null
            || (!e.relatedTarget.parentElement.classList.contains('icon-group')
                && !e.relatedTarget.classList.contains('form-control'))) {

            setEditing(false)
            console.log(e.relatedTarget)
        }
    }

    const handleUpdate = () => {

        const updatedTask = {
            task: {
                ...task,
                text: editText,
                day: editDay
            }
        }
        changeTask(updatedTask)

        setEditing(!isEditing)
    }

    const handleEditing = () => {
        setEditText(text)
        setEditDay(day)
        setEditing(!isEditing)
    }

    const handleDelete = (taskId) => {
        deleteTask(taskId)
    }


    return (
        <div style={{ display: 'flex' }}>
            <div style={{}} className={`task ${reminder ? 'reminder' : ''}`}></div>
            <ListGroupItem style={{ overflow: 'hidden',display: 'flex' }} className='flex-grow-1 ' onBlur={handleOnBlur} >
                <div style={{}} className='flex-grow-1  '>
                    {isEditing ?
                        (<div >
                            <InputGroup>
                                <FormControl
                                    size='lg'
                                    tabIndex="0"
                                    value={editText}
                                    type='text'
                                    placeholder='text'
                                    onChange={(e) => setEditText(e.target.value)}
                                    ref={inputRef}
                                />
                            </InputGroup>
                            <InputGroup>
                                <FormControl
                                    tabIndex="0"
                                    value={editDay}
                                    type='text'
                                    placeholder='Day & Time'
                                    onChange={(e) => setEditDay(e.target.value)}
                                />
                            </InputGroup>
                        </div>
                        ) : (
                            <div>
                                <h3 
                                    style={{ wordBreak:'break-word' }}>
                                    {text}
                                </h3>
                                <p
                                    style={{ wordBreak:'break-word' }}>
                                    {day}
                                </p>
                            </div>

                        )

                    }
                </div>
                <div style={{ display:'flex' }} className='icon-group ml-3'>
                    {isEditing && <>
                        <FaCheck
                            title='Confirm'
                            onClick={() => handleUpdate()}
                            size={40}
                            style={{ color: 'green', cursor: 'pointer' }}
                            tabIndex="0" />
                        <FaTimes
                            title='Cancel'
                            onClick={() => setEditing(!isEditing)}
                            size={40}
                            style={{ color: 'red', cursor: 'pointer' }}
                            tabIndex="0" />
                    </>}
                    {!isEditing &&
                        <FaEdit
                            title='Edit'
                            onClick={() => handleEditing()}
                            size={40}
                            style={{ color: 'DodgerBlue', cursor: 'pointer' }}
                            tabIndex="0" />}
                    <FaBell
                        title='Toggle Reminder'
                        onClick={() => toggleReminder()}
                        size={40}
                        style={{ color: 'gold', cursor: 'pointer' }}
                        tabIndex="0" />

                    <FaTrash
                        title='Delete'
                        onClick={() => handleDelete(_id)}
                        size={40}
                        style={{ cursor: 'pointer' }}
                        tabIndex="0" />
                </div>


            </ListGroupItem>
        </div>

    )
}

TaskItem.propTypes = {
    task: PropTypes.object.isRequired,
    deleteTask: PropTypes.func.isRequired,
    changeTask: PropTypes.func.isRequired,

}

export default connect(null, { deleteTask, changeTask })(TaskItem)
