import { useState } from 'react'
import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import ModalPopup from './Modal';
import { RiUserAddFill } from "react-icons/ri";

function App() {

  const [tableData, setTableData] = useState(null);
  const [tempData, setTempData] = useState({});
  const [update, setUpdate] = useState(true);

  //for modal 
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (data = {}) => {
    setTempData(data);
    setShow(true);
  };


  useEffect(() => {
    fetch('https://655f2e8a879575426b44c20a.mockapi.io/student_data_crud_app/studentsData', {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      // handle error
    }).then(tasks => {
      setTableData(tasks);  // API
    }).catch(error => {
      console.log(error);
    })
  }, [update])

  const handleDelete = (id) => {
    fetch(
      `https://655f2e8a879575426b44c20a.mockapi.io/student_data_crud_app/studentsData/${id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Failed to delete");
      })
      .then(() => {
        alert("Deleted Successfully...!");
        setUpdate(!update); // Refresh table
      })
      .catch((error) => {
        console.error("Error deleting:", error);
        alert("Failed to delete");
      });
  };

  return (
    <>
      <Container fluid className='p-3'>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr className='fs-2 text-center'>
              <th>S.No</th>
              <th>Name</th>
              <th>Email-Id</th>
              <th>Location</th>
              <th>Qualification</th>
              <th>PhoneNo</th>
              <th>Action <RiUserAddFill variant="success" onClick={() => handleShow({})} /> </th>
            </tr>
          </thead>
          <tbody className='fs-5 text-center'>
            {tableData && tableData.map((item, i) => (
              <tr>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.emailId}</td>
                <td>{item.location}</td>
                <td>{item.qualification}</td>
                <td>{item.phoneNo}</td>
                <td>
                  <Button variant="primary" onClick={() => handleShow(item)} className="me-2">Edit</Button>
                  <Button variant="danger" onClick={() => handleDelete(item.id)}>Delete</Button>
                </td>
              </tr>
            ))}

          </tbody>
        </Table>
      </Container>
      <ModalPopup modify={update} setModify={setUpdate} status={show} close={handleClose} cellData={tempData} updateData={setTempData} />
    </>
  )
}

export default App;