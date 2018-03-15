import * as React from 'react';
const { SortableContainer, SortableElement } =  require('react-sortable-hoc');
import TasksItem from './TasksItem';
import AddTaskOption from './AddTaskOption';
import { TaskJson } from '../Interface';

const SortableItem = SortableElement(({value}: {value: HTMLElement}) => {
    return (
        <li style={{listStyle: 'none'}}>
            {value}
        </li>
    );
});

const SortableList = SortableContainer(({items}: {items: Array<HTMLElement>}) => {
    return (
        <ul style={{padding: 0}}>
            {items.map((value: HTMLElement, index: number) => (
                <SortableItem key={`item-${index}`} index={index} value={value} />
            ))}
        </ul>
    );
});

export interface Props {
    data: Array<TaskJson>;
    openAddTaskModal: Function;
    changeCompletedStatus: Function;
    editTask: Function;
    removeTask: Function;
    onSortEnd: Function;
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
                    startTime={element.startTime}
                    endTime={element.endTime}
                    editTask={
                        (
                            name: string,
                            description: string,
                            startTime: Date,
                            endTime: Date
                        ) => this.props.editTask(element.id, name, description, element.completed, startTime, endTime)
                    }
                    removeTask={() => this.props.removeTask(element.id)}
                />
            );
        });
        return (
            <div>
                <AddTaskOption addTask={() => this.props.openAddTaskModal()}/>
                <SortableList
                    items={taskItemList}
                    useDragHandle={true}
                    lockAxis={'y'}
                    onSortEnd={this.props.onSortEnd}
                />
            </div>
        );
    }
}
