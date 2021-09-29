// const mainTableColumns = import('./client/src/HelperFiles/mainTableColumns.js');
//import mainTableColumns from './client/src/HelperFiles/mainTableColumns.js';

const client = require('./connection.js');
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

//used if we want to accsess all sources
const sourceOptions = ["primary_source", "secondary_source", "tertiary_source"];


const master = 'master_demo_status_and_relevance';
// const master = 'master';
const mini_master = 'mini_master';
const master_contacts = 'master_contacts';

//fields that will be searched in when the user inputs anything the browse search bar
// - there's probably a more eligant way to do this by retreiving the columns in the main table,
// or somehow importing data from the 'mainTableColumns.js' file
const searchableFields = [
    'school_name',
    'website',
    'country',
    'address',
    'city',
    'phone_number',
    'millie_code',
    'primary_source',
    'secondary_source',
    'tertiary_source',
    'tuition_usd',
    'tuition_local',
    'status',
]

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    console.log('precess.env: ', process.env.REACT_APP_API_KEY);
});
app.use(cors());

client.connect();

//all the schools in mini_master with all their parameters => mainly for the browse page
app.get('/schools-list/mini_master', (req, res) => {
    const query = `select * from ${mini_master}`;
    client.query(query, (err, result) => {
        if(!err){
            res.send(result.rows); 
        } 
    });
    client.end;
});

//return all column names that exist in the table name (either mini_master or master)
app.get('/all-column-names/:file_name', (req, res) => {
    
    const file_name = req.params['file_name'];

    const query_getColumns = 
    `SELECT column_name
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME = '${file_name}';`;


    client.query(query_getColumns, (err, result) => {
        if(!err){
            var objArray = result.rows;
            columns = objArray.map(a => a['column_name']);
            res.send(columns);
        } 
    });

});


//return results based on the input of the search bar
app.get('/schools-list/search/:search', (req, res) => {
    
    // select * 
    // from mini_master 
    // WHERE lower(school_name) LIKE '%word%'
    // OR lower(country) LIKE '%word%'
    // OR ...

    // const searchQuery = req.params['search'] ? req.params['search'] : 'all';
    const searchQuery = req.params['search'];
    var query = `select * from ${master}`;

    if (searchQuery !== 'all') {
        for (var i = 0; i < searchableFields.length; i++){
            if (i === 0) {
                query = query + ' WHERE ';
            } else {
                query = query + ' OR ';
            }
            query = query + `lower(${searchableFields[i]}) LIKE '%${searchQuery}%'`;
        }
    }

    client.query(query, (err, result) => {
        if(!err){
            res.send(result.rows);
        } 
    });

    client.end;
});


//filter the schools based on the queries given
app.get('/schools-list/', (req, res) => {

    // select * 
    // from master 
    // WHERE lower(school_name) LIKE '%word%'
    // OR lower(country) LIKE '%word%'
    // OR ...


    const reqQueries = req.query; //form is { country: 'Canada', primary_source: 'AP', ... }
    var query = `SELECT * FROM ${master}`;
    console.log("reqQueries: ", reqQueries);

    //if the user uses the search bar, return any row with that string
    if (reqQueries.hasOwnProperty('search')){
        const searchQuery = req.query['search'].toLowerCase();

        if (searchQuery !== 'all') {
            for (var i = 0; i < searchableFields.length; i++){
                if (i === 0) {
                    query = query + ' WHERE ';
                } else {
                    query = query + ' OR ';
                }
                query = query + `lower(${searchableFields[i]}) LIKE '%${searchQuery}%'`;
            }
        }
        
        client.query(query, (err, result) => {
            if(!err){
                res.send(result.rows);
            } 
        });
        client.end;

    } else {

        let queryKeys = Object.keys(reqQueries);

        for (var i = 0; i < queryKeys.length; i++){
            var key = queryKeys[i];
            var value = reqQueries[key];

            if (i === 0){
                query = query + ' WHERE ';
            } else {
                query = query + ' AND ';
            }

            //if the keys include a source selection, we must search through all sources 
            if (key === "source") {
                let primaryQ = `primary_source = '${value}'`;
                let secondaryQ = `secondary_source = '${value}'`;
                let tertiaryQ = `tertiary_source = '${value}'`;
                query = query + `(${primaryQ} OR ${secondaryQ} OR ${tertiaryQ})`;
            } else if (key === "source_count"){
                let queryString = ""
                switch (value) {
                    case "1":
                        queryString = `primary_source IS NOT null 
                                AND secondary_source IS null 
                                AND tertiary_source IS null`;
                        break;
                    case "2":
                        queryString = `primary_source IS NOT null 
                                AND secondary_source IS NOT null 
                                AND tertiary_source IS null`;
                        break;
                    case "3":
                        queryString = `primary_source IS NOT null 
                                AND secondary_source IS NOT null 
                                AND tertiary_source IS NOT null`;
                        break;
                    
                }
                query = query + queryString;
            } else {  
                let queryString = `${key} = '${value}'`;
                query = query + queryString;
            }
        
        }

        console.log("query: ", query);

        client.query(query, (err, result) => {
            if(!err){
                res.send(result.rows); 
            } 
        });
        client.end;
    }

});


