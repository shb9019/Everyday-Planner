import * as React from 'react';
import { ListGroup } from 'react-bootstrap';
import TasksItem from './TasksItem';
import AddTaskOption from './AddTaskOption';
import { DateTime } from '../Interface';
import DATA from '../data.js';

export interface Props {
    openAddTaskModal: Function;
}

export interface TaskJson {
    id: number;
    name: string;
    description: string;
    completed: boolean;
    startTime: DateTime;
    endTime: DateTime;
}

export interface State {
    readonly data: Array<TaskJson>;
    readonly addTaskModalActive: boolean;
}

export default class TasksLists extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            data: DATA,
            addTaskModalActive: false
        };
    }

    changeCompletedStatus = (id: number, completed: boolean) => {
        let data = this.state.data;
        data[id - 1].completed = completed;
        this.setState({
            data: data
        });
    }

    render() {
        let taskItemList = this.state.data.map((element, index) => {
            return  (
                <TasksItem
                    key={index}
                    id={element.id}
                    name={element.name}
                    description={element.description}
                    completed={element.completed}
                    changeCompletedStatus={(completed: boolean) => this.changeCompletedStatus(element.id, completed)}
                />
            );
        });
        return (
            <div>
                <AddTaskOption addTask={() => this.props.openAddTaskModal()}/>
                <ListGroup>
                    {taskItemList}
                </ListGroup>
            </div>
        );
    }
}
