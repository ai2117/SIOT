[
  {
    "$addFields": {
      "date": {
        "$cond": {
          "if": {
            "$eq": [
              {
                "$type": "$date"
              },
              "date"
            ]
          },
          "then": "$date",
          "else": null
        }
      }
    }
  },
  {
    "$addFields": {
      "__alias_0": {
        "hours": {
          "$hour": "$date"
        }
      }
    }
  },
  {
    "$group": {
      "_id": {
        "__alias_0": "$__alias_0"
      },
      "__alias_1": {
        "$avg": "$posture"
      }
    }
  },
  {
    "$project": {
      "_id": 0,
      "__alias_0": "$_id.__alias_0",
      "__alias_1": 1
    }
  },
  {
    "$project": {
      "x": "$__alias_0",
      "y": "$__alias_1",
      "_id": 0
    }
  },
  {
    "$sort": {
      "x.hours": 1
    }
  },
  {
    "$limit": 5000
  }
]