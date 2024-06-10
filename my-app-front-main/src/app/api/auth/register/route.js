import { fetchGraphQl } from "@/services/fetchGraphql.api";
import { REGISTER_USER } from "@/graphql/mutations";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const userData = await request.json(); // Récupérer les données utilisateur
        const variables = {
            user: {
                mail: userData.mail,
                password: userData.password,
                firstName: userData.firstName,
                lastName: userData.lastName
            }
        };

        console.log("userData :", userData);
        const data = await fetchGraphQl(REGISTER_USER, variables, "");       
        console.log("data: ", data);

        // set cookies
        if (data?.data?.registerUser?.token) {
            const response = NextResponse.json({ success: true });
            response.cookies.set('token', data.data.registerUser.token, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7, // Durée de vie du cookie en secondes
            });
            return response;
        }

        return NextResponse.json({
            success: false,
            message: "An error occurred",
        });
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            success: false,
            message: "An error occurred",
        });
    }
}
