// init database
const users = require("../data/users");
const parks = require("../data/parks");
const activities = require("../data/activities");
const appointments = require("../data/appointments");
const comments = require("../data/comments");
const reviews = require("../data/reviews");

const dbConnection = require('../config/mongoConnection');
const { getPark, getParkByName } = require("../data/parks");

async function test() {
  const db = await dbConnection.connectToDb();
  await db.dropDatabase();

  console.log('------------Init Users------------');
  const user1 = await users.createUser("Yuheng", "Xiao", "yxiao38@stevens.edu", "Xyh123456");
  const user2 = await users.createUser("Yue", "Qin", "qinyue12345@gmail.com", "qinyue12345");
  console.log('------------create users successfully------------');

  console.log('------------Init Parks------------');
  //Parks
  const columbus = await parks.createPark(
    "Columbus Park",
    "06:00",
    "22:00",
    "900 Clinton St, Hoboken, NJ 07030"
  ); //Activities: Playground, Tennis, Basketball
  console.log(columbus._id + " : " + columbus._id);
  const churchSquare = await parks.createPark(
    "Church Square Park",
    "06:00",
    "23:00",
    "400 Garden St, Hoboken, NJ 07030"
  ); //Activities: Dog Park, Basketball
  const madison = await parks.createPark(
    "Madison Park",
    "06:00",
    "22:00",
    "305 Monroe St, Hoboken, NJ 07030"
  ); //Activities: Playground
  const sinatra = await parks.createPark(
    "Sinatra Park",
    "00:01",
    "00:00",
    "500 Frank Sinatra Dr, Hoboken, NJ 07030"
  ); //Activities: Soccer
  const stevens = await parks.createPark(
    "Stevens Park",
    "08:00",
    "22:00",
    "401 Hudson St, Hoboken, NJ 07030"
  ); //Activities: Baseball
  const CP = await parks.createPark(
    "Castle Point Skatepark",
    "00:01",
    "00:00",
    "9 Castle Point Terrace, Hoboken, NJ 07030"
  ); //Activities: Skate
  const PC = await parks.createPark(
    "Pier C Park",
    "08:00",
    "22:00",
    "340 Sinatra Dr, Hoboken, NJ 07030"
  ); //Activities: Playground
  const PA = await parks.createPark(
    "1600 Park",
    "07:00",
    "22:00",
    "340 Sinatra Dr, Hoboken, NJ 07030"
  ); //Activities: Soccer
  await parks.updateParkImg(columbus._id, "/public/img/columbus.jpg");
  await parks.updateParkImg(churchSquare._id, "/public/img/church.jpg");
  await parks.updateParkImg(madison._id, "/public/img/madison.jpg");
  await parks.updateParkImg(sinatra._id, "/public/img/sinatra.jpg");
  await parks.updateParkImg(stevens._id, "/public/img/stevens.jpg");
  await parks.updateParkImg(CP._id, "/public/img/castlePoint.jpg");
  await parks.updateParkImg(PC._id, "/public/img/pierC.jpg");
  await parks.updateParkImg(PA._id, "/public/img/1600park.jpg");
  console.log('------------create parks successfully------------');

  console.log('------------Init Activities------------');
  // create a new activities:
  const playgroundColumbus = await activities.createActivity(
    columbus._id.toString(),
    "Playground Columbus Park",
    "1",
    "20"
  );
  const TennisColumbus = await activities.createActivity(
    columbus._id.toString(),
    "Tennis Columbus Park",
    "2",
    "4"
  );
  const BasketballColumbus = await activities.createActivity(
    columbus._id.toString(),
    "Basketball Columbus Park",
    "1",
    "10"
  );
  console.log('------------create activities successfully------------');

  console.log('------------Init Appointments------------');
  const appointment1 = await appointments.createAppointment(user1._id, churchSquare._id, playgroundColumbus._id, "2022", "4", "16", "5", "20");
  console.log('------------create appointments successfully------------');

  console.log('------------Init Comments------------');
  await comments.createComment(churchSquare._id, 4.55, "nice park!");
  await comments.createComment(columbus._id, 4.75, "amazing!");
  await comments.createComment(madison._id, 4.75, "god!");
  console.log('------------create comments successfully------------');

  console.log('------------Init Reviews------------');
  const review1 = await reviews.createReview(user1._id, "nice!!!!!");
  console.log('------------create reviews successfully------------');

  await dbConnection.closeConnection();
}

test();