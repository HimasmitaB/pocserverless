'use strict';
const db = require('./db_connect');

// module.exports.hello = async event => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: 'Go Serverless v1.0! Your function executed successfully!',
//         input: event,
//       },
//       null,
//       2
//     ),
//   };

//   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
// };

module.exports.createEmployee = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log("create employee:"+ JSON.stringify(event.body))
  const data = JSON.parse(event.body);
  db.insert('m_employee', data)
    .then(res => {
      callback(null,{
        statusCode: 200,
        body: "Employee Created!" + res
      })
    })
    .catch(e => {
      callback(null,{
        statusCode: e.statusCode || 500,
        body: "Could not create employee " + e
      })
    }) 
};

module.exports.getEmployee = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  db.getById('m_employee', event.pathParameters.empid)
    .then(res => {
      callback(null,{
        statusCode: 200,
        body: JSON.stringify(res)
      })
    })
    .catch(e => {
      callback(null,{
        statusCode: e.statusCode || 500,
        body: "Could not find emplyee: " +e
      })
    })
};

// module.exports.getAllEmployees = (event, context, callback) => {
//   context.callbackWaitsForEmptyEventLoop = false;
//   db.getAll('m_employee')
//     .then(res => {
//       callback(null, {
//         statusCode: 200,
//         body: JSON.stringify(res)
//       })
//     })
//     .catch(e => {
//       console.log(e);
//       callback(null, {
//         statusCode: e.statusCode || 500,
//         body: 'Error: Could not find emloyee: ' + e
//       })
//     })
// };

module.exports.updateEmployee = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const data = JSON.parse(event.body);
  db.updateById('m_employee', event.pathParameters.empid, data)
    .then(res => {
      callback(null,{
        statusCode: 200,
        body: "Emplyee Updated!" + res
      })
    })
    .catch(e => {
      callback(null,{
        statusCode: e.statusCode || 500,
        body: "Could not update Employee" + e
      })
    }) 
};

module.exports.deleteEmployee = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  db.deleteById('m_employee', event.pathParameters.empid)
    .then(res => {
      callback(null,{
        statusCode: 200,
        body: "Employee Deleted!"
      })
    })
    .catch(e => {
      callback(null,{
        statusCode: e.statusCode || 500,
        body: "Could not delete Employee" + e
      })
    }) 
};