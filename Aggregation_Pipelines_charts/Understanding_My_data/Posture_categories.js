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
        "$sum": "$categories.Business"
      },
      "__alias_2": {
        "$sum": "$categories.Communication & Scheduling"
      },
      "__alias_3": {
        "$sum": "$categories.Design & Composition"
      },
      "__alias_4": {
        "$sum": "$categories.News & Opinion"
      },
      "__alias_5": {
        "$sum": "$categories.Reference & Learning"
      },
      "__alias_6": {
        "$sum": "$categories.Shopping"
      },
      "__alias_7": {
        "$sum": "$categories.Social Networking"
      },
      "__alias_8": {
        "$sum": "$categories.Software Development"
      }
    }
  },
  {
    "$project": {
      "_id": 0,
      "__alias_0": "$_id.__alias_0",
      "__alias_1": 1,
      "__alias_2": 1,
      "__alias_3": 1,
      "__alias_4": 1,
      "__alias_5": 1,
      "__alias_6": 1,
      "__alias_7": 1,
      "__alias_8": 1
    }
  },
  {
    "$project": {
      "y": "$__alias_1",
      "y_series_0": "$__alias_2",
      "y_series_1": "$__alias_3",
      "y_series_2": "$__alias_4",
      "y_series_3": "$__alias_5",
      "y_series_4": "$__alias_6",
      "y_series_5": "$__alias_7",
      "y_series_6": "$__alias_8",
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
    "$addFields": {
      "__multi_series": {
        "$objectToArray": {
          "Communication & Scheduling": "$y_series_0",
          "Design & Composition": "$y_series_1",
          "News & Opinion": "$y_series_2",
          "Reference & Learning": "$y_series_3",
          "Shopping": "$y_series_4",
          "Social Networking": "$y_series_5",
          "Software Development": "$y_series_6",
          "Business": "$y"
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
      "y_series_0": 0,
      "y_series_1": 0,
      "y_series_2": 0,
      "y_series_3": 0,
      "y_series_4": 0,
      "y_series_5": 0,
      "y_series_6": 0
    }
  },
  {
    "$limit": 5000
  }
]