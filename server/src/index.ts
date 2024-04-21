import express, { Express } from "express";
import { expressMiddleware as  apolloMiddleware} from '@apollo/server/express4';
import cors from 'cors'
import { ApolloServer } from "@apollo/server";
import { loadFiles } from '@graphql-tools/load-files'
import { resolvers } from "./resolvers/resolvers";
import { user } from "./modules/users/user.resolver";
import { findOne } from "./modules/users/user.service";
import { verify } from "jsonwebtoken";
const app: Express = express()
const port = process.env.PORT || 3000;
app.use(cors(), express.json())

async function getContext({req}: any){
    const context: {token: string} = {token: ''}
    const token = req.headers.authorization || '';
    if(token){
        context.token = token.replace('Bearer ', '')
    }
    return context;
}

async function startApolloServer() {
    const typeDefs = await loadFiles('./src/**/*.graphql');
    const apolloServer = new ApolloServer({ typeDefs, resolvers });
    await apolloServer.start();
    app.use('/graphql', apolloMiddleware(apolloServer, { context: getContext}));
}
startApolloServer().then(() => {
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
}).catch(err => {
    console.error('Error starting server:', err);
});
