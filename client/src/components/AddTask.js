import { useState } from 'react'
import { addTask } from '../actions/profileActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    Button,
    Form,
    FormGroup,
    FormLabel,
    FormControl,
    FormCheck,
} from 'react-bootstrap'

const AddTask = ({ addTask, profile }) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if (!text) {
            alert('Please add a task')
            return
        }

        // onAdd({text, day, reminder})
        const taskToAdd = {
            // 'id': profile.id,
            'task': {
                'text': text,
                'day': day,
                'reminder': reminder,
                'date': Date.now()
            }
        }

        addTask(taskToAdd)

        setText('')
        setDay('')
        setReminder(false)
    }
    
    if (profile !== null) {
        return (
            <Form onSubmit={onSubmit} className='border border-info rounded p-3 mb-5'>
                <FormGroup controlId="name">
                    <FormLabel>Task</FormLabel>
                    <FormControl
                        type="text"
                        value={text}
                        placeholder="Add Task"
                        onChange={(e) => setText(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="daytime">
                    <FormLabel>Day & Time</FormLabel>
                    <FormControl
                        type="text"
                        value={day}
                        placeholder="Add Day & Time"
                        onChange={(e) => setDay(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="reminder">
                    <FormCheck
                        type="checkbox"
                        checked={reminder}
                        label="Set Reminder"
                        onChange={(e) => setReminder(e.currentTarget.checked)}
                    />
                </FormGroup>
                <Button type="submit">
                    Save Task
                        </Button>
            </Form>
        )
    } else {
        return (
            <h2>Please Login to add task</h2>
        )
    }

}

AddTask.propTypes = {
    addTask: PropTypes.func.isRequired,
    profile: PropTypes.object
}

const mapStateToProps = (state) => ({
    profile: state.profile.profile
})

export default connect(mapStateToProps, { addTask })(AddTask)
