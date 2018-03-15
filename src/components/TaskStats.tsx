import * as React from 'react';
import { Row, Col } from 'react-bootstrap';
import { TaskJson } from '../Interface';

export interface Props {
    data: Array<TaskJson>;
}

export interface State {
    data: Array<TaskJson>;
}

export default class TaskStats extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            data: this.props.data,
        };
    }

    getCompletedCount = (data: Array<TaskJson>, completed: boolean) => {
        let count = 0;
        data.forEach((element) => {
           if (element.completed === completed) {
               count++;
           }
        });
        return count;
    }

    render() {
        return (
            <Row>
                <Col xs={3} xsOffset={1}>
                    Completed: {this.getCompletedCount(this.props.data, true)}
                </Col>
                <Col xs={3}>
                    Pending: {this.getCompletedCount(this.props.data, false)}
                </Col>
                <Col xs={3}>
                    Total: {this.props.data.length}
                </Col>
            </Row>
        );
    }
}
