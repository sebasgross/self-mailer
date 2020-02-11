const express = require('express');
const router  = express.Router();
const nodemailer = require('nodemailer');
const json = require('../constants/email');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
  

});

router.post('/send-email', (req, res, next) => {
  // let { email, subject, name, intro, usp } = req.body;
  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
       ciphers:'SSLv3'
    },
 
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD 
    }
  });

  let emails = json;

  if (emails.length > 0){
    let email = emails[0];

    transporter.sendMail({
      from: process.env.EMAIL,
      to: email.email, 
      subject: "Interviewing you For The Rebound Podcast", 
      html: `Hello ${email.name}, <br> </br>
  
      ${email.intro}
      
      I’m a student at IE University and the co-founder of The Rebound Project. We support young people struggling with personal adversity via relatable insights, meaningful knowledge and practical tools to help them make real change in their lives. <br> </br>
      
      
      So far, we’ve had deeply insightful conversations with a range of leaders in their space and masters of their art, including athletes  (Bethany Hamilton, Charlie Engle), best-selling authors (Tal Ben Shahar, Stephen G. Post), and nutritionist (Steven Gundry). Specifically, these interviews have unearthed the tools and approach young people can use in their own lives to overcome adversity.<br> </br>
      
      
     <b>Are you open to be interviewed for the Rebound Podcast?</b> Typically, it’s a 40-minute time commitment - 10-min for a little warm-up convo, and 30-minutes for the recorded (remote) video interview portion. ${email.usp} <br> </br>`
    })
    emails.shift();
    return
  } else {
    next()
  }

  // emails.forEach((email, index) => {

// })
  // .then(info => res.status(200).send(info))
  // .catch(error => console.log(error));

});


//GOOGLE

// // If modifying these scopes, delete token.json.
// const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// // The file token.json stores the user's access and refresh tokens, and is
// // created automatically when the authorization flow completes for the first
// // time.
// const TOKEN_PATH = 'token.json';

// // Load client secrets from a local file.
// fs.readFile('credentials.json', (err, content) => {
//   if (err) return console.log('Error loading client secret file:', err);
//   // Authorize a client with credentials, then call the Google Sheets API.
//   authorize(JSON.parse(content), listMajors);
// });

// /**
//  * Create an OAuth2 client with the given credentials, and then execute the
//  * given callback function.
//  * @param {Object} credentials The authorization client credentials.
//  * @param {function} callback The callback to call with the authorized client.
//  */
// function authorize(credentials, callback) {
//   const {client_secret, client_id, redirect_uris} = credentials.installed;
//   const oAuth2Client = new google.auth.OAuth2(
//       client_id, client_secret, redirect_uris[0]);

//   // Check if we have previously stored a token.
//   fs.readFile(TOKEN_PATH, (err, token) => {
//     if (err) return getNewToken(oAuth2Client, callback);
//     oAuth2Client.setCredentials(JSON.parse(token));
//     callback(oAuth2Client);
//   });
// }

// /**
//  * Get and store new token after prompting for user authorization, and then
//  * execute the given callback with the authorized OAuth2 client.
//  * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
//  * @param {getEventsCallback} callback The callback for the authorized client.
//  */
// function getNewToken(oAuth2Client, callback) {
//   const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: SCOPES,
//   });
//   console.log('Authorize this app by visiting this url:', authUrl);
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });
//   rl.question('Enter the code from that page here: ', (code) => {
//     rl.close();
//     oAuth2Client.getToken(code, (err, token) => {
//       if (err) return console.error('Error while trying to retrieve access token', err);
//       oAuth2Client.setCredentials(token);
//       // Store the token to disk for later program executions
//       fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
//         if (err) return console.error(err);
//         console.log('Token stored to', TOKEN_PATH);
//       });
//       callback(oAuth2Client);
//     });
//   });
// }

// /**
//  * Prints the names and majors of students in a sample spreadsheet:
//  * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
//  * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
//  */
// function listMajors(auth) {
//   const sheets = google.sheets({version: 'v4', auth});
//   sheets.spreadsheets.values.get({
//     spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
//     range: 'Class Data!A2:E',
//   }, (err, res) => {
//     if (err) return console.log('The API returned an error: ' + err);
//     const rows = res.data.values;
//     if (rows.length) {
//       console.log('Name, Major:');
//       // Print columns A and E, which correspond to indices 0 and 4.
//       rows.map((row) => {
//         console.log(`${row[0]}, ${row[4]}`);
//       });
//     } else {
//       console.log('No data found.');
//     }
//   });
// }
module.exports = router;
