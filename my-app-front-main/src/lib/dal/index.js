import { fetchGraphQl } from "@/services/fetchGraphql.api";
import { GET_ME } from "@/graphql/mutations";
import Cookies from 'js-cookie';

export const getUser = async () => {
    try {
        const token = Cookies.get('token');
        console.log("token lib/dal:", token);

        if (token) {
            const me = await fetchGraphQl(GET_ME, {}, `Bearer ${token}`);
            console.log("me:", me);

            if (me?.data?.getMe) {
                console.log("me.data.getMe:", me.data.getMe);
                return me.data.getMe;
            } else {
                return null;
            }
        } else {
            console.log("No token found in cookies.");
        }
    } catch (err) {
        console.log("lib/dal error:", err);
    }
    return null;
};
