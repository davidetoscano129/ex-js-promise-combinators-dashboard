async function getDashboardData(query) {
    try {
        // url base per le API
        const BASE_URL = "https://boolean-spec-frontend.vercel.app/freetestapi";

        // chiamate API
        const destinationPromise = fetch(`${BASE_URL}/destinations?search=${query}`).then(res => res.json());
        const weatherPromise = fetch(`${BASE_URL}/weathers?search=${query}`).then(res => res.json());
        const airportPromise = fetch(`${BASE_URL}/airports?search=${query}`).then(res => res.json());

        // eseguo tutte le chiamate in parallelo con Promise.all()
        const [destinationData, weatherData, airportData] = await Promise.all([destinationPromise, weatherPromise, airportPromise]);

        // estraggo i primi elementi dagli array restituiti dalle API
        const cityInfo = destinationData[0];
        const weatherInfo = weatherData[0];
        const airportInfo = airportData[0];

        // creo l'oggetto con i dati aggregati
        const result = {
            city: cityInfo?.name || "Unknown",
            country: cityInfo?.country || "Unknown",
            temperature: weatherInfo?.temperature || "N/A",
            weather: weatherInfo?.weather_description || "Unknown",
            airport: airportInfo?.name || "Unknown"
        };

        // stampo in console i dati formattati
        console.log(`\n${result.city} is in ${result.country}.`);
        console.log(`Today there are ${result.temperature} degrees and the weather is ${result.weather}.`);
        console.log(`The main airport is ${result.airport}.\n`);

        return result;
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        throw error;
    }
}

// chiamo la funzione getDashboardData() con il parametro "london"
getDashboardData("london").then(data => console.log("Dashboard Data:", data));