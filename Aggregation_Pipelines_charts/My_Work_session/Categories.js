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
        "$sum": "$categories.Business"
      },
      "__alias_1": {
        "$sum": "$categories.Communication & Scheduling"
      },
      "__alias_2": {
        "$sum": "$categories.Design & Composition"
      },
      "__alias_3": {
        "$sum": "$categories.News & Opinion"
      },
      "__alias_4": {
        "$sum": "$categories.Reference & Learning"
      },
      "__alias_5": {
        "$sum": "$categories.Social Networking"
      },
      "__alias_6": {
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
      "__alias_6": 1
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
      "_id": 0
    }
  },
  {
    "$addFields": {
      "__multi_series": {
        "$objectToArray": {
          "Communication & scheduling": "$value_series_0",
          "Design & Composition": "$value_series_1",
          "News & Opinion": "$value_series_2",
          "Reference & Learning": "$value_series_3",
          "Social Networking": "$value_series_4",
          "Software Development": "$value_series_5",
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
      "value_series_5": 0
    }
  },
  {
    "$limit": 5000
  }
]