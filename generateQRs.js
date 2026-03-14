import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

// Define the base URL with your local IP and the port Vite is running on.
const BASE_URL = 'http://192.168.0.102:5173/menu?table=';
const OUTPUT_DIR = path.join(process.cwd(), 'qrcodes');

// Create the output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

const generateQRCodes = async (numTables) => {
  for (let table = 1; table <= numTables; table++) {
    const tableUrl = `${BASE_URL}${table}`;
    const filePath = path.join(OUTPUT_DIR, `table-${table}.png`);

    try {
      await QRCode.toFile(filePath, tableUrl, {
        color: {
          dark: '#000000',  // Dark dots
          light: '#ffffff' // White background
        },
        width: 300,
        margin: 2
      });
      console.log(`Generated QR code for Table ${table}: ${filePath}`);
    } catch (err) {
      console.error(`Error generating QR code for Table ${table}:`, err);
    }
  }
};

// Generate QR codes for 10 tables
generateQRCodes(10)
  .then(() => console.log('✅ Finished generating QR codes!'))
  .catch(console.error);
