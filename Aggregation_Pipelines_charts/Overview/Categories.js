[
  {
    "$group": {
      "_id": {},
      "__alias_0": {
        "$sum": "$categories.Business"
      },
      "__alias_1": {
        "$sum": "$categories.Communication & Scheduling"
      },
      "__alias_2": {
        "$sum": "$categories.Design & Composition"
      },
      "__alias_3": {
        "$sum": "$categories.Entertainment"
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
      "__alias_0": 1,
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
      "value": "$__alias_0",
      "value_series_0": "$__alias_1",
      "value_series_1": "$__alias_2",
      "value_series_2": "$__alias_3",
      "value_series_3": "$__alias_4",
      "value_series_4": "$__alias_5",
      "value_series_5": "$__alias_6",
      "value_series_6": "$__alias_7",
      "value_series_7": "$__alias_8",
      "_id": 0
    }
  },
  {
    "$addFields": {
      "__multi_series": {
        "$objectToArray": {
          "Communication & Scheduling": "$value_series_0",
          "Design & Composition": "$value_series_1",
          "Entertainment": "$value_series_2",
          "News & Opinion": "$value_series_3",
          "Reference & Learning": "$value_series_4",
          "Shopping": "$value_series_5",
          "Social Networking": "$value_series_6",
          "Software Development": "$value_series_7",
          "Business": "$value"
        }
      }
    }
  },
  {
    "$unwind": "$__multi_series"
  },
  {
    "$addFields": {
      "label": "$__multi_series.k",
      "value": "$__multi_series.v"
    }
  },
  {
    "$project": {
      "__multi_series": 0,
      "value_series_0": 0,
      "value_series_1": 0,
      "value_series_2": 0,
      "value_series_3": 0,
      "value_series_4": 0,
      "value_series_5": 0,
      "value_series_6": 0,
      "value_series_7": 0
    }
  },
  {
    "$limit": 5000
  }
]