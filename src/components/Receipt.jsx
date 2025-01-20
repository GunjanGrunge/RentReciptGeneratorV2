import { Card } from 'react-bootstrap';

const Receipt = ({ receipt }) => {
  return (
    <Card className="receipt mb-3">
      <Card.Body>
        <h3 className="text-center mb-3">RENT RECEIPT</h3>
        <p className="receipt-number">Receipt No: {receipt.id}</p>
        <div className="receipt-content">
          <p className="receipt-date">Date: {receipt.date}</p>
          <p className="receipt-text">
            Received sum of Rs. {receipt.amount}/- from <strong>{receipt.tenant}</strong>{' '}
            towards the rent of property located at <strong>{receipt.address}</strong> for
            the month of <strong>{receipt.month}</strong>.
          </p>
          <p className="receipt-landlord">Landlord Name: {receipt.landlord}</p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Receipt;
