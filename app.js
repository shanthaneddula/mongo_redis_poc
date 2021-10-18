const RedisClient = require('redis');
const MongoClient = require('mongodb').MongoClient;

// Redis connection
const rClient = RedisClient.createClient(6379,'localhost', {
    password:'RedisPassword'
});
rClient.on('connect', function() {
    console.log('Connected to Redis !');
  });
// Mongo Connection
const mClient = new MongoClient("mongodb://MongoUser:MongoPassword@localhost:27017");
async function connectMongo() {
    var value = await mClient.connect();
    if (value =! undefined){
        console.log("Connected to MongoDB")
    }else{
        console.error("failed mongo connection")
    }
}
connectMongo();
//   async function poc() {
//     await checkMongoConnection();
//       console.log("inside poc app")
//       // Pring outages collection documents
//         const pocDb = mClient.db('mongo_poc_db');
//         const outages = pocDb.collection('outages');
//         // Query for a movie that has the title 'Back to the Future'
//         const outageList = await outages.find();
//         console.log("printing all the outages")
//         await outageList.forEach(console.dir);
//   }

// poc().catch(console.dir);

// function setOutagesInRedis(item) {
//     delete item['_id']
//     rClient.hset(item['region_id'], item, function(err, reply) {
//         console.log(err); // OK
//     console.log(item); // OK
//     });
//   }


// rClient.set('shanthan', 'Reddy', function(err, reply) {
//     console.log(reply); // OK
// });

// rClient.get('shanthan', function(err, reply) {
//     console.log(reply); 
    
//     var result = console.log(reply)
//     if (reply = null){
//         return result;
//         async function poc() {
//             await checkMongoConnection();
//               console.log("inside poc app")
//               // Pring outages collection documents
//                 const pocDb = mClient.db('mongo_poc_db');
//                 const testpoc = pocDb.collection('testData');
//                 // Query for a movie that has the title 'Back to the Future'
//                 var testPoc = await testData.find();
//                 console.log("printing all the details")
//                 await testPoc.forEach(console.dir);
//                 poc().catch(console.dir);
//           }

//     }
// });
////////////////////////////////////////////////////

// async function getDataFromMongo(key) {
//     const pocDb = mClient.db('mongo_poc_db');
//     const outages = pocDb.collection('outages');
//     const outageRegionData = await outages.findOne({region_id: key});
//     // console.log("printing all the outages ", outageRegionData)
//     return outageRegionData['outage_count']
    
// }

// function setRedisCache(key, value) {
//     console.log(`setting key : ${key}, and value: ${value} in redis`)
//     rClient.set(key, value, function (err, res) {
//         if (err) throw(err)
//     });
// }

// function getData(key, callback) {
//     rClient.get(key, function(err, resp) {
//         if(err != null){
//             console.log("exception caused: ", err);
//             return
//         }else if(resp == null) {
//             console.log("Key not found in redis, querying mongo db");
//             getDataFromMongo(key).then((value) => {
//                 setRedisCache(key,value);
//                 callback(value);
//             });
//         } else {
//             console.log("Key found in redis !! ");
//             callback(resp);
//         }
//     });
// }

// getData("region2", function(resp) {
//     console.log("result :", resp)
// });

// getDataFromMongo('region1').then((resp) => {
//     console.log(resp)
// })
//////////////////////////////////////   

async function getDataFromMongo(key){
    const pocDb = mClient.db('mongo_poc_db');
    const outages = pocDb.collection('outages');
    const outageData = await outages.find({},{ projection: { _id: 1, region_id: 1, impacted_users: 1, outage_count: 1 } }).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
    });
};
    //console.log("printing all the outages ", outageData)
    //return outageData['outage_count', 'impacted_users']
      
    
//getDataFromMongo("region1")

rClient.SET(result, function(err, reply) {
    console.log(reply); // OK
});
