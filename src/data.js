let currDate = new Date();
currDate.setSeconds(0);
currDate.setMilliseconds(0);

let data = [
    {
        id: 1,
        name: 'First Task',
        description: 'This is the First Task',
        completed: true,
        startTime: currDate,
        endTime: currDate
    },
    {
        id: 2,
        name: 'Second Task',
        description: 'This is the Second Task',
        completed: false,
        startTime: currDate,
        endTime: currDate
    },
    {
        id: 3,
        name: 'Third Task ',
        description: 'This is the Third Task',
        completed: false,
        startTime: currDate,
        endTime: currDate
    }
];

export default data;
