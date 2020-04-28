const db = require("../models");
const Form = db.form;

function mapBody(req) {
    var newForm = new Form({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        affects: req.body.affects,
        precautions: req.body.precautions,
        wfhProductivity: req.body.wfhProductivity,
        timeManagement: req.body.timeManagement,
    });
    return newForm;
}

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Create a Tutorial
    const newForm = mapBody(req);

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
        })
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

    console.dir(req.body);

    const newBody = req.body;
    const username = req.params.username;
    var condition = {username: username};
    Form.findOneAndUpdate(condition, newBody, {new: true})
        .then((updatedDoc) => {
            res.send(updatedDoc);

        })
        .catch(err => {
            res.status(400).send({
                message:
                    err.message || "Some error occurred while updating the doc"
            });
        })
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};
