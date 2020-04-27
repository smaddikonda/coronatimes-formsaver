module.exports = mongoose => {
    const Form = mongoose.model(
        "form",
        mongoose.Schema(
            {
                username: String,
                firstname: String,
                lastname: String,
                email: String,
                affects: String,
                precautions: String,
                wfhProductivity: Number,
                timeManagement: String
            },
            { timestamps: true }
        )
    );

    return Form;
};
