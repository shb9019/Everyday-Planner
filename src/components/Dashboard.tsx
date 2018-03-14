import * as React from 'react';
import SplitPane from 'react-split-pane';
import TasksList from './TasksList';
import AddTaskModal from './AddTaskModal';
import '../css/Dashboard.css';

export interface State {
    addTaskModalActive: boolean;
}

export interface Props {}

export default class Dashboard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            addTaskModalActive: false
        };
    }

    toggleAddTaskModalActive = (active: boolean) => {
        this.setState({
           addTaskModalActive: active
        });
    }

    render() {
        return (
            <div>
                <SplitPane split="vertical" minSize={300} defaultSize={500}>
                    <div>
                        <TasksList openAddTaskModal={() => this.toggleAddTaskModalActive(true)}/>
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
