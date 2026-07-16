function getAll(Model, modelName) {
    return function (req, res) {
        Model.find()
            .then((data) => {
                if (data.length === 0) {
            return res.status(404).json({
                message: `No ${modelName} found`
            });}
                console.log(`${modelName} fetched --> ${data}`);

                res.status(200).json({
                    message: `${modelName} fetched successfully!`,
                    [modelName]: data
                });
            })
            .catch((err) => {
                console.log(`Error fetching ${modelName}: ${err}`);

                res.status(500).json({
                    message: `Error fetching ${modelName}`,
                    error: err
                });
            });
    };
}

function getOne(Model, modelName) {
    return function (req, res) {
        Model.findById(req.params.id)
            .then((data) => {
                if(!data){
                    return res.status(404).json(` ${modelName} of id: ${req.params.id} is not found`);
                }
                console.log(`${modelName} fetched --> ${data}`);
                res.status(200).json({
                    message: `${modelName} fetched successfully!`,
                    [modelName]: data
                });
            })
            .catch((err) => {
                 console.log(`Error fetching ${modelName}: ${err}`);

                res.status(500).json({
                    message: `Error fetching ${modelName}`,
                    error: err
                });
            });
    };
}

function createOne(Model, modelName) {
    return function (req, res) {
        Model.create(req.body)
            .then((data) => {
                
                console.log(`${modelName} created successfully!`+data);
                res.status(201).json({
                    message: `${modelName} created successfully!`,
                    [modelName]: data
                });
            })
            .catch((err) => {
                console.log(`${modelName} cant create it!`+err);
                res.status(400).json({
                    message: `Error creating ${modelName}`,
                    error: err
                });
            });
    };
}

function updateOne(Model, modelName) {
    return function (req, res) {
        Model.findByIdAndUpdate(req.params.id, req.body,{ new: true })
            .then((data) => {
               if(!data){
                    return res.status(404).json(` ${modelName} of id: ${req.params.id} is not found`);
                }
                console.log(`${modelName} updated successfully!`+data);
                res.status(200).json({
                    message: `${modelName} updated successfully!`,
                    [modelName]: data
                });
            })
            .catch((err) => {
                console.log(`Error updating ${modelName}`+err);
                res.status(400).json({
                    message: `Error updating ${modelName}`,
                    error: err
                });
            });
    };
}

function deleteOne(Model, modelName) {
    return function (req, res) {
        Model.findByIdAndDelete(req.params.id)
            .then((deletedData) => {
                if(!deletedData){
                    return res.status(404).json(` ${modelName} of id: ${req.params.id} is not found`);
                }
                console.log(`${modelName} deleted successfully!`+deletedData);
                res.status(200).json({
                    message: `${modelName} deleted successfully!`,
                    deletedData:deletedData
                });
            })
            .catch((err) => {
                console.log(`Error deleting ${modelName}`+err);

                res.status(500).json({
                    message: `Error deleting ${modelName}`,
                    error: err
                });
            });
    };
}

module.exports = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne
};