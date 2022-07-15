import { Letter } from '../db/models'

class LetterService {
    constructor(param) {
        this.Letter = param;
    }
}

const letterService = new LetterService(Letter)

export { letterService }