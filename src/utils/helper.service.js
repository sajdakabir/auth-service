import { hash, compare } from "bcrypt";

const generateHash = async (text, saltRounds = 12) => {
    return hash(text, saltRounds);
};

export {
    generateHash
}
