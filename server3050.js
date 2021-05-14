
const PORT = process.env.PORT||3050;
const express = require("express");
const fs = require("fs")
const app = express();
const dbJson = require("./db/db.json");
const path = require("path");
const { json } = require("express");

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

app.get("*", (request, response)=>{
    response.sendFile(path.join(__dirname, "./public/index.html")
    )}
);

app.get("/", (request, response)=>{
    response.sendFile(path.join(__dirname, "./public/index.html")
    )}
);
app.get("/api/notes", (request, response)=>{
    response.json(dbJson.slice(1))
    }
);
function createCurrentNote(main, noteBatch) {
    const currentNote = main;
    if (!Array.isArray(noteBatch))noteBatch=[];
    if(noteBatch.length===0)noteBatch.push(0);

    main.id=noteBatch[0];
    noteBatch[0]++;

    noteBatch.push(currentNote);
    fs.writeFileSync(path.join(__dirname, "./db/db.json"),json.stringify(noteBatch, null, 2));
    return currentNote;
}
app.post("/api/notes",(request, response)=> {
    const currentNote=createCurrentNote(request.main, dbJson);
    response.json(currentNote);
});

app.get("/notes", (request, response)=>{
    response.sendFile(path.join(__dirname, "./public/notes.html")
    )}
);
app.listen(PORT, ()=> {
    console.log("The server is now listening on PORT" + PORT)});