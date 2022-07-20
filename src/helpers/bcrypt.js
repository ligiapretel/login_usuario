// Desestruturando o objeto - poderia fazer `const bcrypt = require('bcrypt');` e pra usar teria que chamar `bcrypt.compareSync`
const { compareSync, hashSync } = require("bcrypt");

const bcrypt = {
    //Método para gerar hash
    generateHash: (payload)=>{
        return hashSync(payload,10);
    },
    //Método para comparar hash
    compareHash: (text,textHashed)=>{
        return compareSync(text,textHashed);
    }
};

module.exports = bcrypt;