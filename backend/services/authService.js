const bcrypt = require('bcrypt');

//function to hash a password
const hashPassword = async(password) =>{
    try{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltRounds);
        return hashedPassword;
    }catch(error){
        console.error('Error Hashing Password:',error)
    }
}


//function to compare a password with a hashed password
const comparePassword = async(password,hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
}

module.exports = {
    hashPassword,comparePassword
};