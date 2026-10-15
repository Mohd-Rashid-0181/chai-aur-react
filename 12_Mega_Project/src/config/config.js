const config = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_BUCKET_ID),
}


export default config


// this is the better approach and also the production grade approach for accessing the environment variables from env file directly and exporting from a single file with a rapper of string 
// with the help of that file we easily access the data of env file (import this  file into the file we needed the data of env file and access).