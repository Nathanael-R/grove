
const data = {
    allData: require('../model/data.json'),
    setAllData: function (data) {
        this.allData = data
    }
}

const getData = (req, res) => {
    res.json(data.allData)
}

module.exports = {
    getData
}

//Here's where the database will give the server info and the server will serve it as an api data to the frontend.  