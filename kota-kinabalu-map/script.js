const places = {
    1: {
        name: "Mount Kinabalu",
        description: "The majestic centerpiece of Sabah. A UNESCO World Heritage site known for its unique flora and fauna, ranging from lowland rainforest to alpine meadows.",
        highlights: ["Endemic Orchids", "Nepenthes (Pitcher Plants)", "Granite Peaks"],
        coord: [88, 22],
        travel: { dist: "78 km", time: "1h 40m" }
    },
    2: {
        name: "Tunku Abdul Rahman Marine Park",
        description: "A sanctuary of five islands with vibrant coral reefs. Accessed via Jesselton Point Ferry Terminal.",
        highlights: ["Coral Reefs", "Sea Turtles", "Tropical Fish"],
        coord: [14, 24],
        travel: { dist: "28 km", time: "40m (to Jetty)" }
    },
    3: {
        name: "KK Wetland Centre",
        description: "A crucial mangrove ecosystem in the heart of the city. It serves as a feeding ground for migratory birds.",
        highlights: ["Mangrove Boardwalk", "Bird Watching", "Mudskippers & Crabs"],
        coord: [28, 22],
        travel: { dist: "26 km", time: "35m" }
    },
    4: {
        name: "Tanjung Aru Beach",
        description: "A beautiful stretch of white sand and Casuarina trees, famous for its ecosystem that supports iconic Bornean sunsets.",
        highlights: ["Casuarina Trees", "Coastal Ecosystem", "Stunning Sunsets"],
        coord: [21, 32],
        travel: { dist: "34 km", time: "50m" }
    },
    5: {
        name: "Lok Kawi Wildlife Park",
        description: "A combination of a zoo and a botanical garden, focusing on the preservation and exhibition of Borneo's unique wildlife.",
        highlights: ["Proboscis Monkeys", "Bornean Pygmy Elephants", "Orangutans"],
        coord: [26, 52],
        travel: { dist: "42 km", time: "1h 0m" }
    },
    6: {
        name: "Klias Wetlands",
        description: "A riverine forest system located south of KK, famous for its population of proboscis monkeys and fireflies.",
        highlights: ["Proboscis Monkeys", "Firefly Cruises", "River Ecosystem"],
        coord: [8, 88],
        travel: { dist: "135 km", time: "2h 40m" }
    },
    7: {
        name: "Kiulu River",
        description: "A gentle river winding through lush valleys, offering a scenic nature experience and light white-water rafting.",
        highlights: ["River Rafting", "Green Valleys", "Freshwater Ecology"],
        coord: [55, 12],
        travel: { dist: "22 km", time: "35m" }
    },
    8: {
        name: "Crocker Range Park",
        description: "Sabah's largest terrestrial park, protecting the mountainous backbone of the West Coast.",
        highlights: ["Rafflesia Monitoring", "Cloud Forests", "Jungle Trekking"],
        coord: [52, 65],
        travel: { dist: "85 km", time: "2h 10m" }
    },
    9: {
        name: "Signal Hill",
        description: "The closest natural forest reserve to the city center, providing a green lung and habitat for small birds and mammals.",
        highlights: ["Primary Forest Patch", "City Green Lung", "Nature Trails"],
        coord: [26, 24],
        travel: { dist: "29 km", time: "45m" }
    },
    10: {
        name: "Poring Hot Springs",
        description: "Nestled in the rainforest near Mount Kinabalu, featuring therapeutic hot springs and a canopy walk.",
        highlights: ["Canopy Walk", "Rafflesia Flowers", "Natural Hot Springs"],
        coord: [94, 25],
        travel: { dist: "115 km", time: "2h 30m" }
    },
    11: {
        name: "Mengalum Island",
        description: "An offshore paradise known for its pristine white beaches and deep-sea coral systems.",
        highlights: ["Deep Sea Snorkeling", "Pristine Beaches", "Marine Conservation"],
        coord: [4, 8],
        travel: { dist: "28 km", time: "40m (to Jetty)" }
    },
    12: {
        name: "Mantanani Islands",
        description: "Known as the 'Mermaid Islands', these remote gems offer crystal clear waters and are a habitat for the rare Dugong.",
        highlights: ["Dugong Sightings", "Crystal Clear Water", "Diving"],
        coord: [45, 3],
        travel: { dist: "35 km", time: "45m (to Rampayan Jetty)" }
    },
    13: {
        name: "Kokol Hill",
        description: "A highland area offering cooler temperatures and a different ecological zone compared to the coastal plains.",
        highlights: ["Highland Flora", "Cool Climate", "Panoramic Nature Views"],
        coord: [42, 25],
        travel: { dist: "18 km", time: "30m" }
    },
    14: {
        name: "Pulau Tiga (Survivor Island)",
        description: "Famous for its volcanic mud baths and diverse wildlife, including megapodes and sea snakes.",
        highlights: ["Volcanic Mud Baths", "Snake Island", "Wildlife Trekking"],
        coord: [3, 45],
        travel: { dist: "145 km", time: "2h 50m (to Kuala Penyu Jetty)" }
    },
    15: {
        name: "Pantai Dalit Nature Reserve",
        description: "A managed forest reserve that protects indigenous flora and provides a sanctuary for rehabilitated wildlife.",
        highlights: ["Forest Restoration", "Orchid Garden", "Eco-friendly Trails"],
        coord: [40, 14],
        travel: { dist: "4 km", time: "8m" }
    },
    16: {
        name: "Gayang Friendly Water House",
        description: "Your starting point. A unique water village community and seafood destination built on stilts over the Gayang river estuary.",
        highlights: ["Stilt House Architecture", "Fresh Seafood", "Estuary Views"],
        coord: [43, 16],
        special: true,
        travel: { dist: "0 km", time: "You are here" }
    },
    17: {
        name: "Kota Kinabalu City Center",
        description: "The vibrant heart of Sabah. A mix of modern shopping malls, colonial history, and a bustling waterfront with stunning sunset views.",
        highlights: ["Waterfront Esplanade", "Shopping & Dining", "Historical Landmarks"],
        coord: [25, 26],
        travel: { dist: "28 km", time: "45m" },
        city: true
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const markersOverlay = document.getElementById('markers-overlay');
    const infoContent = document.getElementById('info-content');

    // Create markers
    Object.keys(places).forEach(id => {
        const place = places[id];
        const marker = document.createElement('div');
        let className = 'marker';
        if (place.special) className += ' special';
        if (place.city) className += ' city';
        marker.className = className;
        marker.style.left = `${place.coord[0]}%`;
        marker.style.top = `${place.coord[1]}%`;
        marker.setAttribute('data-id', id);
        marker.title = place.name;
        
        marker.addEventListener('click', () => showInfo(id));
        markersOverlay.appendChild(marker);
    });

    function showInfo(id) {
        const place = places[id];
        if (!place) return;

        // Update active marker
        document.querySelectorAll('.marker').forEach(m => m.classList.remove('active'));
        const activeMarker = document.querySelector(`.marker[data-id="${id}"]`);
        if (activeMarker) activeMarker.classList.add('active');

        // Update info panel
        infoContent.innerHTML = `
            <h2>${place.name}</h2>
            <div class="travel-tag">
                <span class="icon">🚗</span> <strong>${place.travel.dist}</strong> • ${place.travel.time} from Gayang
            </div>
            <p>${place.description}</p>
            <ul class="details-list">
                ${place.highlights.map(h => `<li>${h}</li>`).join('')}
            </ul>
        `;

        // Smooth scroll on mobile
        if (window.innerWidth < 900) {
            document.getElementById('info-panel').scrollIntoView({ behavior: 'smooth' });
        }
    }
});
