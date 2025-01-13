//This is a Configuration file that is used to configure the Drizzle ORM.

import 'dotenv/config';
export default{
    out: './drizzle',
    schema: "./utils/schema.jsx",
    dialect: 'postgresql',
    dbCredentials:{
        url: process.env.NEXT_PUBLIC_DATABASE_URL,
    }
}