import * as React from 'react';
import SplitPane from 'react-split-pane';
import TasksList from './TasksList';
import '../css/Dashboard.css';

export default class Dashboard extends React.Component {
    render() {
        return (
            <SplitPane split="vertical" minSize={300} defaultSize={500}>
                <div><TasksList/></div>
                <div/>
            </SplitPane>
        );
    }
}
