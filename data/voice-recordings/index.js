import { promises as fs } from 'fs';
import path from 'path';

const recordingsDirectory = path.join(process.cwd(), 'voice-recordings');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { audioData, fileName } = req.body;

      if (!audioData || !fileName) {
        return res.status(400).json({ message: 'Invalid request' });
      }

      // Ensure the directory exists
      await fs.mkdir(recordingsDirectory, { recursive: true });

      const filePath = path.join(recordingsDirectory, fileName);
      const buffer = Buffer.from(audioData);

      await fs.writeFile(filePath, buffer);
      return res.status(200).json({ message: 'Recording saved successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
