[
  {
    "$addFields": {
      "posture": {
        "$cond": {
          "if": {
            "$in": [
              {
                "$type": "$posture"
              },
              [
                "double",
                "int",
                "long",
                "decimal"
              ]
            ]
          },
          "then": "$posture",
          "else": null
        }
      }
    }
  },
  {
    "$addFields": {
      "__alias_0": {
        "$multiply": [
          {
            "$trunc": {
              "$divide": [
                "$posture",
                0.5
              ]
            }
          },
          0.5
        ]
      }
    }
  },
  {
    "$group": {
      "_id": {
        "__alias_0": "$__alias_0"
      },
      "__alias_1": {
        "$avg": "$productivity"
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
      "y": "$__alias_1",
      "x": "$__alias_0",
      "_id": 0
    }
  },
  {
    "$sort": {
      "x": 1
    }
  },
  {
    "$limit": 5000
  }
]