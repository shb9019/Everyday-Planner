import * as React from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import '../css/AddTaskModal.css';

export interface Props {
    closeAddTaskModal: Function;
}

export interface State {
    name: string;
    description: string;
    startTime: Date;
    endTime: Date;
}

export default class AddTaskModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            startTime: new Date(),
            endTime: new Date()
        };
    }

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
                                value={this.state.name}
                                placeholder="Task Name"
                                onChange={(e) => this.setState({ name: (e.target as HTMLTextAreaElement).value })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Description</ControlLabel>
                            <FormControl
                                componentClass="textarea"
                                rows={5}
                                value={this.state.description}
                                onChange={
                                    (e) => this.setState(
                                        { description: (e.target as HTMLTextAreaElement).value }
                                        )
                                }
                                placeholder="Describe your task here"
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Start Time</ControlLabel>
                            <FormControl
                                type="datetime-local"
                                value={this.state.startTime.toISOString().slice(0, -1)}
                                onChange={
                                    (e) => this.setState(
                                        { startTime: new Date((e.target as HTMLInputElement).value) }
                                    )
                                }
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>End Time</ControlLabel>
                            <FormControl
                                type="datetime-local"
                                value={this.state.endTime.toISOString().slice(0, -1)}
                                onChange={
                                    (e) => this.setState(
                                        { endTime: new Date((e.target as HTMLInputElement).value) }
                                    )
                                }
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
