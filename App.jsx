import React, { useState, useEffect } from 'react';
import { example_backend } from 'declarations/example_backend';
import './index.scss';

function App() {
  const [students, setStudents] = useState([]);
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [newStudent, setNewStudent] = useState({ fname: '', lname: '', mail: '' });

  const fetchStudents = async () => {
    try {
      const studentsList = await example_backend.getStudents();//for getting students
      console.log("Fetched students:", studentsList);
      setStudents(studentsList);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };
  const handleAddStudent = async (event) => {
    event.preventDefault();
    console.log("Submitting student:", newStudent);

    try {//to add student
      await example_backend.addStudent(newStudent.fname, newStudent.lname, newStudent.mail);
      console.log("Student added successfully");
      setNewStudent({ fname: '', lname: '', mail: '' });
      setShowAddStudentForm(false);
      fetchStudents(); 
    } catch (error) {
      console.error("Failed to add student:", error);
    }
  };

  const handleFetchStudents = () => {
    fetchStudents();
    setShowAddStudentForm(false); 
  };
  return (
    <main>
      <h1>STUDENTS FORM</h1>
      
      <>
          <button onClick={() => setShowAddStudentForm(true)}>Record new Student</button>
          
          <button onClick={handleFetchStudents}>Retrieve Students</button>
          <h2>Student List</h2>
          <ul>
            {students.map((student, index) => (
              <li key={index}>
                {student.fname} {student.lname} - {student.mail}
              </li>
            ))}
          </ul>
          {showAddStudentForm && (
            <form onSubmit={handleAddStudent}>
              <label>
                fname:
                <input
                  type="text"
                  value={newStudent.fname}
                  onChange={(e) => setNewStudent({ ...newStudent, fname: e.target.value })}
                  required
                />
</label>
              <label>
                lname:
                <input
                  type="text"
                  value={newStudent.lname}
                  onChange={(e) => setNewStudent({ ...newStudent, lname: e.target.value })}
                  required
                />
              </label>
              <label>
                mail:
                <input
                  type="email"
                  value={newStudent.mail}
                  onChange={(e) => setNewStudent({ ...newStudent, mail: e.target.value })}
                  required
                />
              </label>
              <button type="submit">Save Student</button>
            </form>
          )}
        </>
      
    </main>
  );
}

export default App;