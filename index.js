// Your code here
function createEmployeeRecord(employee){
    const record = {
        firstName: employee[0], 
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents : [], 
        timeOutEvents: [],
    };

    return record;
}

function createEmployeeRecords(employees){
    const empArray = [];

    employees.forEach(e => {
        empArray.push(createEmployeeRecord(e));
    });

    return empArray;
}

function createTimeInEvent(employee, timeIn){
    const tEvent = {
        type: "TimeIn",
        hour: parseInt( timeIn.slice(10)),
        date: timeIn.slice(0,10),
    }
    employee.timeInEvents.push(tEvent);
    return employee;
}

function createTimeOutEvent(employee, timeOut){
    const tEvent = {
        type: "TimeOut",
        hour: parseInt( timeOut.slice(10)),
        date: timeOut.slice(0,10),
    }
    employee.timeOutEvents.push(tEvent);
    return employee;
}

function hoursWorkedOnDate(employee, d)
{
   
    const tIn = employee.timeInEvents.find(({ date }) => date === d);
    const tOut = employee.timeOutEvents.find(({ date }) => date === d);

    return (tOut.hour - tIn.hour) / 100;
    
/*
    let hours = 0;
    for (let i = 0; i < employee.timeInEvents.length; i++)
    {
        if (employee.timeInEvents[i].date == d){
            hours += employee.timeOutEvents[i].hour - employee.timeInEvents[i].hour;
        }
    }


    return hours / 100;
  */  
}

function wagesEarnedOnDate(employee, d){
    return hoursWorkedOnDate(employee, d) * employee.payPerHour;
}

function allWagesFor(employee){
    let wage = 0;
    employee.timeInEvents.forEach(d => {
        wage += wagesEarnedOnDate(employee, d.date);
    });

    return wage;
}

function calculatePayroll(employees){
    let payroll = 0;
    employees.forEach(e => {
        payroll += allWagesFor(e);
    });

    return payroll;
}