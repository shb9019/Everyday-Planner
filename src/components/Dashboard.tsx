import * as React from 'react';
import SplitPane from 'react-split-pane';
import TasksList from './TasksList';
import AddTaskModal from './AddTaskModal';
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
                            removeTask={(id: number) => this.removeTask(id)}
                        />
                    </div>
                    <div/>
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
