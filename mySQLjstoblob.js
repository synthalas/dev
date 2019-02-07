/*
 DDL:
 CREATE TABLE `bindata` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `data` BLOB,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
*/

const fs = require("fs");
const mysql = require("mysql");

pool = mysql.createPool({
  "connectionLimit": 10,
  "host": "localhost",
  "port": 3306,
  "user": "root",
  "password": "zVHkNKvQxJgGaymG",
  "database": "test",
  "timezone": 'utc',
  // Enables query format like this: 
  // `connection.query("UPDATE x SET col=:v1" , { v1: 999 }, ...`
  //
  // NOTE: How to insert binary data:
  // ```
  // // Read BLOB:
  // pool.query(`SELECT * FROM example`, function(err, res) {
  //   const buf = new Buffer(res[0].data); // `data` column type is BLOB! 
  //   // Write BLOB:
  //   pool.query("INSERT INTO example(data) VALUES(BINARY(:buf))", { buf }, ...);
  // }
  // ```
  queryFormat: function(query, values) {
    if (!values) return query;
    return query.replace(/\:(\w+)/g, function(txt, key) {
      if (values.hasOwnProperty(key)) {
        return this.escape(values[key]);
      }
      return txt;
    }.bind(this));
  }
});

const inputfile = "data.png";
const outputfile = "output.png";

// Read buffer of an image file:
const data = readImageFile(inputfile); // `data`'s type is Buffer

pool.query("INSERT INTO `bindata`(data) VALUES(BINARY(:data))", { data }, function(err, res) {
  if (err) throw err;
  console.log("BLOB data inserted!");
  // Check to read it from DB:
  pool.query("select * from `bindata`", function(err, res) {
    if (err) throw err;
    const row = res[0];
    // Got BLOB data:
    const data = row.data;
    console.log("BLOB data read!");
    // Converted to Buffer:
    const buf = new Buffer(data, "binary");
    // Write new file out:
    fs.writeFileSync(outputfile, buf);
    console.log("New file output:", outputfile);
  });
});

function readImageFile(file) {
  // read binary data from a file:
  const bitmap = fs.readFileSync(file);
  const buf = new Buffer(bitmap);
  return buf;
}