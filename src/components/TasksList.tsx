import * as React from 'react';
import { ListGroup } from 'react-bootstrap';
import TasksItem from './TasksItem';
import AddTaskOption from './AddTaskOption';
import { TaskJson } from '../Interface';

export interface Props {
    data: Array<TaskJson>;
    openAddTaskModal: Function;
    changeCompletedStatus: Function;
    removeTask: Function;
}

export interface State {
    readonly addTaskModalActive: boolean;
}

export default class TasksLists extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            addTaskModalActive: false
        };
    }

    render() {
        let taskItemList = this.props.data.map((element, index) => {
            return  (
                <TasksItem
                    key={index}
                    id={element.id}
                    name={element.name}
                    description={element.description}
                    completed={element.completed}
                    changeCompletedStatus={
                        (completed: boolean) => this.props.changeCompletedStatus(element.id, completed)
                    }
                    removeTask={() => this.props.removeTask(element.id)}
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
