import { promises as fs } from 'fs';
import path from 'path';

const recordingsDirectory = path.join(process.cwd(), 'voice-recordings');

export default async function handler(req, res) {
  const { fileName } = req.query;

  if (req.method === 'GET') {
    try {
      const filePath = path.join(recordingsDirectory, fileName);

      if (!filePath.startsWith(recordingsDirectory)) {
        // Prevent directory traversal attack
        return res.status(400).json({ message: 'Invalid file path' });
      }

      const fileContents = await fs.readFile(filePath);
      res.setHeader('Content-Type', 'audio/wav');
      return res.status(200).send(fileContents);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
