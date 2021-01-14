

exports = function (payload, response) {
  
  const httpService = context.services.get('ifttt');
  var mykey = context.values.get('r');
  
  // define document, the JSON file were data will be stored
  let myObject2 = {"date":[],"productivity":[],"posture":[], "categories":{}, "usage":[]}; //create dictionary where values will be stored
  
  //posture
  var j = 0;
  
  //productivity 
  var productivity_val = 0;
  var divider = 0; 
  var k=1;
  var array = [];
  var l = [];
  
  //usage
  var time_spent = 0
  
  var o = 0;
  
  var dt = new Date() ;
  var strDate = dt.toISOString() ; // convert to ISOString, required to access api
  var date = strDate.substring(0, 10); // format it to access api
  
  
  let url2 = `https://dweet.io/get/dweets/for/tracking_posture_IoT`; //posture api
  let url3 = `https://www.rescuetime.com/anapi/data?key=${mykey}&perspective=interval&restrict_kind=productivity&interval=minute&restrict_begin=${date}&format=json`; //productivity api
  let url4 = `https://www.rescuetime.com/anapi/data?key=${mykey}&perspective=rank&restrict_kind=overview&interval=minute&restrict_begin=${date}&format=json`; //productivity api


  //get request to each API

  return httpService.get({url:url3}).then(response3=>
  {
    return httpService.get({url:url2}).then(response2=>
    {
      return httpService.get({url:url4}).then(response4=>
      {
      
        // productivity
        let json3 = JSON.parse(response3.body.text());
        var l = json3.rows;
        var ll = l.length;
        while (k<=4)
        {
          array = l[ll-k];
          var measured_date = array[0];
          var momentDate = dateFromISO8601(measured_date);
          var diff = dt.getTime() - momentDate.getTime();
          if (diff < 300000) //get values only from the last 5 minutes
          {
            productivity_val = productivity_val + array[3] * array[1]; //calculate productivity
            divider = divider + array[1];
            time_spent = time_spent + array[1]/60;
          }
          k = k + 1;  
        
        }
        
        productivity_data = productivity_val / divider ; //average 5 min productivity
        
        //categories
        let json4 = JSON.parse(response4.body.text());
        var usage = json4.rows;
        var t = usage.length;
        
        while (o<t)
        {
          var values = usage[o];
          var category = values[3];
          myObject2.categories[category] = values[1]/60;
          o = o+1;
        }
        
        
        //posture from sensor
        console.log('fetching '+ url2);
        let json2 = JSON.parse(response2.body.text());
        posture_val = json2.with[0].content.posture;
         
        
        // including values in document
        myObject2.productivity = productivity_data; //include productivity in object
        myObject2.date = dt; //include date in object
        myObject2.posture = posture_val; // include posture in object
        myObject2.usage = time_spent; //include time spent in object
        
        var collection3 = context.services.get('mongodb-atlas').db('todo').collection('final'); //database
        collection3.insertOne(myObject2); //store in database
        console.log('todo ' + myObject2);
        

        
      })
    
    })
  })
  
}

// Date functions for formatting

function dateFromISO8601(isostr) { 
    var parts = isostr.match(/\d+/g);
    return new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
}

function add_minutes(dt, minutes) {
    return new Date(dt.getTime() + minutes*60000);
}