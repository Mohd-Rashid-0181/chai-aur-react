import config from '../config/config'
import {client, Account, ID}from 'appwrite';

export class AuthService {
    client = new client();
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
            console.log("Appwrite service :: getCurrentUser :: error ", error);
            
        }
        return null;
    }


    async logOut (){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite service :: logOut :: error", error);
            
        }
    }
};


const authService = new AuthService();

export default authService;


// {How to design the client and account}

// 