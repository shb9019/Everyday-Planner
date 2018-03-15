import * as React from 'react';
const { Chart } = require('react-google-charts');
import { TaskJson } from '../Interface';

export interface Props {
    data: Array<TaskJson>;
}
export interface State {}

export default class TasksGantt extends React.Component<Props, State> {
    render() {
        /*let tasks = this.props.data.map((element, index) => {
            return {
                id: element.id,
                name: element.name,
                start: element.startTime.toLocaleString(),
                end: element.endTime.toLocaleString(),
                progress: 20,
                custom_class: 'bar-milestone'
            };
        });*/

        return (
            <div>
                <Chart
                    chartType="Gantt"
                    columns={[
                        { id: 'Task ID', type: 'string' },
                        { id: 'Task Name', type: 'string' },
                        { id: 'Start Date', type: 'date' },
                        { id: 'End Date', type: 'date' },
                        { id: 'Duration', type: 'number' },
                        { id: 'Percent Complete', type: 'number' },
                        { id: 'Dependencies', type: 'string' },
                    ]}
                    rows={[
                        ['Research', 'Find sources',
                            new Date(2015, 0, 1), new Date(2015, 0, 5), null, 100, null],
                        ['Write', 'Write paper',
                            null, new Date(2015, 0, 9), 3 * 24 * 60 * 60 * 1000, 25, null],
                        ['Cite', 'Create bibliography',
                            null, new Date(2015, 0, 7), 24 * 60 * 60 * 1000, 20, null],
                        ['Complete', 'Hand in paper',
                            null, new Date(2015, 0, 10), 24 * 60 * 60 * 1000, 0, null],
                        ['Outline', 'Outline paper',
                            null, new Date(2015, 0, 6), 24 * 60 * 60 * 1000, 100, null],
                    ]}
                    width="100%"
                    height="100vh"
                    options="{}"
                    chartPackages={['gantt']}
                />
            </div>
        );
    }
}
