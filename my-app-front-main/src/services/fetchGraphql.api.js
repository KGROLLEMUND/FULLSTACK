export const fetchGraphQl = async (query, variables, token) => { 
    console.log("query:", query);
    console.log("variables:", variables);
    console.log("token fetchgraphql:", token);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token || 'null'
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        }),
    });
    return res.json();
}
