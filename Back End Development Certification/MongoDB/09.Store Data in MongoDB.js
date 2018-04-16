//Documentation
/*
## Resources:
 3rd:
  * http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#find
  * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
 4th
  * http://docs.mongodb.org/manual/reference/method/db.collection.find/#explicitly-exclude-the-id-field
 5th
  * http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#insert
 6th
  * http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#update
  * http://docs.mongodb.org/manual/tutorial/modify-documents/
  * http://docs.mongodb.org/manual/reference/operator/update/set/#set
 7th
  * http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#remove
 8th
  * http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#count
 9th
  * http://docs.mongodb.org/manual/aggregation/
  * http://docs.mongodb.org/manual/core/aggregation-introduction/
  * http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#aggregate
*/

//3rd assgn: FIND
/*
Here we will learn how to search for documents.

In this exercise the database name is learnyoumongo.
So, the url would be something like: mongodb://localhost:27017/learnyoumongo

Use the parrots collection to find all documents where age
is greater than the first argument passed to your script.

Using console.log, print the documents to stdout.

-------------------------------------------------------------------------------

## HINTS

To connect to the database, one can use something like this:

    var mongo = require('mongodb').MongoClient
    mongo.connect(url, function(err, db) {
      // db gives access to the database
    })

To get a collection, one can use db.collection('<collection name>').

To find a document or documents, one needs to call find() on the collection.

Find is a little bit different than what we are used to seeing.

To access the arguments you can use the process.argv array of strings (the first argument is stored at the third position process.argv[2]). To convert to an integer, you could use parseInt()

Here is an example:

    collection.find({
      name: 'foo'
    }).toArray(function(err, documents) {
    
    })

If your program does not finish executing, you may have forgotten to
close the db. That can be done by calling db.close() after you
have finished.


*/
var mongo = require('mongodb').MongoClient
var age = process.argv[2]

var url = 'mongodb://localhost:27017'


// Database Name
const dbName = 'learnyoumongo';

mongo.connect(url, function(err, client) {
  if (err) throw err;
  
  const db = client.db(dbName);
  
  var parrots = db.collection('parrots')
  parrots.find({
    age: {
      $gt: +age
    }
  }).toArray(function(err, docs) {
    if (err) throw err
    console.log(docs)
    client.close()
  })
})

//4th assgn: FIND PROJECT
/*
Here we will learn how to search for documents but only fetch the fields
we need. Also known as projection in MongoDB

Use the parrots collection from the database named learnyoumongo to
find all documents where age is greater than the first argument
passed to your script.

The difference from the last lesson will be that we only want the
name and age properties

Using console.log, print the documents to stdout.

-------------------------------------------------------------------------------

## HINTS

To find a document or documents, one needs to call find() on the collection.

Find is a little bit different than what we are used to seeing.

Here is an example:

    collection.find({
      name: 'foo'
    }, {
      name: 1
    , age: 1
    , _id: 0
    }).toArray(function(err, documents) {
    
    })

If your program does not finish executing, you may have forgotten to
close the db. That can be done by calling db.close() after you
have finished.

*/
var mongo = require('mongodb').MongoClient
var age = process.argv[2]

var url = 'mongodb://localhost:27017'

// Database Name
const dbName = 'learnyoumongo';

mongo.connect(url, function(err, client) {
  if (err) throw err;
  const db = client.db(dbName);
  const parrots = db.collection('parrots')
  parrots.find({
    age: {
      $gt: +age
    }
  }).project({ _id: 0, name: 1, age: 1}).toArray(function(err, docs) {
    if (err) throw err
    console.log(docs)
    client.close()
  })
})

//5th assgn: INSERT
/*
Connect to MongoDB on port 27017.
You should connect to the database named learnyoumongo and insert
a document into the docs collection.

The document should be a json document with the following properties:

  * `firstName`
  * `lastName`

firstName will be passed as the first argument to the lesson.

lastName will be passed as the second argument to the lesson.

Use console.log to print out the object used to create the document.

Make sure you use JSON.stringify convert it to JSON.

-------------------------------------------------------------------------------

## HINTS

Remember, one can access the arguments passed by using process.argv.

In order to use the mongo package, one must first require it like:

    var MongoClient = require('mongodb').MongoClient

To connect, use the connect() function of MongoClient.

Ex.

    MongoClient.connect(url, function(err, db) {
      if (err) throw err

    })

If you get a Connection Refused error, make sure that mongod is still
running.

After you have successfully connected, you will need to specify a collection.
That can be done by calling the collection() function on the db returned
in the callback to connect.

Say you wanted to specify a collection named users:

    var collection = db.collection('users')

To insert a document, one would need to call insert() on the collection, like this:


    // inserting document
    // { a : 2 }
    collection.insert({
      a: 2
    }, function(err, data) {
      // handle error
    
      // other operations
    })

If your program does not finish executing, you may have forgotten to
close the db. That can be done by calling db.close() after you
have finished.

*/
var mongo = require('mongodb').MongoClient

var firstName = process.argv[2]
var lastName = process.argv[3]
var doc = {
  firstName: firstName
, lastName: lastName
}

var url = 'mongodb://localhost:27017'

// Database Name
const dbName = 'learnyoumongo';

mongo.connect(url, function(err, client) {
  if (err) throw err;
  const db = client.db(dbName);
  
  const collection = db.collection('docs')
  collection.insert(doc, function(err, data) {
    if (err) throw err
    console.log(JSON.stringify(doc))
    client.close()
  })
})

