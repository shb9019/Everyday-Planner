import * as React from 'react';
import SplitPane from 'react-split-pane';
const { arrayMove } =  require('react-sortable-hoc');
import TasksList from './TasksList';
import AddTaskModal from './AddTaskModal';
import TasksGantt from './TasksGantt';
import { TaskJson } from '../Interface';
import DATA from '../data.js';
import '../css/Dashboard.css';

export interface State {
    data: Array<TaskJson>;
    addTaskModalActive: boolean;
}

export interface Props {}

export default class Dashboard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            data: DATA,
            addTaskModalActive: false
        };
    }

    componentDidMount() {
        if (localStorage.getItem('data')) {
            this.setState({
                data: JSON.parse(localStorage.getItem('data') as string)
            });
        }
    }

    componentDidUpdate() {
        localStorage.setItem('data', JSON.stringify(this.state.data));
    }

    getTaskIndex = (id: number) => {
        return this.state.data.map((element) => element.id).indexOf(id);
    }

    toggleAddTaskModalActive = (active: boolean) => {
        this.setState({
            addTaskModalActive: active
        });
    }

    changeTaskCompletedStatus = (id: number, completed: boolean) => {
        let data = this.state.data;
        data[this.getTaskIndex((id))].completed = completed;
        this.setState({
            data: data
        });
    }

    onSortEnd = ({oldIndex, newIndex}: {oldIndex: Array<number>, newIndex: Array<number>}) => {
        this.setState({
            data: arrayMove(this.state.data, oldIndex, newIndex),
        });
    }

    createTask = (name: string, description: string, startTime: Date, endTime: Date) => {
        let task = {
            id: this.state.data[this.state.data.length - 1].id + 1,
            name: name,
            description: description,
            completed: false,
            startTime: startTime,
            endTime: endTime
        };
        this.setState({
           data: this.state.data.concat(task)
        });
    }

    editTask = (id: number, name: string, description: string, completed: boolean, startTime: Date, endTime: Date) => {
        let task = {
            id: id,
            name: name,
            description: description,
            completed: completed,
            startTime: startTime,
            endTime: endTime
        };

        let editIndex = this.getTaskIndex(id);
        let stateData = this.state.data;
        stateData.splice(editIndex, 1, task);
        this.setState({
            data: stateData
        });
    }

    removeTask = (id: number) => {
        let deleteIndex = this.getTaskIndex(id);
        let stateData = this.state.data;
        stateData.splice(deleteIndex, 1);
        this.setState({
           data: stateData
        });
    }

    render() {
        return (
            <div>
                <SplitPane split="vertical" minSize={375} defaultSize={500}>
                    <div>
                        <TasksList
                            data={this.state.data}
                            openAddTaskModal={() => this.toggleAddTaskModalActive(true)}
                            changeCompletedStatus={
                                (id: number, completed: boolean) => this.changeTaskCompletedStatus(id, completed)
                            }
                            onSortEnd={this.onSortEnd}
                            editTask={(
                                id: number,
                                name: string,
                                description: string,
                                completed: boolean,
                                startTime: Date,
                                endTime: Date
                            ) => this.editTask(id, name, description, completed, startTime, endTime)}
                            removeTask={(id: number) => this.removeTask(id)}
                        />
                    </div>
                    <div>
                        <TasksGantt
                            data={this.state.data}
                        />
                    </div>
                </SplitPane>
                {this.state.addTaskModalActive
                    ? <AddTaskModal
                        closeAddTaskModal={() => this.toggleAddTaskModalActive(false)}
                        createTask={(name: string, description: string, startTime: Date, endTime: Date) =>
                            this.createTask(name, description, startTime, endTime)
                        }
                    />
                    : null
                }
            </div>
        );
    }
}
