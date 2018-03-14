export interface DateTime {
    date: string;
    hour: number;
    minute: number;
}

export interface TaskJson {
    id: number;
    name: string;
    description: string;
    completed: boolean;
    startTime: DateTime;
    endTime: DateTime;
}
