import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { feeling, answers, fileName } = req.body;
    const dirPath = path.join(process.cwd(), 'public', 'emotions', feeling.toLowerCase());
    
    try {
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      
      const filePath = path.join(dirPath, fileName || `${feeling.toLowerCase()}-${Date.now()}.json`);
      fs.writeFileSync(filePath, JSON.stringify({ feeling, answers }, null, 2));
      
      res.status(200).json({ message: 'Data saved successfully', fileName: path.basename(filePath) });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ error: 'Failed to save data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}