import { Container, Row, Col, Card } from 'react-bootstrap';
import { useState } from 'react';
import Header from './components/Header';
import ReceiptForm from './components/ReceiptForm';
import ReceiptPreview from './components/ReceiptPreview';
import DownloadOptionsExtended from './components/DownloadOptionsExtended';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [receipts, setReceipts] = useState([]);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);

  const handleGenerateReceipts = (formData) => {
    const newReceipts = [];
    let currentDate = new Date(formData.startDate + '-01');
    const endDate = new Date(formData.endDate + '-01');

    while (currentDate <= endDate) {
      const receiptNumber = generateReceiptNumber();
      
      // Create a new date object for the payment date
      const paymentDay = parseInt(formData.paymentDay);
      const paymentDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        Math.min(paymentDay, new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate())
      );

      newReceipts.push({
        id: receiptNumber,
        date: new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(paymentDate),
        amount: formData.amount,
        tenant: formData.tenantName,
        landlord: formData.landlordName,
        address: formData.address,
        month: new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long'
        }).format(currentDate)
      });

      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    setReceipts(newReceipts);
    setShowDownloadOptions(true);
  };

  const generateReceiptNumber = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetters = Array(2).fill(0).map(() => letters[Math.floor(Math.random() * letters.length)]).join('');
    const randomNumbers = Array(3).fill(0).map(() => Math.floor(Math.random() * 10)).join('');
    return `${randomLetters}${randomNumbers}`;
  };

  return (
    <div className="app-wrapper">
      <Header />
      <Container fluid className="main-content">
        <Row>
          {/* Top Section - Form */}
          <Col xs={12} className="mb-4">
            <Card className="form-card">
              <Card.Body>
                <Row>
                  <Col md={12}>
                    <ReceiptForm onGenerateReceipts={handleGenerateReceipts} />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/* Receipt Preview and Download Options */}
          <Col xs={12}>
            <Row>
              <Col md={8}>
                <ReceiptPreview receipts={receipts} />
              </Col>
              {showDownloadOptions && (
                <Col md={4}>
                  <Card className="download-card">
                    <Card.Body>
                      <h4 className="mb-4">Download Options</h4>
                      <DownloadOptionsExtended receipts={receipts} />
                    </Card.Body>
                  </Card>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
