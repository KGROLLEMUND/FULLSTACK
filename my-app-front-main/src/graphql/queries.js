export const GET_ARTICLES = `
    query getArticles($filters: FiltersInput) {
        getArticles (filters: $filters){
            id,
            title,
            date
        }
    },
`
export const GET_ARTICLE = `

`