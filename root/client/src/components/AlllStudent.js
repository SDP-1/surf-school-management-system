import axios from 'axios';
import React, { useState, useEffect } from 'react'


function AllStudent(params) {

    const [students,setStudents] = useState([]);

    useEffect(() => {
        function getStudent(){
            axios.get('http://localhost:5000/student/')
             .then((res)=>{
                 setStudents(res.data);
             }).catch((err)=>{
                console.log(err);
             })
        }
        getStudent();
    },[])

    return(
        <div>
            <h1>All student</h1>

            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Age</th>
                    <th scope="col">Gender</th>
                    </tr>
                </thead>

                <tbody>
                    {students.map((student, index) => (
                        <tr key={student._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.gender}</td>
                        </tr>
                    ))}
                </tbody>

            </table>

        </div>
    )
}

export default  AllStudent;