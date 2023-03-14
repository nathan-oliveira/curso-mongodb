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
