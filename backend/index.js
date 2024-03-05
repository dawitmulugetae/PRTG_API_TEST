import { error } from "console";
import http from "http";
import axios from "axios";
import xml2js from "xml2js";


// import fetch from "fetch";
const sensorData = {
    hostname: 'http://172.16.10.144',
    port: 8080,
    path: '/api/historicdata.json?id=136744&sdate=2024-03-03-00-00-00&edate=2024-03-04-00-00-00&avg=86400&username=Dawit.M&password=Test@123&usecaption=1',
    method: 'GET',
}

const sensor_Fixed_List = ["50867", "51441"]
const sensorData_142 = {
    hostname: 'http://172.16.10.142',
    path: `/api/historicdata.xml?id=${sensor_Fixed_List[1]}&sdate=2024-03-03-00-00-00&edate=2024-03-04-00-00-00&avg=86400&username=ethio12238&password=Test@123`,
    method: 'GET'
}
const URL = '172.16.10.144:8080/api/historicdata.json?id=136744&sdate=2024-03-03-00-00-00&edate=2024-03-04-00-00-00&avg=86400&username=Dawit.M&password=Test@123&usecaption=1'

const sensors_142 = {
    hostname: 'http://172.16.10.144:8080',
    path: '/api/table.json?content=sensors&output=json&columns=objid,sensor&filter_tags=24/7&username=Dawit.M&password=Test@123',
    method: 'GET'
}

// this function takes sensor id as an argument and passes it to the api_Header_Option variable
const sensor_Option = (data) => {
    const api_Header_Option = {
        hostname: 'http://172.16.10.144:8080',
        path: `/api/historicdata.json?id=${data}&sdate=2024-02-01-00-00-00&edate=2024-03-01-00-00-00&avg=86400&username=Dawit.M&password=Test@123&usecaption=1`,
        method: 'GET'
    }

    return api_Header_Option;
}

//checking if the above function actually works by iterating it over a list of sensor ids
// sensor_Fixed_List.forEach(element => {
//     console.log(sensor_Option(element))
// });

// gets all sensor information from PRTG 142
const sensors_List = axios.get(`${sensors_142.hostname}${sensors_142.path}`)
.then( response => {
    return response
})

// returns a list of sensor objects that has a objid and sensor name as items
const sensors_output_142 = sensors_List.then( (data) => {
     return data.data.sensors
   
})


sensors_output_142.then( data => {

        console.log(sensor_Option(data[0].objid))
   
    for ( let i = 0; i < data.length; i ++) {


        axios.get(`${(sensor_Option(data[i].objid)).hostname}${(sensor_Option(data[i].objid)).path}`)
        .then( response => {return response.data})
        .then(console.log)
        // .then( response => {
        //     xml2js.parseString(response, function(err, result) {
        //         console.log(result)
        //     })
        // })
        // .catch(error => console.log("error"))
    }
})
// const axios_response = sensors_output_142.then(data => {
//     const newList = []
//     data.forEach( element => {
      
//         element
//     //     axios.get(`${sensor_Option(element.objid).hostname}${sensor_Option(element.objid).path}`)
//     //   .then(response => data_Axios_List.push(response)) 

      
//     })
   
        
    
//     })

// const response_data = axios_response.then((data) => {
//     return data.data
// })
   
// response_data.then(console.log)
    // .then( response => {
    //     response.forEach( element => {
    //         axios.get(`${element.hostname}${element.path}`)
    //     })
    // }).then( reponse => {
    //     console.log(response)
    // })

// test from PRTG 144
const data_from_prtg = axios.get(`${sensorData.hostname}:${sensorData.port}${sensorData.path}`)
.then( response => {
    return response
})


// extracts history data for a specific sensor id
const data_from_142 = axios.get(`${sensorData_142.hostname}${sensorData_142.path}`)
.then( response => {
    return response
})


// uses the above result as an input to extract the data field
const data_142 = data_from_142.then((data) => {
     return data.data
    })

// data_142.then(console.log)
const new_Data = data_142.then( xml_data => {
    let totalVolume, trafficIn, trafficOut = {}
    xml2js.parseString(xml_data, function (err, result) {
        totalVolume = result.histdata.item[0].value[0];
        trafficIn = result.histdata.item[0].value[2];
        trafficOut = result.histdata.item[0].value[4];
    })
    return [totalVolume, trafficIn, trafficOut];
})

// new_Data.then(console.log)
    
    