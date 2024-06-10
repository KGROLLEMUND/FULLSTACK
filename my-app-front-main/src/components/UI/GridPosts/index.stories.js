import GrisPosts from './index';

export default {
    title: 'UI/GridPosts',
    component: GrisPosts,
    argTypes: {
        articles : {
            description: 'Liste des articles à afficher',
            type: {
                name: 'array',
                required: true
            }
        }
    },
};

export const Primary = {
    args: {
        articles: [
            {
                title: 'Article 1',
                description: 'Content 1',
            },
            {
                title: 'Article 2',
                description: 'Content 2',
            },
            {
                title: 'Article 3',
                description: 'Content 3',
            },
        ],
    },
};