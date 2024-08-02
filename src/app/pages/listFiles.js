import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { emotion } = req.query;
  const dirPath = path.join(process.cwd(), 'public', 'emotions', emotion);

  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.json'));
    res.status(200).json(files);
  } else {
    res.status(404).json({ message: 'Emotion not found' });
  }
}
