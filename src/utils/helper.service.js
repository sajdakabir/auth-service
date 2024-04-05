import { hash, compare } from "bcrypt";

const generateHash = async (text, saltRounds = 12) => {
    return hash(text, saltRounds);
};
const verifyPasswordHash = async (text, encrypted) => {
    return compare(text, encrypted);
};

export {
    generateHash,
    verifyPasswordHash
}
