const mongoose = require('mongoose');
const User = require('../models/User'); // Adjust the path as necessary

const seedUsers = async () => {
  await mongoose.connect('mongodb://localhost:27017/FaceGram', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  });

  const users = [
    {
      fullName: "John Doe",
      userName: "johndoe",
      email: "john.doe@example.com",
      password: "password1",
      phoneNumber: 1234567890,
      country: "USA"
    },
    {
      fullName: "Jane Smith",
      userName: "janesmith",
      email: "jane.smith@example.com",
      password: "password2",
      phoneNumber: 1234567891,
      country: "USA"
    },
    {
      fullName: "Alice Johnson",
      userName: "alicejohnson",
      email: "alice.johnson@example.com",
      password: "password3",
      phoneNumber: 1234567892,
      country: "Canada"
    },
    {
      fullName: "Bob Brown",
      userName: "bobbrown",
      email: "bob.brown@example.com",
      password: "password4",
      phoneNumber: 1234567893,
      country: "UK"
    },
    {
      fullName: "Charlie Davis",
      userName: "charliedavis",
      email: "charlie.davis@example.com",
      password: "password5",
      phoneNumber: 1234567894,
      country: "Australia"
    },
    {
      fullName: "David Evans",
      userName: "davidevans",
      email: "david.evans@example.com",
      password: "password6",
      phoneNumber: 1234567895,
      country: "India"
    },
    {
      fullName: "Emma Wilson",
      userName: "emmawilson",
      email: "emma.wilson@example.com",
      password: "password7",
      phoneNumber: 1234567896,
      country: "Germany"
    },
    {
      fullName: "Frank Harris",
      userName: "frankharris",
      email: "frank.harris@example.com",
      password: "password8",
      phoneNumber: 1234567897,
      country: "France"
    },
    {
      fullName: "Grace Clark",
      userName: "graceclark",
      email: "grace.clark@example.com",
      password: "password9",
      phoneNumber: 1234567898,
      country: "Italy"
    },
    {
      fullName: "Henry Moore",
      userName: "henrymoore",
      email: "henry.moore@example.com",
      password: "password10",
      phoneNumber: 1234567899,
      country: "Spain"
    },
    {
      fullName: "Ivy Martinez",
      userName: "ivymartinez",
      email: "ivy.martinez@example.com",
      password: "password11",
      phoneNumber: 1234567800,
      country: "Mexico"
    },
    {
      fullName: "Jack Lewis",
      userName: "jacklewis",
      email: "jack.lewis@example.com",
      password: "password12",
      phoneNumber: 1234567801,
      country: "Brazil"
    },
    {
      fullName: "Karen Walker",
      userName: "karenwalker",
      email: "karen.walker@example.com",
      password: "password13",
      phoneNumber: 1234567802,
      country: "Argentina"
    },
    {
      fullName: "Liam Young",
      userName: "liamyoung",
      email: "liam.young@example.com",
      password: "password14",
      phoneNumber: 1234567803,
      country: "South Africa"
    },
    {
      fullName: "Mia King",
      userName: "miaking",
      email: "mia.king@example.com",
      password: "password15",
      phoneNumber: 1234567804,
      country: "Egypt"
    },
    {
      fullName: "Nathan Wright",
      userName: "nathanwright",
      email: "nathan.wright@example.com",
      password: "password16",
      phoneNumber: 1234567805,
      country: "Nigeria"
    },
    {
      fullName: "Olivia Scott",
      userName: "oliviascott",
      email: "olivia.scott@example.com",
      password: "password17",
      phoneNumber: 1234567806,
      country: "Japan"
    },
    {
      fullName: "Paul Green",
      userName: "paulgreen",
      email: "paul.green@example.com",
      password: "password18",
      phoneNumber: 1234567807,
      country: "South Korea"
    },
    {
      fullName: "Quinn Baker",
      userName: "quinnbaker",
      email: "quinn.baker@example.com",
      password: "password19",
      phoneNumber: 1234567808,
      country: "China"
    },
    {
      fullName: "Ryan Adams",
      userName: "ryanadams",
      email: "ryan.adams@example.com",
      password: "password20",
      phoneNumber: 1234567809,
      country: "India"
    },
    {
      fullName: "Sophia Turner",
      userName: "sophiaturner",
      email: "sophia.turner@example.com",
      password: "password21",
      phoneNumber: 1234567810,
      country: "Russia"
    },
    {
      fullName: "Thomas Hill",
      userName: "thomashill",
      email: "thomas.hill@example.com",
      password: "password22",
      phoneNumber: 1234567811,
      country: "Turkey"
    },
    {
      fullName: "Uma Campbell",
      userName: "umacampbell",
      email: "uma.campbell@example.com",
      password: "password23",
      phoneNumber: 1234567812,
      country: "Iran"
    },
    {
      fullName: "Victor Collins",
      userName: "victorcollins",
      email: "victor.collins@example.com",
      password: "password24",
      phoneNumber: 1234567813,
      country: "Iraq"
    },
    {
      fullName: "Wendy Sanders",
      userName: "wendysanders",
      email: "wendy.sanders@example.com",
      password: "password25",
      phoneNumber: 1234567814,
      country: "USA"
    }
  ];

  try {
    await User.deleteMany({});
    await User.insertMany(users);
    console.log("Data Seeded");
    mongoose.connection.close();
  } catch (error) {
    console.error(error);
    mongoose.connection.close();
  }
};

seedUsers();
