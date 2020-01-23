const Dev = require('../models/Dev');
const axios = require('axios');
const parseStringAsArray = require('./utils/parseStringAsArray');
const parseStateAsStateCode = require('./utils/parseStateAsStateCode');
module.exports = {
    async store(req,res){
        const {github_username,techs,latitude,longitude} = req.body

        let dev = await Dev.findOne({github_username});

        if(dev)
            return res.send(dev)

        const response = await axios.get(`https://api.github.com/users/${github_username}`);

        const responseCity = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);

        const {name = github_username, avatar_url, bio} = response.data;

        const { address } = responseCity.data

        const state = parseStateAsStateCode(address.state)

        const city = `${address.village?address.village:address.town ? address.town:address.city} - ${state}`;

        const techsArray = parseStringAsArray(techs)

        const location = {
            type:'Point',
            coordinates:[longitude,latitude]
        };

        dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs:techsArray,
            location,
            city
        });

        return res.send(dev);

    },

    async index(req,res){
        const devs = await Dev.find();
        return res.send(devs);
    },

    async destroy(req,res){
        Dev.findByIdAndRemove(req.params._id,(err,dev)=>{
            if(err) return res.status(500).send(err);

            return res.status(200).send(dev);
        })
    }
};