# Cluck Cluck Company

This is a platform built for a chicken farm, Cluck Cluck Company, for owners to sell eggs online and customers to place orders.

## Installation

This project is built upon Express, Node.js, and Mongoose, and uses Nodemon, bodyParser, and Pug files.
For Node.js installation, follow the instructions on nodejs.org to download and install the latest version.
For MongoDB installation, follow the instructions on mongodb.com to download and install the latest MongoDB release.

Download the .zip file and extract to a local directory. Open the command line, go to the directory where the files are extracted, and use the call script
```
npm install
```

## Usage

In order to run the website, call
```
npm start
```
in the directory and open http://localhost:3000 on your web browser.

## Features

The website has two main components: a platform for hen owners, and a platform for customers to order eggs.

In order to properly use the website, go to the owner platform first and add hens in the 'Add Hens' form; this form includes details such as a hen's name, breed, description, and the date of its first laid egg; calculations in this project operate under the assumption that each hen has laid and will continue to lay one egg every day since its first egg.. Once hens have been added, the owner side displays a list of hens and their details.

Once hens have been added, the customer side can be used. The customer platform does not see all the details about the hens, such as when they first laid their eggs; instead, this is replaced by the number of eggs available from each hen, as well as an additional column with dropdown menus for customers to order up to two dozen eggs. Once a hen's eggs run out, customers will be unable to order any from that particular hen until the next day, when one egg will be available.

## Contributors

Alyssa Cong (solo track project)

## License
[MIT](https://choosealicense.com/licenses/mit/)
