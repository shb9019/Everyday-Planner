import * as React from 'react';
import { Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import '../css/AddTaskOption.css';

export interface Props {
    addTask: Function;
}

export interface State {}

export default class TasksLists extends React.Component<Props, State> {
    render() {
        return (
            <Row>
                <Col md={6} mdOffset={1}>
                    <p className={'tasks-title'}>Tasks</p>
                </Col>
                <Col md={4}>
                    <FontAwesome
                        className={'fa fa-plus fa-2x pull-right add-icon'}
                        onClick={() => this.props.addTask()}
                    />
                </Col>
            </Row>
        );
    }
}
