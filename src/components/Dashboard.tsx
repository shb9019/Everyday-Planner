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

    toggleAddTaskModalActive = (active: boolean) => {
        this.setState({
           addTaskModalActive: active
        });
    }

    changeTaskCompletedStatus = (id: number, completed: boolean) => {
        let data = this.state.data;
        data[id - 1].completed = completed;
        this.setState({
            data: data
        });
    }

    // createTask = (name: string, description: string, startTime: Date, endTime: Date) => {}

    render() {
        return (
            <div>
                <SplitPane split="vertical" minSize={300} defaultSize={500}>
                    <div>
                        <TasksList
                            data={this.state.data}
                            openAddTaskModal={() => this.toggleAddTaskModalActive(true)}
                            changeCompletedStatus={
                                (id: number, completed: boolean) => this.changeTaskCompletedStatus(id, completed)
                            }
                        />
                    </div>
                    <div/>
                </SplitPane>
                {this.state.addTaskModalActive
                    ? <AddTaskModal closeAddTaskModal={() => this.toggleAddTaskModalActive(false)}/>
                    : null
                }
            </div>
        );
    }
}
