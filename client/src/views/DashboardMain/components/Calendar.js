import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './AssignmentCalendar.css';


function AssignmentCalendar() {
    const [assignments, setAssignments] = useState([]);
    const [date, setDate] = useState(new Date());
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const userName = sessionStorage.getItem('UserName');
      fetch(`http://localhost:8000/Course/getAssignmentsByUsername/${userName}`)
        .then((response) => response.json())
        .then((data) => {
          setAssignments(data); 
          setLoading(false); 
        })
        .catch((error) => {
          console.log(error);
          setLoading(false); 
        });
    }, []); 
  
   
    const getAssignmentsForDate = (selectedDate) => {
        return assignments.filter(
          (assignment) => new Date(assignment.deadline).toDateString() === selectedDate.toDateString()
        );
      };

      
    const matchingAssignmentsForDate = getAssignmentsForDate(date);

    return (
      <div className="calendar-container">
        {loading ? (
          <div>Loading assignments...</div>
        ) : (
          <>
           <Calendar
        onChange={setDate}
        value={date}
        tileClassName={({ date, view }) => {
          if (date.toDateString() === new Date().toDateString()) {
            return 'today';
          }
        }}
        tileContent={({ date, view }) => {
          const matchingAssignments = getAssignmentsForDate(date);
          return (
            <div>
              {matchingAssignments.map((a) => (
                <div key={a._id} className="assignment-title">
                  {a.assignmentName}
                </div>
              ))}
            </div>
          );
        }}
      />
      <div className="agenda-section">
        <h2>Agenda for {date.toDateString()}</h2>
        <ul>
          {matchingAssignmentsForDate.length > 0 ? (
            matchingAssignmentsForDate.map((a) => (
              <li key={a._id}>
                <strong>{a.assignmentName}</strong> - {a.assignmentContentDisplayed}
              </li>
            ))
          ) : (
            <li>No assignments for this day.</li>
          )}
        </ul>
      </div>
          </>
        )}
      </div>
    );
  }
  
  export default AssignmentCalendar;
  