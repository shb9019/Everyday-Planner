import * as React from 'react';
import { ListGroupItem, Row, Col, Button, FormControl } from 'react-bootstrap';
import '../css/TasksItem.css';
import FontAwesome from 'react-fontawesome';

export interface Props {
    id: number;
    name: string;
    description: string;
    completed: boolean;
    startTime?: Date;
    endTime?: Date;
    changeCompletedStatus: Function;
    removeTask: Function;
}

export interface State {
    toggle: boolean;
    edit: boolean;
}

export default class TasksLists extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            toggle: false,
            edit: false
        };
    }

    toggleEditStatus = (edit: boolean) => {
        this.setState({
            edit: edit
        });
    }

    render() {
        if (!this.state.edit) {
            return (
                <ListGroupItem className="list-group-item">
                    <Row
                        onClick={() => {
                            this.setState({toggle: !this.state.toggle});
                        }}
                    >
                        <Col xs={2} md={2} lg={2}>
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
                </ListGroupItem>
            );
        } else {
            return (
                <ListGroupItem className="list-group-item">
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
                        <Col xs={7} md={7} lg={7}>
                            <FormControl
                                type="text"
                                placeholder="Task Name"
                            />
                        </Col>
                        <Col xs={2} md={2} lg={2}>
                            <FontAwesome
                                className="fa fa-save delete-icon"
                                onClick={(e) => {
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
                </ListGroupItem>
            );
        }
    }
}
