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
        "$avg": "$categories.Software Development"
      },
      "__alias_2": {
        "$avg": "$categories.Social Networking"
      },
      "__alias_3": {
        "$avg": "$categories.Shopping"
      },
      "__alias_4": {
        "$avg": "$categories.Reference & Learning"
      },
      "__alias_5": {
        "$avg": "$categories.News & Opinion"
      },
      "__alias_6": {
        "$avg": "$categories.Entertainment"
      },
      "__alias_7": {
        "$avg": "$categories.Design & Composition"
      },
      "__alias_8": {
        "$avg": "$categories.Communication & Scheduling"
      },
      "__alias_9": {
        "$avg": "$categories.Business"
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
      "__alias_8": 1,
      "__alias_9": 1
    }
  },
  {
    "$project": {
      "x": "$__alias_0",
      "y_series_7": "$__alias_1",
      "y_series_6": "$__alias_2",
      "y_series_5": "$__alias_3",
      "y_series_4": "$__alias_4",
      "y_series_3": "$__alias_5",
      "y_series_2": "$__alias_6",
      "y_series_1": "$__alias_7",
      "y_series_0": "$__alias_8",
      "y": "$__alias_9",
      "_id": 0
    }
  },
  {
    "$sort": {
      "x.hours": 1
    }
  },
  {
    "$addFields": {
      "__multi_series": {
        "$objectToArray": {
          "Software Development": "$y_series_7",
          "Social Networking": "$y_series_6",
          "Shopping": "$y_series_5",
          "Reference & Learning": "$y_series_4",
          "News & Opinion": "$y_series_3",
          "Entertainment": "$y_series_2",
          "Design & Composition": "$y_series_1",
          "Communication & Scheduling": "$y_series_0",
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
      "y_series_7": 0,
      "y_series_6": 0,
      "y_series_5": 0,
      "y_series_4": 0,
      "y_series_3": 0,
      "y_series_2": 0,
      "y_series_1": 0,
      "y_series_0": 0
    }
  },
  {
    "$limit": 5000
  }
]