//return all the schools info based on it's millie code
app.get('/school-details/:millie_code', (req, res) => {
    const millie_code = req.params['millie_code'];

    const query = 
    `select * from ${master}, ${mini_master}
    where ${master}.millie_code = '${millie_code}' 
    and ${mini_master}.millie_code = '${millie_code}'`;

    client.query(query, (err, result) => {
        if(!err){
            res.send(result.rows); 
        } 
    });
    client.end;
});

//return the contact points for a school based on the millie code
app.get('/school-details/:millie_code/contacts', (req, res) => {
    const millie_code = req.params['millie_code'];

    const query = 
    `select * from ${master_contacts} 
    where millie_code = '${millie_code}'`;

    client.query(query, (err, result) => {
        if(!err){
            res.send(result.rows); 
        } 
    });
    client.end;
});


//return all options for a specific column (field)
//ex. column name may be 'school_name', 'country', etc.
app.get('/all-options/:column_name', (req, res) => {
    const column = req.params['column_name'];
    const query = 
    `select DISTINCT ${column}
    from ${master}
    where ${column} is not null`;

    client.query(query, (err, result) => {
        if(!err){
            res.send(result.rows); 
        } 
    });
    client.end;
});

//return all the existing source options from primary_source, secondary_source, tertiary_source
app.get('/all-sources', (req, res) => {

    // const sourceOptions = ["primary_source", "secondary_source", "tertiary_source"];
    var queries = new Array();
    for (let option of sourceOptions) {
        const query = 
        `select DISTINCT ${option}
        from ${master}
        where ${option} is not null`;
        queries.push(query);
    }
    var sourceSet = new Set();


    //check primary_source
    client.query(queries[0], (err0, result0) => {
        if(err0){
            return "error: " + err0;
        }
        const arr0 = result0.rows;
        for (var j = 0; j < arr0.length; j++){
            sourceSet.add(arr0[j][sourceOptions[0]]);
        }

         //check secondary_source
        client.query(queries[1], (err1, result1) => {
            if (err1){
                return "error: " + err1;
            }
            const arr1 = result1.rows;
            for (var j = 0; j < arr1.length; j++){
                sourceSet.add(arr1[j][sourceOptions[1]]);
            }

            //check tertiary_source
            client.query(queries[2], (err2, result2) => {
                if (err2){
                    return "error: " + err2;
                }

                const arr2 = result2.rows;
                for (var j = 0; j < arr2.length; j++){
                    sourceSet.add(arr2[j][sourceOptions[2]]);
                }

                let sourceArr = Array.from(sourceSet);
                var sourceObjArr = new Array();

                for (let i in sourceArr){
                    sourceObjArr.push({"source" : sourceArr[i]});
                }

                res.send(sourceObjArr); 
            });
        });
    });

    client.end;
});


//return the number of possible sources that exist for the schools
//currently they are 3: primary_source, secondary_source, tertiary_source
app.get('/source_count', (req, res) => {
    var options = [];
    for (var i = 0; i < sourceOptions.length; i++){
        var num = i+1
        options.push({source_count : num.toString()});
    }
    res.send(options); 
});