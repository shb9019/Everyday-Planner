import * as React from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import '../css/AddTaskModal.css';

export interface Props {
    closeAddTaskModal: Function;
}

export interface State {}

export default class AddTaskModal extends React.Component<Props, State> {
    render() {
        return (
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Add Task</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <FormGroup controlId="formBasicText">
                            <ControlLabel>Name</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Task Name"
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Description</ControlLabel>
                            <FormControl
                                componentClass="textarea"
                                rows={5}
                                placeholder="Describe your task here"
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Start Time</ControlLabel>
                            <FormControl
                                type="datetime-local"
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>End Time</ControlLabel>
                            <FormControl
                                type="datetime-local"
                            />
                        </FormGroup>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={() => this.props.closeAddTaskModal()}>Close</Button>
                        <Button bsStyle="primary">Create Task</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }
}
