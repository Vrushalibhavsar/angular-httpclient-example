var faker = require('faker');

var database = { users: []};

for (var i = 1; i<= 5; i++) {
  database.users.push({
    id: i,
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    username: faker.internet.userName(),
    city: faker.address.city(),
    department: faker.commerce.department()
  });
}

console.log(JSON.stringify(database));
