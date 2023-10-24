document.addEventListener("DOMContentLoaded", function () {
  // Replace 'YOUR_ARTIST_ID' with the actual Spotify artist ID
  const artistId = "2CIMQHirSU0MQqyYHq0eOx";

  const artistInfoContainer = document.getElementById("artist-info");

  // Make an AJAX (or fetch) request to your server
  fetch(`/getArtistDetails/${artistId}`)
    .then((response) => response.json())
    .then((artistData) => {
      if (artistData.error) {
        // Handle errors, display an error message, or redirect as needed
        artistInfoContainer.innerHTML = `<p>Error: ${artistData.error.message}</p>`;
      } else {
        // Create a card to display the artist information
        const card = document.createElement("div");
        card.className = "card";

        // Display the artist name
        card.innerHTML += `<h2>${artistData.name}</h2>`;

        // Display the artist images
        if (artistData.images && artistData.images.length > 0) {
          card.innerHTML += `<img src="${artistData.images[0].url}" alt="${artistData.name}">`;
        }

        // Display other artist information as needed
        card.innerHTML += `<p>Followers: ${artistData.followers.total}</p>`;
        card.innerHTML += `<p>Genres: ${artistData.genres.join(", ")}</p>`;
        card.innerHTML += `<p>Popularity: ${artistData.popularity}</p>`;
        card.innerHTML += `<a href="${artistData.external_urls.spotify}" target="_blank">Open on Spotify</a>`;

        // Append the card to the artist-info container
        artistInfoContainer.appendChild(card);
      }
    })
    .catch((error) => {
      // Handle fetch errors
      console.error("Fetch error:", error);
    });
});
