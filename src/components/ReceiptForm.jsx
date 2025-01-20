import { Form, Button, InputGroup } from 'react-bootstrap';
import { useState } from 'react';

const ReceiptForm = ({ onGenerateReceipts }) => {
  const [formData, setFormData] = useState({
    tenantName: '',
    landlordName: '',
    address: '',
    amount: '',
    startDate: '',
    endDate: '',
    paymentDay: 1
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerateReceipts(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Tenant Name</Form.Label>
        <Form.Control
          type="text"
          name="tenantName"
          value={formData.tenantName}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Landlord Name</Form.Label>
        <Form.Control
          type="text"
          name="landlordName"
          value={formData.landlordName}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Property Address</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Rent Amount</Form.Label>
        <InputGroup>
          <InputGroup.Text>₹</InputGroup.Text>
          <Form.Control
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </InputGroup>
      </Form.Group>

      <div className="date-range-group">
        <Form.Group>
          <Form.Label>Start Month</Form.Label>
          <Form.Control
            type="month"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>End Month</Form.Label>
          <Form.Control
            type="month"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </div>

      <Form.Group className="mb-4">
        <Form.Label>Payment Date of Month</Form.Label>
        <Form.Control
          type="number"
          name="paymentDay"
          min="1"
          max="31"
          value={formData.paymentDay}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button type="submit" variant="primary" className="w-100">
        Generate Receipts
      </Button>
    </Form>
  );
};

export default ReceiptForm;
