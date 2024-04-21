import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { GraphQLError } from "graphql";
import gravatar from 'gravatar'
import { checkJwtGql } from "../../utils/checkJwtGql";
const prisma = new PrismaClient();
export async function createUser(
    parent: unknown,
    { input: { name, email, password} }: any, 
    context: any 
): Promise<any>{
    let isExists = await prisma.user.findFirst({
        where: { email }
    })
    if (isExists) {
        throw new GraphQLError('email is already exists', {
            extensions: { code: 'USER_ALREADY_EXISTS' },
        });
    }
    const hashPassword = await hash(password, 10);
    const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
    })
    const user = await prisma.user.create(
        {
            data: {
                name,
                email,
                password: hashPassword,
                avatar
            }
        }
    )
    return user;
}
export async function user(_root: any, _: any, context: any): Promise<any>{
    const result = await checkJwtGql(context.token)
    if(result){
        return await prisma.user.findFirst({
            where: {id: result.sub}
        })
    }
}