import * as React from 'react';
import { ListGroupItem, Row, Col, Button } from 'react-bootstrap';
import '../css/TasksItem.css';
import { DateTime } from '../Interface';
import FontAwesome from 'react-fontawesome';

export interface Props {
    id: number;
    name: string;
    description: string;
    completed: boolean;
    startTime?: DateTime;
    endTime?: DateTime;
    changeCompletedStatus: Function;
}

export interface State {
    toggle: boolean;
}

export default class TasksLists extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
          toggle: false
        };
    }

    render() {
        return (
            <ListGroupItem>
                <Row
                    onClick={() => {this.setState({toggle: !this.state.toggle}); }}
                >
                    <Col xs={2} md={2} lg={2}>
                        <Button
                            className="toggle-status-button"
                            bsStyle="link"
                            onClick={() => this.props.changeCompletedStatus(!this.props.completed)}
                        >
                            {this.props.completed
                                ? <FontAwesome className="fa fa-times"/>
                                : <FontAwesome className="fa fa-check"/>
                            }
                        </Button>
                    </Col>
                    <Col xs={10} md={10} lg={10}>
                        <h4>{this.props.name}</h4>
                    </Col>
                </Row>
                {this.state.toggle
                    ? <Row className="top-buffer">
                        <Col xs={8} xsOffset={2} className={'text-center'}>
                            {this.props.description}
                        </Col>
                    </Row>
                    : null}
            </ListGroupItem>
        );
    }
}
