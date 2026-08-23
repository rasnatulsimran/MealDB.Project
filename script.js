const API_KEY = "rc_live_ef8bc39a7200457fa6e5d5f52b565d18";

async function testAPI() {

    try {

        const response = await fetch(
            "https://api.restcountries.com/countries/v5?q=Bangladesh&api-key=" + API_KEY
        );

        console.log("Status:", response.status);

        const data = await response.json();

        console.log("Data:", data);

    } catch (error) {

        console.error("ERROR:", error);

    }

}

testAPI();