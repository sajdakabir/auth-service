import { hash, compare } from "bcrypt";

const generateHash = async (text, saltRounds = 12) => {
    return hash(text, saltRounds);
};
const verifyPasswordHash = async (text, encrypted) => {
    return compare(text, encrypted);
};
const generateRandomPassword = (length = 10) =>
    generate.generate({
        length,
        symbols: true,
        numbers: true
});


export {
    generateHash,
    verifyPasswordHash,
    generateRandomPassword
}
