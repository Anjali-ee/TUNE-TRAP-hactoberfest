document.addEventListener("DOMContentLoaded", function () {
  const artistId = "2CIMQHirSU0MQqyYHq0eOx";

  const artistInfoContainer = document.getElementById("artist-info");

  fetch(`/getArtistDetails/${artistId}`)
    .then((response) => response.json())
    .then((artistData) => {
      if (artistData.error) {
        artistInfoContainer.innerHTML = `<p>Error: ${artistData.error.message}</p>`;
      } else {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML += `<h2>${artistData.name}</h2>`;

        if (artistData.images && artistData.images.length > 0) {
          card.innerHTML += `<img src="${artistData.images[0].url}" alt="${artistData.name}">`;
        }

        card.innerHTML += `<p>Followers: ${artistData.followers.total}</p>`;
        card.innerHTML += `<p>Genres: ${artistData.genres.join(", ")}</p>`;
        card.innerHTML += `<p>Popularity: ${artistData.popularity}</p>`;
        card.innerHTML += `<a href="${artistData.external_urls.spotify}" target="_blank">Open on Spotify</a>`;

        artistInfoContainer.appendChild(card);
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
});
