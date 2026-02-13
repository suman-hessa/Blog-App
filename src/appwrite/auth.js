import config from '../config/config.js';
import { Client, Account, ID } from "appwrite";

class AuthServices{
    client = new Client()
    account;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try {
            const createdAccount = await this.account.create({userId: ID.unique(), email, password, name});
            if(createdAccount){
                return this.login({email, password});
            }else{
                return createdAccount;
            }
        } catch (error) {
            console.log(`Appwrite services :: createAccount :: error`, error);
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession({email, password});
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            const loggedInUser = await this.account.get()
            if(!loggedInUser) return null;
            return loggedInUser;
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error)
        }
    }

    async logout(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authServices = new AuthServices()

export default authServices;