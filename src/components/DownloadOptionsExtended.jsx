import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const DownloadOptionsExtended = ({ receipts }) => {
  const [fileType, setFileType] = useState('pdf');
  const [imageQuality, setImageQuality] = useState(5);

  const generatePDF = async (receiptId) => {
    const element = document.getElementById(`receipt-${receiptId}`);
    if (!element) return;

    const pdf = new jsPDF('p', 'mm', 'a4');
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: true,
      backgroundColor: '#ffffff'
    });

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, 0, imgWidth, imgHeight);
    pdf.save(`rent_receipt_${receiptId}.pdf`);
  };

  const generateJPEG = async (receiptId) => {
    const element = document.getElementById(`receipt-${receiptId}`);
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff'
    });

    const link = document.createElement('a');
    link.download = `rent_receipt_${receiptId}.jpg`;
    link.href = canvas.toDataURL('image/jpeg', imageQuality / 100);
    link.click();
  };

  const handleDownload = async (downloadType) => {
    if (!receipts.length) return;

    if (downloadType === 'single') {
      // Generate a single PDF/JPEG with all receipts
      for (const receipt of receipts) {
        if (fileType === 'pdf') {
          await generatePDF(receipt.id);
        } else {
          await generateJPEG(receipt.id);
        }
      }
    } else if (downloadType === 'multiple') {
      // Generate individual files for each receipt
      for (const receipt of receipts) {
        if (fileType === 'pdf') {
          await generatePDF(receipt.id);
        } else {
          await generateJPEG(receipt.id);
        }
      }
    }
  };

  return (
    <div className="download-options-wrapper">
      <Form>
        <Form.Group className="mb-4">
          <Form.Label>File Format</Form.Label>
          <div className="d-flex gap-3">
            <Form.Check
              type="radio"
              id="pdf-option"
              label="PDF"
              name="fileType"
              checked={fileType === 'pdf'}
              onChange={() => setFileType('pdf')}
            />
            <Form.Check
              type="radio"
              id="jpeg-option"
              label="JPEG"
              name="fileType"
              checked={fileType === 'jpeg'}
              onChange={() => setFileType('jpeg')}
            />
          </div>
        </Form.Group>

        {fileType === 'jpeg' && (
          <Form.Group className="mb-4">
            <Form.Label>Image Quality: {imageQuality}MB</Form.Label>
            <Form.Range
              min={5}
              max={100}
              step={5}
              value={imageQuality}
              onChange={(e) => setImageQuality(Number(e.target.value))}
            />
          </Form.Group>
        )}

        <Row className="g-3">
          <Col xs={12}>
            <Button 
              variant="primary" 
              className="w-100"
              onClick={() => handleDownload('single')}
            >
              Download Single File
            </Button>
          </Col>
          <Col xs={12}>
            <Button 
              variant="outline-primary" 
              className="w-100"
              onClick={() => handleDownload('multiple')}
            >
              Download Individual Files
            </Button>
          </Col>
          <Col xs={12}>
            <Button 
              variant="outline-secondary" 
              className="w-100"
              onClick={() => handleDownload('range')}
            >
              Download Custom Range
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default DownloadOptionsExtended;
