import React, {useState} from 'react';
import {Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody} from 'reactstrap';

const WorkoutEdit = (props) => {
    const [editDesc, setEditDesc] = useState(props.workoutToUpdate.description);
    const [editDef, setEditDef] = useState(props.workoutToUpdate.definition);
    const [editRes, setEditRes] = useState(props.workoutToUpdate.result);
    const workoutUpdate = (event, workout) => {
        event.preventDefault();
        fetch(`http://localhost:3000/log/${props.workoutToUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({log: {description: editDesc, definition: editDef, result: editRes}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.token}`
            })
        
        }).then((res) => {
            props.fetchWorkouts();
            props.updateOff();
        })
    }
    

    return(
        <Modal isOpen={true}>
            <ModalHeader>Log a Workout</ModalHeader>
            <ModalBody>
                <Form onSubmit={workoutUpdate}>
                    <FormGroup>
                        <Label htmlFor='result'>Edit result:</Label>
                        <Input name='result' value={editRes} onChange={(e) => setEditRes(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='description'>Edit description:</Label>
                        <Input name='description' value={editDesc} onChange={(e) => setEditDesc(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='definition'>Edit definition:</Label>
                        <Input name='definition' value={editDef} onChange={(e) => setEditDef(e.target.value)}>
                            <option value='Time'>Time</option>
                            <option value='Weight'>Weight</option>
                            <option value='Distance'>Distance</option>
                        </Input>
                    </FormGroup>
                    <Button type='submit'>Update the Workout</Button>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default WorkoutEdit;