import bcrypt from 'bcrypt'

// hashing password
export const hashPassword = async(password, confirm_passowrd) => {
    try {
        const saltRounds = 10;
        let hashedPassword = await bcrypt.hash(password,saltRounds)
        return hashedPassword
    } catch (error) {
    console.log("error in hashing", error);
    }
}

export const comparePassword = async(password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
}