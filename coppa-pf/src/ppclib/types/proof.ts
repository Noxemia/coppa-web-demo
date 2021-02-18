import Certificate from "./certificate";

export default class Proof<T>{
    constructor(sign: string,  content: T){
        this.sign = sign;

        this.content = content;
    }


    sign: string;
    content: T
}