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

const sensorData_142 = {
    hostname: 'http://172.16.10.142',
    path: '/api/historicdata.xml?id=50867&sdate=2024-03-03-00-00-00&edate=2024-03-04-00-00-00&avg=86400&username=ethio12238&password=Test@123',
    method: 'GET'
}
const URL = '172.16.10.144:8080/api/historicdata.json?id=136744&sdate=2024-03-03-00-00-00&edate=2024-03-04-00-00-00&avg=86400&username=Dawit.M&password=Test@123&usecaption=1'

const data_from_prtg = axios.get(`${sensorData.hostname}:${sensorData.port}${sensorData.path}`)
.then( response => {
    return response
})

const data_from_142 = axios.get(`${sensorData_142.hostname}${sensorData_142.path}`)
.then( response => {
    return response
})

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

new_Data.then(console.log)
    
    