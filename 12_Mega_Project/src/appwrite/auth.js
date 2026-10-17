import config from '../config/config'
import {Client, Account, ID}from 'appwrite';

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);

        this.account = new Account(this.client)
    }

    async createAccount ({email, password,name}){
        try {
            const userAccount = await this.account.create({userId: ID.unique(), email, password, name});
            if(userAccount){
                //call another method
                return this.login({email, password})
            }else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }


    async login ({email, password}){
        try {
            return await this.account.createEmailPasswordSession({email, password});
        } catch (error) {
            throw error;
        }
    }


    async getCurrentUser (){
        try {
            return await this.account.get();
        } catch (error) {
            if(error.code !== 401){
                console.log("Appwrite service :: getCurrentUser :: error ", error);
            }
            
        }
        return null;
    }


    async logout (){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
            
        }
    }
};


const authService = new AuthService();

export default authService;


// {How to design the client and account}

// for appwrite authentication service , we design this file

// for using the appwrite authentication we have to import the appwrite functionality in this file and also the config file because in the authentication for login, creatingAccount, logout and etc. we need the appwriteUrl, projectId, and also many more so why we import this file here.

// for designing the auth we have multiplle choices but we design it through bender login concept (in this concept we design the auth in the way that in the future we eject the auth service from our app even then our app run well without any major issue) for that we design a class.

// before creating the createAccount we have to create a client so firstly we create a client through the client method and after that we declare a variable called account for holding the value of account through the account method and we the client details into it.

// After that we design a class based constructor because we want that whenever anyone create object then that user easily have the access of the methods we design and in The constructor firstly we refrence the client with this keyword and also set the endpoint and project also after the creation of client, account we hold the client value in the account variable through our Account method and also we create the whole auth methods inside the class to avoid the dependencies and class works like the rapper. 

// So now we design the creteAccount method for creating the Account we have two choices promise|| async await so we use async await because we want that untill my account creation not completed i want to wait and if completed then code executed so we need the three parameters (email, password, name) when user enter the value of these parameter then the process go further and also this process have the posibilty of failure then we use the try catch here beacuse if this failes then we throw the error to user and if not then user sucessfully enter in the login and if user account doesn't create then we want to return the value of useraccount wathever it is after checking through if else and you can also hold the value of account in a variable or could directly return the value and after we the create method to create the account the and also the first parameter in this method is a unique id and second parameter and third parameter is email and password after that the parameters you want to give.

// Now we cerate the login method through async await and try catch and also one more method we took in use for that when account is created the we want too create and return the email session for our user through createEmailPasswordSession with email and password parameters and if not created then we throw an error to user.

// Now we create the getCurrentUser for checking the that the user is login or not in case of if our user directly land on homepage or second time land on the website after session ending for creating this we simply use the async await promise and try catch and if user is active then we simply get it through get method if not then we throw an error to user and also if both condition goes wrong then we return null.

// And in the last we create the logout for deleting the all user we simply use the deletesessions method with the parameter of active(in string) because if user is login then this funcnality works and also we delete the all sessions so we uses deleteSessions and also we create this with the help of async await promise and try catch.

// in the we export the object of this class so user easily access the properties of this class through dot(.) because if we export the so user have to make the object itself so for better response we export the object.
