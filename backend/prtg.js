import { error } from "console";
import axios from "axios";

const sensor_Tag = "24/7";
const HOSTNAME = "http://172.16.10.144:8080";
const USERNAME = "Dawit.M";
const PASSWORD = "Test@123";
const STARTDATE = "";
const ENDDATE = "";
const STARTTIME = "";
const ENDTIME = "";



// it is a header option, used by sensor_List function to collect list of sensors
const sensor_header_Options = {
    hostname: `${HOSTNAME}`,
    path: `/api/table.json?content=sensors&output=json&columns=objid,sensor&filter_tags=${sensor_Tag}&username=${USERNAME}&password=${PASSWORD}`,
    method: 'GET'
}

// this function is used to dynamically generate header option for historic data
const historyData_Option = (data) => {
    const api_Header_Option = {
        hostname: `${HOSTNAME}`,
        path: `/api/historicdata.json?id=${data}&sdate=${STARTDATE}-${STARTTIME}&edate=${ENDDATE}-${ENDTIME}&avg=86400&username=${USERNAME}&password=${PASSWORD}&usecaption=1`,
        method: 'GET'
    }

    return api_Header_Option;
}


// this is used to generate list of sensors data
const sensors_List = axios.get(`${sensor_header_Options.hostname}${sensor_header_Options.path}`)
.then( response => {
    return response
})


//this is used to extract useful sensor information from sensors_List function
const sensors_output = sensors_List.then( (data) => {
    return data.data.sensors
  
})

// this function is used to generate report for all the sensors found by the above function
sensors_output.then( data => {

    console.log(historyData_Option(data[0].objid))

for ( let i = 0; i < data.length; i ++) {


    axios.get(`${(historyData_Option(data[i].objid)).hostname}${(historyData_Option(data[i].objid)).path}`)
    .then( response => {return response.data})
    .then(console.log)
}
})
