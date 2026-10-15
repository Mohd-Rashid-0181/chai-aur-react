import config from '../config/config'
import {Client, ID, TablesDB, Storage, Query} from "appwrite";

export class Service {
    client = new Client()
    TablesDB;
    bucket;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)
        this.tablesDB = new TablesDB(this.client)
        this.bucket = new Storage(this.client)

    }

    async createPost ({title, slug, content, featuredImage, status, userid}){
        try {
            return await this.tablesDB.createRow({
                databaseId : config.appwriteDatabaseId,
                tableId : config.appwriteCollectionId,
                rowId : slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                    userid

                }
            })
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
            
        }
    }

    async updatePost (slug, {title, content, featuredImage, status}){
        try {
            return await this.tablesDB.updateRow({
                databaseId : config.appwriteDatabaseId,
                tablesId : config.appwriteCollectionId,
                rowId : slug,
                data : {
                    title,
                    content, 
                    featuredImage,
                    status
                }
            })
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
            
        }
    }

    async deletePost ({slug}){
        try {
            await this.tablesDB.deleteRow({
                databaseId : config.appwriteDatabaseId,
                tableId : config.appwriteCollectionId,
                rowId : slug
            })
            return true 
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error",error);
            return false
        }
    }

    async getPost ({slug}){
        try {
            return await this.tablesDB.getRow({
                databaseId : config.appwriteDatabaseId,
                tableId : config.appwriteCollectionId,
                rowId : slug
            })
        } catch (error) {
            console.log("Appwrite service :: getPost :: error ", error);
            return false
        }
    }

    async getPosts (queries = [Query.equal = ("status", "active")]){
        try {
            return await this.tablesDB.listRows({
                databaseId : config.appwriteDatabaseId,
                tableId : config.appwriteCollectionId,
                query : queries
            })
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error",error);
            return false
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile({
                bucketId : config.appwriteBucketId,
                fileId : ID.unique(),
                file
            })
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false
        }
    }

    // delete file service

    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile({
                bucketId : config.appwriteBucketId,
                fileId
            })
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error",error);
            return false
        }
    }

    // file preview service

    getFilePreview(fileId){
        return this.bucket.getFilePreview({
            bucketId : config.appwriteBucketId,
            fileId
        })
    }
}

const service = new Service()

export default service;


                            // post creation, updation deletion and etc.


// for appwrite database , file upload and custom quaries we design this file

// for using the appwrite database we have to import the appwrite functionality in this file and also the config file because in the database for uploading, updating, deleting and etc. we need the databaseId, collectionId, bucketId and also many more so why we import this file here.

// for designing the database we have multiplle choices but we design it through bender login concept (in this concept we design the database in the way that in the future we eject the database service from our app even then our app run well without any major issue) for that we design a class.

// before creating the createPost we have to create a client so firstly we create a client through the client method and after that we declare two variables called databases for holding the value of batabase through the tableDB method and pass the client details into it and bucket for holding the storage through the Storage method and also we pass the client details into it.

// After that we design a class based constructor because we want that whenever anyone create object then that user easily have the access of the methods we design and in The constructor firstly we refrence the client with this keyword and also set the endpoint and project also after the creation of client, databases and bucket we hold the client value in the database and bucket variable through our TableDB and Storage method and also we create the whole database methods inside the class to avoid the dependencies and class works like the rapper. 

// So now we design the createPost method for creating the post we have two choices promise|| async await so we use async await because we want that untill my account creation not completed i want to wait and if completed then code executed so we need the parameters (title, slug, content, featuredImage, status, userid) when user create the post then we hold it and also for creating the post we have to give the databaseId, collectionId and rowId and after that we have to give the data in the  object and also these values we give in key, value pair and also this process have the posibilty of failure then we use the try catch here beacuse if this failes then we throw the error to user and if not then we sucessfully enter the post in the database.

// Now we create the updatePost method through async await and try catch and also one more method we took in use for that when post is availabe to update then we update it through updateRow method and also we have to give the parameters in the updatePost method(slug, {title, content, featuredImage, status) and after that we write the in the same way like databaseId, collectionId and rowId and after that we have to give the data in the  object and also these values we give in key, value pair and if post is updated then we return it.

// Now we create the deletePost for deleting the post if available so we certe this with deleteRow method and also we have to give the parameter in the deletePost method (slug) and after that we write the in the same way like databaseId, collectionId and rowId for creating this we simply use the async await promise and try catch and if the post is deleted then we simply return the true if post is not available then we throw an error or return false.

// Now we create the getPost method to get the post and we have to the parameters to this method (slug) and we also use the getRow method in this and for creating this we simply use the async await promise and try catch and if the post is get then we simply return the post but if post is not available then we throw an error or return false and also after that we write the code in the same way like databaseId, collectionId and rowId and also for getting the multiple posts we simply pass in the parameter of getposts (queries = [Query.equal = ("status", "active")]) because we only want the posts who is in the active mode and we know it because of their status and we use the getRows instead of getRow.


                        // file upload,delete, and preview and etc.  


// So now for the file upload we create the uploadFile mathod with the parameter of file and also with the use of  async await and try catch and one more method we use in it call createFile so firstly we give the bucketId or storageId and also the fileId who is generated through ID.unique() and also the file who we pass as parameter and now if our file is created successfully then we return the file and if not then we simply throw  an error.

// Now we create  a deleteFile method deleting the file with fileId parameter in this we use the async await and try catch and also a method called deleteFile so firstly we give the bucketId or storageId and also the fileId who is generated through ID.unique() and now if our file is deleted then we return true and if not then we simply throw error or return false.

// And in the last we create the getFilePreview for previewing the file with the fileId parameter so firstly we give the bucketId or storageId and also the fileId who is generated through ID.unique() and simply return it we don't use the async await in it because it is not a promise.

// in the last we export the object of this class so user easily access the properties of this class through dot(.) because if we export the so user have to make the object itself so for better response we export the object.
