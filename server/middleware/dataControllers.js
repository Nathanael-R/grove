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