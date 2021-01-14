exports =  function() {

  
  const httpService = context.services.get('notification');

  //secret values
  var mykey = context.values.get('r');
  var token = context.values.get('token');
  var user = context.values.get('user');
  var device = context.values.get('device');
  
  //API push notifications url
  let url = `https://api.pushover.net/1/messages.json`;
  
  //Define document to store gold stars
  let myObject = {"date":[],"goldstar":[]}; //create dictionary where "stars" will be stored

  //Define the database where data must be retrieved from
  const data = context.services.get("mongodb-atlas").db("todo").collection("final");
  
  //Find latest 3 documents in the database
  return data.find({},{posture:1,productivity:1, categories:1, usage:1, date:1})
  .sort( { date: -1 } )
  .limit(3)
  .toArray()
  .then(response => 
  {
    //checking that the values correspond to the last 15 minutes
    dt = new Date()
    var momentDate = [response[0].date, response[1].date, response[2].date];
    var diff1 = dt.getTime() - momentDate[0].getTime();
    var diff2 = response[0].date.getTime() - response[1].date.getTime();
    var diff3 = response[0].date.getTime() - response[1].date.getTime();
    
    //calculate productivity and posture values
    if (diff1 < 480000 && diff2 < 480000 && diff3 < 480000) {
      productivity1= Number(response[0].productivity);
      productivity2= Number(response[1].productivity);
      productivity3= Number(response[2].productivity);
      pro= (productivity1 + productivity2 + productivity3)/3;
      posture1= Number(response[0].posture);
      posture2= Number(response[1].posture);
      posture3= Number(response[2].posture);
      pos= (posture1 + posture2 + posture3)/3;
      
      //if good productivity and posture 
      if (pro>1.3 && (pos>-0.5 && pos<1.5)){
        
        //store a gold star in a new database
        var collection3 = context.services.get('mongodb-atlas').db('todo').collection('stars'); //database
        myObject.goldstar = 1; //include productivity in object
        myObject.date = new Date() ; //include date in object
        collection3.insertOne(myObject); //store star

        //send a get request to push notifications API
        httpService.post({url: "https://api.pushover.net/1/messages.json", body: { token: token, user: user, device:device, title:"Gold star!!", message:"Your productivity and posture are great, well done!" },
    encodeBodyAsJSON: true});
        console.log("gold star");
        return("gold star");
      }
      
       //if bad productivity and good posture 
      else if (pro<1.3 && (pos>-0.5 && pos<1.5)){
        httpService.post({url: "https://api.pushover.net/1/messages.json", body: { token: token, user: user, device:device, title:"Posture and Productivity!", message:"Your productivity hasn't been great. Great posture though!" },
    encodeBodyAsJSON: true});
        console.log("pro low");
        return("pro low");
      }
      
      //if bad posture and good productivity 
      else if (pro>1.3 && (pos>1.5 || pos<-0.5)){

        //if posture angle more than one, the user is bending forward
        if (pos>1){
        httpService.post({url: "https://api.pushover.net/1/messages.json", body: { token: token, user: user, device:device, title:"Posture and Productivity!", message:"Your posture hasn't been great. You tend to lean forward. Great productivity though!" },
    encodeBodyAsJSON: true});
        console.log("pos forward");
        return("pos forward");
        }
        else{
        //if posture angle less than -0.5, the user is bending backwards
          httpService.post({url: "https://api.pushover.net/1/messages.json", body: { token: token, user: user, device:device, title:"Posture and Productivity!", message:"Your posture hasn't been great. You tend to lean backwards. Great productivity though!" },
    encodeBodyAsJSON: true});
        console.log("pos low");
        return("pos low");
        }
      
      
      }

      else if (pro<1.3 && (pos>1.5 || pos<-0.5)){

        //if posture angle more than one, the user is bending forward
        if (pos>1){
        httpService.post({url: "https://api.pushover.net/1/messages.json", body: { token: token, user: user, device:device, title:"Posture and Productivity!", message:"Your posture hasn't been great. You tend to lean forward. Your productivity hasn't been great either..." },
    encodeBodyAsJSON: true});
        console.log("pos forward");
        return("pos forward");
        }
        else{
        //if posture angle less than -0.5, the user is bending backwards
          httpService.post({url: "https://api.pushover.net/1/messages.json", body: { token: token, user: user, device:device, title:"Posture and Productivity!", message:"Your posture hasn't been great. You tend to lean backwards. Your productivity hasn't been great either..." },
    encodeBodyAsJSON: true});
        console.log("pos low");
        return("pos low");
        }
      
      
      }
      
    }
  
    
    else{
      return("not in use")
    }
})
}