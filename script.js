const generateReceiptNumber = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetters = Array(2).fill(0).map(() => letters[Math.floor(Math.random() * letters.length)]).join('');
    const randomNumbers = Array(3).fill(0).map(() => Math.floor(Math.random() * 10)).join('');
    return `${randomLetters}${randomNumbers}`;
};

const usedReceiptNumbers = new Set();

const getUniqueReceiptNumber = () => {
    let receiptNumber;
    do {
        receiptNumber = generateReceiptNumber();
    } while (usedReceiptNumbers.has(receiptNumber));
    usedReceiptNumbers.add(receiptNumber);
    return receiptNumber;
};

document.getElementById('rentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const tenantName = document.getElementById('tenantName').value;
    const landlordName = document.getElementById('landlordName').value;
    const address = document.getElementById('address').value;
    const amount = document.getElementById('amount').value;
    const startDate = new Date(document.getElementById('startDate').value + '-01');
    const endDate = new Date(document.getElementById('endDate').value + '-01');
    const paymentDay = document.getElementById('paymentDay').value;

    let receiptsHTML = '';
    let currentDate = new Date(startDate);
    const receipts = [];

    while (currentDate <= endDate) {
        const paymentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), paymentDay);
        const formattedDate = paymentDate.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        const receiptNumber = getUniqueReceiptNumber();
        const receiptHTML = `
            <div class="receipt" id="receipt-${receiptNumber}">
                <h3>RENT RECEIPT</h3>
                <p class="receipt-number">Receipt No: ${receiptNumber}</p>
                <div class="receipt-content">
                    <p class="receipt-date">Date: ${formattedDate}</p>
                    <p class="receipt-text">
                        Received sum of Rs. ${amount}/- from <strong>${tenantName}</strong> 
                        towards the rent of property located at <strong>${address}</strong> for the month of 
                        <strong>${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}</strong>.
                    </p>
                    <p class="receipt-landlord">
                        Landlord Name: ${landlordName}
                    </p>
                </div>
            </div>
        `;

        receipts.push({
            html: receiptHTML,
            number: receiptNumber,
            date: formattedDate
        });
        receiptsHTML += receiptHTML;
        currentDate.setMonth(currentDate.getMonth() + 1);
    }

    document.getElementById('receiptTemplate').innerHTML = receiptsHTML;
    document.getElementById('downloadButtons').style.display = 'block';

    // Single PDF download
    document.getElementById('downloadSingle').onclick = () => {
        const element = document.getElementById('receiptTemplate');
        html2pdf().from(element).save(`rent_receipts_${startDate.toISOString().slice(0,7)}_${endDate.toISOString().slice(0,7)}.pdf`);
    };

    // Multiple PDF download
    document.getElementById('downloadMultiple').onclick = async () => {
        for (const receipt of receipts) {
            const element = document.createElement('div');
            element.innerHTML = receipt.html;
            document.body.appendChild(element);
            await html2pdf()
                .from(element)
                .save(`rent_receipt_${receipt.number}_${receipt.date.replace(/\s/g, '_')}.pdf`);
            document.body.removeChild(element);
        }
    };
});
