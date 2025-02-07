import React, { useState, useEffect } from "react";
import { Form, Modal, Button } from "react-bootstrap";

function ModalPopup({ status, close, modify, setModify, cellData }) {
  const [formData, setFormData] = useState({
    name: "",
    emailId: "",
    location: "",
    phoneNo: "",
    qualification: "",
  });

  useEffect(() => {
    setFormData(cellData || {});
  }, [cellData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const saveChanges = () => {
    const method = formData.id ? "PUT" : "POST";
    const url = formData.id
      ? `https://655f2e8a879575426b44c20a.mockapi.io/student_data_crud_app/studentsData/${formData.id}`
      : `https://655f2e8a879575426b44c20a.mockapi.io/student_data_crud_app/studentsData`;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        alert(formData.id ? "Updated Successfully!" : "Added Successfully!");
        setModify(!modify); // Refresh table
        close(); // Close modal
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <Modal show={status} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{formData.id ? "Edit Student" : "Add Student"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {["name", "emailId", "location", "qualification", "phoneNo"].map((field) => (
            <Form.Group className="mb-3" key={field}>
              <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
              <Form.Control
                type={field === "emailId" ? "email" : "text"}
                name={field}
                placeholder={`Enter ${field}`}
                value={formData[field] || ""}
                onChange={handleChange}
              />
            </Form.Group>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
        <Button variant="primary" onClick={saveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalPopup;