//6th assgn: UPDATE
/*
Here we are going to update a document in the users collection.

The database name will be accessible via process.argv[2].

Say we have a user defined like:

    {
      "name": "Tina",
      "age": 30,
      "username": "tinatime"
    }

We want to change Tina's age from 30 to 40.

For the purpose of this lesson, assume that the username property is unique.

-------------------------------------------------------------------------------

## HINTS

To update a document, one would need to call update() on the collection.

Ex.

    
    // document
    // { a: 2, b: 3 }
    
    collection.update({
      a: 2
    }, {
      $set: {
        b: 1
      }
    }, callback)
    
    // document was updated
    // { a: 2, b: 1 }

The first argument to update() is the query. This query is what filters the documents that we are wanting to update. The second argument is an object of the properties to update. Pay close attention to the $set property. If we were to omit $set, the document would be replaced with the object represented by the second argument.

If your program does not finish executing, you may have forgotten to
close the db. That can be done by calling db.close() after you
have finished.

*/
var mongo = require('mongodb').MongoClient

var url = 'mongodb://localhost:27017'


// Database Name
const dbName = process.argv[2];

mongo.connect(url, function(err, client) {
  if (err) throw err;
  const db = client.db(dbName);
  var collection = db.collection('users')
  collection.update({
    username: 'tinatime'
  }, {
    $set: {
      age: 40
    }
  }, function(err) {
    if (err) throw err
    client.close()
  })
})

//7th assgn: REMOVE
/*
This lesson involves removing a document with the given _id.

The database name will be accessible via process.argv[2].

The collection name will be passed as the second argument to your script.

The _id will be passed as the third argument to your script.

-------------------------------------------------------------------------------

## HINTS

To remove a document, one would need to call remove() on the collection.

Ex.

    
    collection.remove({
      name: 'foo'
    }, callback)

The first argument to remove() is the query.

If your program does not finish executing, you may have forgotten to
close the db. That can be done by calling db.close() after you
have finished.

*/
var mongo = require('mongodb').MongoClient

var url = 'mongodb://localhost:27017'


// Database Name
const dbName = process.argv[2];

mongo.connect(url, function(err, client) {
  if (err) throw err;
  const db = client.db(dbName);

  var collection = db.collection(process.argv[3])
  collection.remove({
    _id: process.argv[4]
  }, function(err) {
    if (err) throw err
    client.close()
  })
})

//8th assgn: COUNT
/*
Here we will learn how to count the number of documents that
meet certain criteria.

Use the parrots collection from the database named learnyoumongo to
count all documents where age is greater than the first argument
passed to your script.

Using console.log, print the number to stdout.

-------------------------------------------------------------------------------

## HINTS

To count the number of documents meeting certain criteria,
we must use the collection.count() function.

Here is an example:

    collection.count({
      name: 'foo'
    }, function(err, count) {
    
    })

If your program does not finish executing, you may have forgotten to
close the db. That can be done by calling db.close() after you
have finished.

*/
var mongo = require('mongodb').MongoClient
var age = process.argv[2]

var url = 'mongodb://localhost:27017'

// Database Name
const dbName = 'learnyoumongo';

mongo.connect(url, function(err, client) {
  if (err) throw err;
  const db = client.db(dbName);
  var parrots = db.collection('parrots')
  parrots.count({
    age: {
      $gt: +age
    }
  }, function(err, count) {
    if (err) throw err
    console.log(count)
    client.close()
  })
})

//9th assgn:AGGREGATE
/*
Next up is aggregation. Aggregation allows one to do things like
calculate the sum of a field of multiple documents or the average
of a field of documents meeting particular criteria.

Say you have a collection named prices. Each price document is modeled
like so:

    {
      "name": "Tshirt",
      "size": "S",
      "price": 10,
      "quantity": 12
      "meta": {
        "vendor": "hanes",
        "location": "US"
      }
    }

In this exercise, we need to calculate the average price for all documents
in the prices collection in the database named learnyoumongo that have
the size that will be passed as the first argument to your script.

Use console.log() to print the average price rounded to 2 decimal places
to stdout after you have found it.

-------------------------------------------------------------------------------

## HINTS

To use the aggregate() function, one first needs the collection.
The aggregate() function takes an array of objects as the first argument.

This array will contain the different pipelines for the aggregation.
To read more about pipelines, please visit [Aggregation](http://docs.mongodb.org/manual/core/aggregation-introduction/).
To read more about aggregate(), please visit [`aggregate()`](http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#aggregate).

The two main pipeline stages we will use will be $match and $group.

### $match

$match is used similar to the way a query is done. It allows us to select
the documents that meet certain criteria.

Ex.

    var match = { $match: { status: 'A' } }

The above example will match all of the documents that have a status
property equal to A.

### $group

$group is what allows us to run operations on certain properties.

So, say we wanted to get the sum of the values of the property value
where status is equal to A and have it placed in the total property.

Ex.

    // [
    //  { status: 'A', value: 1 },
    //  { status: 'B', value: 2 },
    //  { status: 'A', value: 10 }
    // ]
    
    collection.aggregate([
      { $match: { status: 'A' }}
    , { $group: {
        _id: 'total' // This can be an arbitrary string in this case
      , total: {
          // $sum is the operator used here
          $sum: '$value'
        }
      }}
    ]).toArray(function(err, results) {
      // handle error
      console.log(results)
      // => [
      // =>   { _id: 'total', total: 11 }
      // => ]
    })

Other operators used in the $group stage include:

  * `$avg`
  * `$first`
  * `$last`
  * `$max`
  * `$min`
  * `$push`
  * `$addToSet`

# Rounding

The Number prototype contains a function toFixed(), which accepts the
number of decimal places you would like to round to, and returns a string
representation.

      var value = "1"
      Number(value).toFixed(5)
      // => '1.00000'

If your program does not finish executing, you may have forgotten to
close the db. That can be done by calling db.close() after you
have finished.

*/
