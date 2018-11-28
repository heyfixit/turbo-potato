const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');

// Piping youtube-dl straight to response as an mp4
router.get('/test_pipe', (req, res) => {
  const ydl = spawn('youtube-dl', [ '-f', 'best', 'https://www.youtube.com/watch?v=fz6yhwjiWLc', '-o', '-' ]);
  res.writeHead(200, {
    'Content-Type': 'video/mp4'
  });
  ydl.stdout.pipe(res);
});

