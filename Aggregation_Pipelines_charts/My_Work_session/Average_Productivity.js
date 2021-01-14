[
  {
    "$match": {
      "date": {
        "$gte": {
          "$date": "2021-01-14T00:00:00Z"
        },
        "$lt": {
          "$date": "2021-01-15T00:00:00Z"
        }
      }
    }
  },
  {
    "$group": {
      "_id": {},
      "__alias_0": {
        "$avg": "$productivity"
      }
    }
  },
  {
    "$project": {
      "_id": 0,
      "__alias_0": 1
    }
  },
  {
    "$project": {
      "value": "$__alias_0",
      "_id": 0
    }
  },
  {
    "$limit": 5000
  }
]