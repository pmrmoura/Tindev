const axios = require('axios');
const Dev = require('../model/dev');

module.exports = {
    async index(req, res) {
        const {user} = req.headers;

        const loggedDev = await Dev.findById(user);
        // fazemos uma busca com um filtro para retirar os usuarios que 
        //não são o usuário e que não estão no array de likes e dislikes na database
        const users = await Dev.find({
            $and: [
                
            {_id: { $ne: user  } },
            { _id: { $nin: loggedDev.likes } },
            { _id: { $nin: loggedDev.dislikes } }
            ],
        })
        return res.json(users);
    },

    async store(req, res) {
        //puxo o username da requisição:
        const { username } = req.body
        // verifico se ele já existe no banco de dados:
        const userExists = await Dev.findOne({user: username});
        if (userExists) {
            return res.json(userExists)
        };
        // se não existe, ele cria com esses passos:
        const response = await axios.get(`https://api.github.com/users/${username}`);

        const { name, bio,  avatar_url: avatar } = response.data;

        const dev  = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        });
        
        return res.json(dev);

    }
};