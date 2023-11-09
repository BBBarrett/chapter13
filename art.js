const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const jsonPath = path.join(__dirname, 'paintings.json');

let paintings;
fs.readFile(jsonPath, (err,data) => {
    if (err)
        console.log('Unable to read json data file');
    else
        paintings = JSON.parse(data);

});

app.get('/', (req,resp) => { resp.json(paintings) } );

let port = 8080;
app.listen(port, () => {
    console.log("Server running at port= " + port);
});
app.get('/gallery/:id', (req,resp) => {
    const galleryID = req.params.id;
    const matches = 
        paintings.filter(obj => galleryID==obj.gallery.galleryID);
    resp.json(matches);
})
app.get('/:id', (req,resp) => {
    const paintingID = req.params.id;
    const matches =
        paintings.filter(obj =>paintingID==obj.paintingID);
    resp.json(matches);
})
app.get('/artist/:id', (req, resp) => {
    const artistID = req.params.id;
    const matches =
        paintings.filter(obj =>artistID==obj.artist.artistID);
    resp.json(matches);
})
app.get('/year/:min/:max', (req,resp) => {
    const yearMin = req.params.min;
    const yearMax = req.params.max;
    const matches = 
        paintings.filter(obj =>yearMin<=obj.yearOfWork && yearMax>=obj.yearOfWork);
    resp.json(matches);
})