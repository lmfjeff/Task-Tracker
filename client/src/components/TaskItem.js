import React, { useEffect, useRef, useState } from 'react'
import { deleteTask, changeTask } from '../actions/profileActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ListGroupItem } from 'react-bootstrap'
import { FaTimes, FaEdit, FaCheck, FaTrash, FaBell } from 'react-icons/fa'

const TaskItem = ({ task, deleteTask, changeTask }) => {

    const [isEditing, setEditing] = useState(false)
    const [editText, setEditText] = useState("")
    const [editDay, setEditDay] = useState("")
    const { _id, text, day, reminder } = task
    const inputRef = useRef(null)

    useEffect(() => {
        if (inputRef && inputRef.current && isEditing === true){
            inputRef.current.focus()
        }
    },[inputRef,isEditing])

    const toggleReminder = () => {
        const toggledTask = {
            task: {
                ...task,
                reminder:!reminder
            }
        }
        changeTask(toggledTask)
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
        <ListGroupItem className={reminder ? 'task reminder' : ''} >
            <FaTrash
                title='Delete'
                onClick={() => handleDelete(_id)}
                size={40}
                style={{ cursor: 'pointer' }}
                className='float-right' />
            <FaBell
                title='Toggle Reminder'
                onClick={() => toggleReminder()}
                size={40}
                style={{ color: 'gold',cursor: 'pointer' }}
                className='float-right' />
            {!isEditing &&
                <FaEdit
                title='Edit'
                onClick={() => handleEditing()}
                size={40}
                style={{ color: 'DodgerBlue',cursor: 'pointer' }}
                className='float-right' />}
            
            {isEditing && <>
            <FaTimes 
                title='Cancel'
                onClick={() => setEditing(!isEditing)}
                size={40}
                style={{ color: 'red',cursor: 'pointer' }}
                className='float-right'/>
                <FaCheck
                title='Confirm'
                onClick={() => handleUpdate()}
                size={40}
                style={{ color: 'green', cursor: 'pointer' }}
                className='float-right' />
            </>}
            {isEditing ?
                (<div>
                    <h3><input
                        value={editText}
                        type='text'
                        onChange={(e) => setEditText(e.target.value)}
                        ref={inputRef} />
                    </h3>
                    <p><input
                        value={editDay}
                        type='text'
                        onChange={(e) => setEditDay(e.target.value)} />
                    </p>
                </div>
                ) : (
                    <div>
                        <h3>{text}</h3>
                        <p>{day}</p>
                    </div>

                )

            }

        </ListGroupItem>
    )
}

TaskItem.propTypes = {
    task: PropTypes.object.isRequired,
    deleteTask: PropTypes.func.isRequired,
    changeTask: PropTypes.func.isRequired,

}

export default connect(null, { deleteTask, changeTask })(TaskItem)
