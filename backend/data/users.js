const bcrypt = require("bcryptjs");

const users = [
    {
        name:'Admin User',
        email: 'admin@email.com',
        password : bcrypt.hashSync('123456',10),
        isAdmin:true,
    },{
        name:'Joel John',
        email: 'joeljohn@email.com',
        password : bcrypt.hashSync('123456',10),
        isAdmin:false,
    },{ 
        name:'Shine Rose',
        email: 'shinerose@email.com',
        password : bcrypt.hashSync('123456',10),
        isAdmin:false,
    }
]

module.exports = users