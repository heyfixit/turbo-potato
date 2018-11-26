const express = require('express');
const app = express();
const port = 3000;
const { spawn } = require('child_process');

app.get('/', (req, res) => {
  res.send('\
    <html>\
      Hello World!<br />\
      <a href="/test_pipe">Test piping youtube-dl output.</a>\
    </html>\
  ');
});

// Piping youtube-dl straight to response as an mp4
app.get('/test_pipe', (req, res) => {
  const ydl = spawn('youtube-dl', [ '-f', 'best', 'https://www.youtube.com/watch?v=fz6yhwjiWLc', '-o', '-' ]);
  res.writeHead(200, {
    'Content-Type': 'video/mp4'
  });
  ydl.stdout.pipe(res);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
