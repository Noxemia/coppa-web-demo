export default class Certificate<T>{
    constructor(sign: string, content: T){
        this.sign = sign;
        this.content = content;
    }
    sign: string;
    content: T;
}