module.exports = app => {
    const forms = require("../controllers/form.controller");

    var router = require("express").Router();

    router.post("/", forms.create);
    router.get("/user/", forms.findFormsByExactUsername);
    router.get("/", forms.findFormsByUsernameMatch);
    router.put("/user/:username", forms.updateFormForUser);

    app.use('/api/forms', router);
}
