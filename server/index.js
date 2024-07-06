const express = require('express');
const cors = require('cors')
const oracledb = require('oracledb');
const app = express();
//oracledb.initOracleClient({libDir: 'C:\\oracle\\instantclient_21_13'})
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())


const dbConfig = {
  user: 'HR',
  password: '123',
  connectString: 'localhost/xe'
};


  
  function convertToArrayOfObjects(array) {
    // Initialize an empty array to store the converted objects
    let objectsArray = [];

    // Define labels for each value
    const labels = ['requestId', 'hospitalId', 'bloodType', 'quantity', 'status', 'requestDate', 'patientId'];

    // Iterate over each inner array
    array.forEach(innerArray => {
        // Create an object with specific keys and corresponding values from the inner array
        let obj = {};
        innerArray.forEach((value, index) => {
            obj[labels[index]] = value;
        });

        // Push the created object to the objectsArray
        objectsArray.push(obj);
    });

    // Return the array of objects
    return objectsArray;

}

function convertToArrayOfPatient(array) {
  // Initialize an empty array to store the converted objects
  let objectsArray = [];

  // Define labels for each value
  const labels = ['patientId', 'hospitalId','name','age','contact','gender', 'bloodType', 'quantity'];

  // Iterate over each inner array
  array.forEach(innerArray => {
      // Create an object with specific keys and corresponding values from the inner array
      let obj = {};
      innerArray.forEach((value, index) => {
          obj[labels[index]] = value;
      });

      // Push the created object to the objectsArray
      objectsArray.push(obj);
  });

  // Return the array of objects
  return objectsArray;

}

function convertToArrayOfDonor(array) {
  // Initialize an empty array to store the converted objects
  let objectsArray = [];

  // Define labels for each value
  const labels = ['donorId', 'bloodbankId','name','age','contact','gender', 'bloodType', 'quantity'];

  // Iterate over each inner array
  array.forEach(innerArray => {
      // Create an object with specific keys and corresponding values from the inner array
      let obj = {};
      innerArray.forEach((value, index) => {
          obj[labels[index]] = value;
      });

      // Push the created object to the objectsArray
      objectsArray.push(obj);
  });

  // Return the array of objects
  return objectsArray;

}

// Define your routes and middleware here
app.get('/getall',async (req, res) => {
    try {
      const connection = await oracledb.getConnection(dbConfig);
      const result = await connection.execute('SELECT * FROM blood_requests');
      await connection.close();
      
      res.json(convertToArrayOfObjects(result.rows));
    } catch (err) {
      console.error('Error querying database', err);
      res.status(500).send('Error querying database');
    }
  })  
  app.post('/add-donor', async (req, res) => {
    try {
      // Extract parameters from request body
      const { name, blood_bank_id, blood_group, contact, age, quantity, gender } = req.body;
  
      // Connect to the Oracle database
      const connection = await oracledb.getConnection(dbConfig);
  
      // Execute the stored procedure
      const result = await connection.execute(
        `BEGIN AddDonor(:name, :blood_bank_id, :bloodType, :contactNumber, :age, :quantity, :gender); END;`,
        { 
          name: name,
          blood_bank_id: blood_bank_id,
          bloodType: blood_group,
          contactNumber: contact,
          age: age,
          quantity: quantity,
          gender: gender
        }
      );
  
      
        await connection.close()
      // Send success response
      res.send('Donor added successfully');
    } catch (error) {
      console.error('Error adding donor:', error);
      res.status(500).send('Error adding donor');
    }
  });

  app.get(`/getallpatient/`,async (req, res) => {
    let id=req.query.id;  
    try {
      const connection = await oracledb.getConnection(dbConfig);
      
      const result = await connection.execute(`SELECT * FROM PATIENT WHERE hospital_id=:id`
     ,[id]);
      await connection.close();
      res.json(convertToArrayOfPatient(result.rows));
    } catch (err) {
      console.error('Error querying database', err);
      res.status(500).send('Error querying database');
    }
  })
  app.get('/getalldonor',async (req, res) => {
    let id = req.query.id
    try {
      const connection = await oracledb.getConnection(dbConfig);
      
      const result = await connection.execute(`SELECT * FROM DONOR WHERE blood_bank_id=:id`
     ,[id]);
      await connection.close();
      
      res.json(convertToArrayOfDonor(result.rows));
    } catch (err) {
      console.error('Error querying database', err);
      res.status(500).send('Error querying database');
    }
  })
  



  
  app.post('/add_patient',async (req, res) => {
    try {
      const {hospital_id,name,age,contact,gender,blood_group,quantity} = req.body
      const connection = await oracledb.getConnection(dbConfig);
      
      await connection.execute(
        `BEGIN
           AddPatient(:name, :hospital_id, :bloodType, :contactNumber, :age, :quantity, :gender);
         END;`,
        {
          name:name,
          hospital_id:hospital_id,
          bloodType:blood_group,
          contactNumber:contact,
          age:age,
          quantity:quantity,
          gender:gender
        }
      );
      await connection.close();
      res.send('Patient added successfully');
    } catch (err) {
      console.log(err);
      res.status(500).send('Error querying database');
    }
  })

  app.post('/get_hospital_info',async (req, res) => {
    try {
      const connection = await oracledb.getConnection(dbConfig);
      const result = await connection.execute(`SELECT * FROM HOSPITAL WHERE hospital_id=:id`,[req.body.id]);
      await connection.close();
      const jsonArray = convertListToJSON(result.rows);
      res.json(jsonArray);
    } catch (err) {
      console.error('Error querying database', err);
      res.status(500).send('Error querying database');
    }
  })

  function convertListToJSON(list) {
    // Initialize an empty array to store JSON objects
    const jsonArray = [];

    // Iterate over each entry in the list
    list.forEach(entry => {
        // Check if the entry has the correct format
        if (entry.length === 4) {
            const [id, name, location, number] = entry;
            // Construct a JSON object and push it to the array
            jsonArray.push({
                id: id,
                name: name,
                location: location,
                number: number
            });
        } else {
            console.error("Invalid entry format:", entry);
        }
    });

    // Return the array of JSON objects
    return jsonArray;
}
  app.post('/get_blood_bank_info',async (req, res) => {
    try {
      //console.log(req.body.id)
      const connection = await oracledb.getConnection(dbConfig)
      const result = await connection.execute(`SELECT * FROM BLOOD_BANK WHERE blood_bank_id=:id`,[req.body.id]);
      await connection.close();
      const jsonArray = convertListToJSON(result.rows);
      res.json(jsonArray);
    } catch (err) {
      console.error('Error querying database', err);
      res.status(500).send('Error querying database');
    }
  })

  app.post('/approveBloodRequest', async(req, res) => {
    const requestId = req.body.requestId;
    const connection = await oracledb.getConnection(dbConfig)
    const sql = `BEGIN ApproveBloodRequest(:requestId); END;`;
    
    connection.execute(sql, { requestId: requestId }, (error, results) => {
        if (error) {
            console.error('Error approving blood request:', error);
            res.status(500).send('Error approving blood request');
        } else {
            res.send('Blood request approved successfully');
        }
    });
    connection.close()
    
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

async function closePoolAndExit() {
    await oracledb.getPool().close();
    process.exit(0);
  }
  
  process.on('SIGINT', closePoolAndExit);
  process.on('SIGTERM', closePoolAndExit);
  
