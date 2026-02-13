import config from '../config/config.js'
import { Client, TablesDB, Storage, Query, ID} from "appwrite";

class AppwriteServices{
    client = new Client()
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.databases = new TablesDB(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteTableId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            })
        } catch (error) {
            console.log("Appwrite service :: createDocument :: error", error);
        }
    }

    async updatePost(documentId, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteTableId,
                rowId: documentId,
                data: {
                    title, 
                    content,
                    featuredImage,
                    status
                }
            })
        } catch (error) {
            console.log("Appwrite service :: updateDocument :: error", error);
        }
    }

    async deletePost(documentId){
        try {
             await this.databases.deleteRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteTableId,
                rowId: documentId
            })
            return true; // return true if the document was deleted successfully
        } catch (error) {
            console.log("Appwrite service :: deleteDocument :: error", error);
            return false;  // return false if there was some error while deleting the document.
        }
    }

    async getPost(documentId){
        try {
            return await this.databases.getRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteTableId,
                rowId: documentId
            })
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    async getPosts(queries= [Query.equal("status", "active")]){
        try {
            return await this.databases.listRows({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteTableId,
                queries
            })
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    // file upload service : 
    async uploadFile(file){
        try {
            return await this.bucket.createFile({
                bucketId: config.appwriteBucketId,
                fileId: ID.unique(),
                file
             })
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile({
                bucketId: config.appwriteBucketId,
                fileId
            })
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId){
        try {
            return this.bucket.getFileView({
                bucketId: config.appwriteBucketId,
                fileId
            })
        } catch (error) {
            console.log("Appwrite service :: getFilePreview :: error", error);
            return false;
        }
    }

}

const appwriteServices = new AppwriteServices()

export default appwriteServices;