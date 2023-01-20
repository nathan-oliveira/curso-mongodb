```
use bancoTarefa

db.usuario.insertOne({ nome: "Nathan" })
db.usuario.insertOne({ nome: "Fulano" })
db.usuario.insertOne({ nome: "Ciclano" })

db.usuario.find()

mongodump -d bancoTarefa -o pastaBancoTarefa

mongorestore -d bancoTarefaFim pastaBancoTarefa
```
