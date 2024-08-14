const express = require('express')
 // const app = express()
// const port = 1010
//
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })
//
// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })

const app = require('./app');

// Define the port to listen on
const PORT = process.env.PORT || 1010;

app.get('/test', (req, res) => {
    res.send('Test route works!');
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
