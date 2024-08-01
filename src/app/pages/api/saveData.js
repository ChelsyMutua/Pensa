// pages/api/saveData.js
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST' || req.method === 'PUT') {
    const { feeling, answers, fileName } = req.body;

    const dirPath = path.join(process.cwd(), 'public', 'emotions', feeling.toLowerCase());
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const filePath = path.join(dirPath, fileName || `${feeling.toLowerCase()}-${Date.now()}.json`);

    fs.writeFileSync(filePath, JSON.stringify({ feeling, answers }, null, 2));
    res.status(200).json({ message: 'Data saved successfully', fileName: path.basename(filePath) });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
