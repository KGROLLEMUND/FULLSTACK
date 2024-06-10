export default {
    // On créé une fonction qui va nous permettre de récupérer les articles sur l'API
    getDevis: async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/devis`,{ cache: 'force-cache' });
        const devis = await res.json();
        return devis;
    },
    getDevi: async (id) => { 
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/devis/${id}`,{ cache: 'force-cache' });
        const devi = await res.json();
        return devi;
    }
    
}
