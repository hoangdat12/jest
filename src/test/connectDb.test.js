const connectDb = require('../connect/connectMysql'); // Import the function to connect to the database

let dbConnection; // Declare a variable to store the database connection

// Setup before all tests
beforeAll(async () => {
  try {
    dbConnection = await connectDb(); // Establish a database connection
    console.log('Database connection established');
  } catch (err) {
    console.error('Error connecting to the database:', err);
    throw err;
  }
});

// Teardown after all tests
afterAll(async () => {
  if (dbConnection) {
    try {
      await dbConnection.end(); // Close the database connection
      console.log('Database connection closed');
    } catch (err) {
      console.error('Error closing the database connection:', err);
    }
  }
});

const createUser = async (user) => {
  const [result] = await dbConnection.execute(
    'INSERT INTO User (email, first_name, last_name, password) VALUES (?, ?, ?, ?)',
    [user.email, user.firstName, user.lastName, user.password]
  );

  // Check if the insert was successful and the insertId is available
  if (result.affectedRows === 1 && result.insertId) {
    // Fetch the newly created user based on the insertId
    const [userRows] = await dbConnection.execute(
      'SELECT * FROM User WHERE id = ?',
      [result.insertId]
    );

    // Return the first row, which should be the newly created user
    return userRows[0];
  } else {
    // Handle the case where the insert was not successful
    throw new Error('User creation failed');
  }
};

// Individual test case
it('should establish a database connection', () => {
  expect(dbConnection).toBeDefined();
});

// Another test case to test a specific database operation
it('should create new User', async () => {
  // Replace this with an actual database query or operation
  const user = {
    email: 'test@gmail.com',
    firstName: 'Hoang',
    lastName: 'Dat',
    password: '123456',
  };
  const newUser = await createUser(user);
  expect(newUser).toBeDefined();
});

it('should return error', async () => {
  // Replace this with an actual database query or operation
  try {
    const user = {
      email: 'test@gmail.com',
      firstName: 'Hoang',
      lastName: 'Dat',
      password: '123456',
    };
    const newUser = await createUser(user);
    expect(newUser).toBeDefined();
  } catch (error) {
    console.log('error::: ', error);
    expect(error.message).toContain('Duplicate entry');
  }
});

it('should return an error if password is missing', async () => {
  const userWithoutPassword = {
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
  };

  try {
    await createUser(userWithoutPassword);
  } catch (error) {
    console.log(error);
    expect(error.message).toContain('NULL');
  }
});
