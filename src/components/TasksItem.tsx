import * as React from 'react';
import { Row, Col, Button, FormControl } from 'react-bootstrap';
const { SortableHandle } = require('react-sortable-hoc');
import '../css/TasksItem.css';
import FontAwesome from 'react-fontawesome';

const DragHandle = SortableHandle(() => <span className={'drag-handle'}>::</span>);

export interface Props {
    id: number;
    name: string;
    description: string;
    completed: boolean;
    startTime: Date;
    endTime: Date;
    changeCompletedStatus: Function;
    editTask: Function;
    removeTask: Function;
}

export interface State {
    toggle: boolean;
    edit: boolean;
    name: string;
    description: string;
    startTime: Date;
    endTime: Date;
}

export default class TasksItem extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            toggle: false,
            edit: false,
            name: this.props.name,
            description: this.props.description,
            startTime: this.props.startTime,
            endTime: this.props.endTime
        };
    }

    toggleEditStatus = (edit: boolean) => {
        this.setState({
            edit: edit
        });
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setState({
            toggle: false,
            edit: false,
            name: nextProps.name,
            description: nextProps.description,
            startTime: nextProps.startTime,
            endTime: nextProps.endTime
        });
    }

    render() {
        if (!this.state.edit) {
            return (
                <div
                    className="list-group-item"
                    style={this.props.completed ? {backgroundColor: '#98FB98'} : {backgroundColor: '#FA8072'}}
                >
                    <Row
                        onClick={() => {
                            this.setState({toggle: !this.state.toggle});
                        }}
                    >
                        <Col xs={1} md={1} lg={1}>
                            <DragHandle/>
                        </Col>
                        <Col xs={1} md={1} lg={1}>
                            <Button
                                className="toggle-status-button"
                                bsStyle="link"
                                onClick={(e) => {
                                    this.props.changeCompletedStatus(!this.props.completed);
                                    e.stopPropagation();
                                }}
                            >
                                {this.props.completed
                                    ? <FontAwesome className="fa fa-times"/>
                                    : <FontAwesome className="fa fa-check"/>
                                }
                            </Button>
                        </Col>
                        <Col xs={7} md={7} lg={7}>
                            <h4>{this.props.name}</h4>
                        </Col>
                        <Col xs={1} md={1} lg={1}>
                            <FontAwesome
                                className="fa fa-pencil delete-icon"
                                onClick={(e) => {
                                    this.toggleEditStatus(true);
                                    e.stopPropagation();
                                }}
                            />
                        </Col>
                        <Col xs={2} md={2} lg={2}>
                            <FontAwesome
                                className="fa fa-trash delete-icon"
                                onClick={(e) => {
                                    this.props.removeTask();
                                    e.stopPropagation();
                                }}
                            />
                        </Col>
                    </Row>
                    {this.state.toggle
                        ? <Row className="task-description">
                            <Col xs={8} xsOffset={2} className={'text-center'}>
                                {this.props.description}
                            </Col>
                        </Row>
                        : null}
                </div>
            );
        } else {
            return (
                <div className="list-group-item">
                    <Row>
                        <Col xs={2} md={2} lg={2}>
                            <Button
                                className="toggle-status-button"
                                bsStyle="link"
                                onClick={() => this.toggleEditStatus(false)}
                            >
                                <FontAwesome className="fa fa-times"/>
                            </Button>
                        </Col>
                        <Col xs={8} md={8} lg={8}>
                            <FormControl
                                type="text"
                                value={this.state.name}
                                onChange={(e) => this.setState({name: (e.target as HTMLInputElement).value })}
                                className={'edit-name-field'}
                                placeholder="Task Name"
                            />
                        </Col>
                        <Col xs={2} md={2} lg={2}>
                            <FontAwesome
                                className="fa fa-save delete-icon"
                                onClick={(e) => {
                                    this.props.editTask(
                                        this.state.name,
                                        this.state.description,
                                        this.state.startTime,
                                        this.state.endTime
                                    );
                                    this.toggleEditStatus(false);
                                    e.stopPropagation();
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className="task-description">
                        <Col xs={8} xsOffset={2} className={'text-center'}>
                            <FormControl
                                componentClass="textarea"
                                value={this.state.description}
                                onChange={(e) => this.setState({description: (e.target as HTMLInputElement).value })}
                                rows={5}
                                placeholder="Describe your task here"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3} xsOffset={1}>
                            <h5>Start Time</h5>
                        </Col>
                        <Col xs={6} className={'text-center'}>
                            <FormControl
                                type="datetime-local"
                                value={this.state.startTime.toISOString().slice(0, -1)}
                                onChange={
                                    (e) =>
                                        this.setState(
                                            { startTime: new Date((e.target as HTMLInputElement).value + 'Z') }
                                        )
                                }
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3} xsOffset={1}>
                            <h5>End Time</h5>
                        </Col>
                        <Col xs={6} className={'text-center'}>
                            <FormControl
                                type="datetime-local"
                                value={this.state.endTime.toISOString().slice(0, -1)}
                                onChange={
                                    (e) =>
                                        this.setState(
                                            { endTime: new Date((e.target as HTMLInputElement).value + 'Z') }
                                        )
                                }
                            />
                        </Col>
                    </Row>
                </div>
            );
        }
    }
}
