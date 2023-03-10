```
Ordenação desc: { $sort: { createdAt: -1 } },

Ordenação asc: { $sort: { createdAt: 1 } },
```

```
db.Transaction.aggregate([
  { $sort: { createdAt: -1 } },
  { $match: { usernames: "vd390@teste.com.br" } },
  { $limit: 3 },
  {
    $project: {
      _id: "$_id",
      finishedAt: "$finishedAt",
      companyCnpj: "$companyCnpj",
      alias: "$alias",
      tag: "$main",
      usernames: "$usernames",
      blackList: "$blackList",
      getBy: "$getBy",
      receivedBy: "$receivedBy",
      usedBy: "$usedBy",
      createdAt: "$createdAt",
      updatedAt: "$updatedAt",
      expireAt: "$expireAt",
      userId: "$userId",
      count_usernames: {
        $size:"$usernames",
      },
    },
  },

  { $match: { count_usernames : 1 } },
])
```

```
inner join:

db.Data.find() // metadataId
db.Metadata.find() // _id

db.getCollection('Data').aggregate([
  { $match: { _id: ObjectId("5fa2b00432192830234af5f6") } },
  {
    $lookup: {
      from: "Metadata",
      localField: "metadataId",
      foreignField: "_id",
      as: "metadata_docs"
    }
  },
  {
    $match: {
      "metadata_docs": {$ne: []}
    }
  }
])
```
