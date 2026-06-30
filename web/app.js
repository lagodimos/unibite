async function getApiResponse(endpoint) {
  return (response = await fetch(endpoint)
    .then((response) => response.json())
    .then((json) => json.message));
}

async function showStatus() {
  const responseSpan = document.querySelector("#response");
  responseSpan.innerHTML = `${await getApiResponse("http://localhost:3000/")}`;

  const statusSpan = document.querySelector("#db-status");
  statusSpan.innerHTML = await getApiResponse(
    "http://localhost:3000/db-status",
  );
}

showStatus();
