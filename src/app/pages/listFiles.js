import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { emotion } = req.query;
  const dirPath = path.join(process.cwd(), 'public', 'emotions', emotion);
  
  try {
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      res.status(200).json(files);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    console.error('Error reading directory:', error);
    res.status(500).json({ error: 'Failed to list files' });
  }
}