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
        "year": {
          "$year": "$date"
        },
        "month": {
          "$subtract": [
            {
              "$month": "$date"
            },
            1
          ]
        },
        "date": {
          "$dayOfMonth": "$date"
        },
        "hours": {
          "$hour": "$date"
        },
        "minutes": {
          "$minute": "$date"
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
      },
      "__alias_2": {
        "$avg": "$productivity"
      }
    }
  },
  {
    "$project": {
      "_id": 0,
      "__alias_0": "$_id.__alias_0",
      "__alias_1": 1,
      "__alias_2": 1
    }
  },
  {
    "$project": {
      "y": "$__alias_1",
      "y_series_0": "$__alias_2",
      "x": "$__alias_0",
      "_id": 0
    }
  },
  {
    "$sort": {
      "x.year": 1,
      "x.month": 1,
      "x.date": 1,
      "x.hours": 1,
      "x.minutes": 1
    }
  },
  {
    "$addFields": {
      "__multi_series": {
        "$objectToArray": {
          "Productivity": "$y_series_0",
          "Posture": "$y"
        }
      }
    }
  },
  {
    "$unwind": "$__multi_series"
  },
  {
    "$addFields": {
      "color": "$__multi_series.k",
      "y": "$__multi_series.v"
    }
  },
  {
    "$project": {
      "__multi_series": 0,
      "y_series_0": 0
    }
  },
  {
    "$limit": 5000
  }
]