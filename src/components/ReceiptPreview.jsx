import { Card } from 'react-bootstrap';

const ReceiptPreview = ({ receipts }) => {
  if (!receipts.length) {
    return (
      <Card className="shadow-sm">
        <Card.Body className="p-4 text-center text-muted">
          No receipts generated yet
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm">
      <Card.Body className="p-4">
        <h4 className="mb-4">Receipt Preview</h4>
        <div className="receipts-container">
          {receipts.map((receipt) => (
            <div key={receipt.id} className="receipt" id={`receipt-${receipt.id}`}>
              <div className="receipt-header">
                <h3>RENT RECEIPT</h3>
                <div className="receipt-number">Receipt No: {receipt.id}</div>
              </div>
              <div className="receipt-content">
                <div className="receipt-date">
                  <strong>Date:</strong> {receipt.date}
                </div>
                <div className="receipt-text">
                  Received sum of <strong>₹{receipt.amount}/-</strong> from{" "}
                  <strong>{receipt.tenant}</strong> towards the rent of property
                  located at <strong>{receipt.address}</strong> for the month of{" "}
                  <strong>{receipt.month}</strong>.
                </div>
                <div className="receipt-landlord">
                  <strong>Landlord:</strong> {receipt.landlord}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ReceiptPreview;
