const fs = require('fs')

fs.writeFileSync('notes.txt','My name is Victor ')
fs.appendFileSync('notes.txt','and i am studyng Node.js!')