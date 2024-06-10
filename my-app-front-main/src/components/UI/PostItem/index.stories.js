import PostItem from "./index";

export default {
    title: 'UI/PostItem',
    component: PostItem,
    argTypes: {
        article : {
            description: 'Article à afficher',
            type: {
                name: 'object',
                required: true
            }
        }
    },
};

export const Primary = {
    args: {
        article: {
            title: 'Article 1',
            description: 'Content 1',
            date:"20/09/2021",
        }
    },
};