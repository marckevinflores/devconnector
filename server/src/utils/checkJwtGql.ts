import { GraphQLError } from "graphql";
import { verify } from "jsonwebtoken"
import { config } from "../core/config";

export const checkJwtGql = async (token: string) => {
    const decoded: any = await verify(token, config.jwtSecret);
    if(!decoded){
        throw new GraphQLError('Missing authentication', {
            extensions: { code: 'UNAUTHORIZED' },
        });
    }else{
        return decoded;
    }
}