const db = require("../models");
const Form = db.form;

function mapBody(obj) {
    var newForm = new Form({
        username: obj.username,
        firstname: obj.firstname,
        lastname: obj.lastname,
        email: obj.email,
        affects: obj.affects,
        precautions: obj.precautions,
        wfhProductivity: obj.wfhProductivity,
        timeManagement: obj.timeManagement,
    });
    return newForm;
}

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Create a Tutorial
    const newForm = mapBody(req.body);

    console.log("Attempting to save the document to the DB");

    // Save Form in the database
    newForm
        .save(newForm)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while saving the Form."
            });
        });
};

// Retrieve all Tutorials from the database.
exports.findFormsByExactUsername = (req, res) => {
    const username = req.query.username;
    var condition = {username: username};
    Form.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving forms with the given username."
            });
        });
};

// Retrieve all Tutorials from the database.
exports.findFormsByUsernameMatch = (req, res) => {
    const username = req.query.username;
    var condition = username ? {username: {$regex: new RegExp(username), $options: "i"}} : {};
    Form.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving forms with the given username."
            });
        })
};


// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {

};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {

};

// Update a Tutorial by the id in the request
exports.updateFormForUser = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data cannot be updated as the body is invalid."
        });
    }

    let newBody = req.body;
    const username = req.query.username;
    var condition = {username: username};

    Form.findOneAndUpdate(condition, newBody, {new: true})
        .then((updatedDoc) => {
            if (updatedDoc != null || (Array.isArray(updatedDoc) && updatedDoc.length != 0)) {
                res.send(updatedDoc);
                console.log('Updated the document');
            } else {
                newBody = mapBody(req.body);
                newBody.save(newBody)
                    .then(data => {
                        res.send(data);
                        console.log('Tried to update, doc not found, saving doc instead.');
                    })
                    .catch(err => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while saving the Form."
                        });
                    });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while PUTting the form."
            });
        });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const username = req.query.username;
    var condition = {username: username};
    Form.deleteOne(condition, function (err) {
        if (err) {
            console.log('deletion is not successful');
        }
    }).then(data => {
        res.send(data);
    }).catch(error => {
        res.status(400).send({
            message:
                error.message || "Error occurred while deleteing the document"
        });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};
