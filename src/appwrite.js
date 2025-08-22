import {Client, Databases, ID, Query} from 'appwrite';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
let client;
let database;

if (!ENDPOINT || !isValidUrl(ENDPOINT)) {
    console.error(
        'Appwrite config error: VITE_APPWRITE_ENDPOINT is missing or invalid. ' +
        'Expected a full URL like "https://nyc.cloud.appwrite.io/v1". Got:',
        ENDPOINT
    );
} else {
    client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);
    database = new Databases(client);
}

function isValidUrl(url) {
    try {
        const u = new URL(url);
        return u.protocol === 'https:' || u.protocol === 'http:';
    } catch {
        return false;
    }
}

export const updateSearchCount = async (searchTerm, movie) => {
    try {
        if (!client || !database) throw new Error('Appwrite client or database not initialized');
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', searchTerm)
        ]);

        if (result.documents.length > 0) {
            const doc = result.documents[0];
            await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: doc.count + 1
            });
        } else {
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            })
        }
    } catch (error) {
        console.log(error);
    }
}

export const getTrendingMovies = async () => {
    try{
        if (!client || !database) throw new Error('Appwrite client or database not initialized');
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc('count')
        ])

        return result.documents;
    } catch(error) {
        console.log(error);
    }
}