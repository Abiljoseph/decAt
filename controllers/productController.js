

const GetAllProducts = (req, res) => {
    try {
        res.send("message from GetAllProducts")
    } catch (error) {
        res.status(400).send(error);
    }
} 

module.exports = { GetAllProducts }