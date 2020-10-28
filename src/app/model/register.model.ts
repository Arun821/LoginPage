export class RegisterModel{
    constructor(
        public name : String,
        public email : String,
        public phone : Number,
        public password : String,
        public cPassword : String
    ){}
}