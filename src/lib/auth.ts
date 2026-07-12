import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";
import { jwt } from "better-auth/plugins";


const client = new MongoClient(
  process.env.MONGODB_URI!
);


const db = client.db("fixmate");


export const auth = betterAuth({

  // Better Auth base URL
  baseURL: process.env.BETTER_AUTH_URL,


  // MongoDB Adapter
  database: mongodbAdapter(db, {
    client,
  }),


  // Allowed origins
  trustedOrigins: [
    "http://localhost:3000",
    process.env.NEXT_PUBLIC_CLIENT_URL!,
  ],


  // Email Password Login
  emailAndPassword: {
    enabled: true,
  },


  // Google Login
  socialProviders: {

    google: {

      clientId:
        process.env.GOOGLE_CLIENT_ID!,

      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET!,

      prompt:
        "select_account",

    },

  },


  // Account Linking
  account: {

    accountLinking: {

      enabled: true,

      trustedProviders: [
        "google",
      ],

    },

  },


  // Extra User Fields
  user: {

    additionalFields: {

      role: {

        type: "string",

        required: true,

        defaultValue: "customer",

        input: true,

      },


      phone: {

        type: "string",

        required: false,

        input: true,

      },


      avatar: {

        type: "string",

        required: false,

        input: true,

      },

    },

  },


  // Session Settings
  session: {

    cookieCache: {

      enabled: true,

      strategy: "jwt",

      maxAge:
        5 * 24 * 60 * 60,

    },

  },


  // JWT Plugin
  plugins: [

    jwt(),

  ],


});