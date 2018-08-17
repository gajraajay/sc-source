import Cookies from 'universal-cookie';

export const cookies = new Cookies();

export default class CookieController {

    constructor(){        
        console.log("creating new instance");
    }
    static sharedInstance = CookieController.sharedInstance == null ? new CookieController() : this.sharedInstance

    printHelloWorld() {        
        console.log("hey I am called");
    }
    setCookie(key,value){
        console.log(key,value);
       return cookies.set("sc_"+key,value);
    }
    getCookie(key){
        console.log(key);
        return cookies.get("sc_"+key);
    }
}