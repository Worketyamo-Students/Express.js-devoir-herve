import express from "express";
import fs from "fs";
import bodyparser from "body-parser";

//dire a mon application dutiliser express
const app = express();
app.use(bodyparser.json());
const Port = 3400;

//vas lire le fichier
app.get("/Mes_eleve", (req, res) => {
  fs.readFile("./MaDataBase.json", "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ msg: { error: "Server error reading file" } });
    }
    const Mes_eleve = JSON.parse(data);
    res.status(200).json(Mes_eleve);
  });
});

//Pour envoyer les donne dans mon server

app.post("/Mes_eleve", (req,res) => {
  if(!req.body.name || !req.body.email || !req.body.phone){
    res.status(401).json({msg:{error:"Bad Request"}})
  }

    let Nouveaux_etudiant =  {
      "Name" : req.body.name,
      "Email":req.body.email,
      "Phone": req.body.phone
    }

    fs.readFile("./MaDataBase","utf-8", (err,data) =>{
      if(err){
        console.error("Erreur lors de la lecture du fichier:", err);
      };

      let database = JSON.parse(data);
      database.push(Nouveaux_etudiant);

      fs.writeFile("./MaDataBase.json",JSON.stringify(database,null,2),"utf-8",(err)=>{
        if(err){
          console.log("Erreur lors de ecriture du ");
          return res.status(500).json({ msg: { error: "Server error " } });
        }
          console.log("Copie  avec succes");
          res.status(200).json({msg:{success:"user created"}});
        
      });

    });
});

app.listen(Port,()=>{
  console.log(`le serveur a demmare et et disponible sur le lien http://localhost:${Port}`)
});
