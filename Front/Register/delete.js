async function deleteListing(EquipmentID) {
  let request = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  };
  let apiRequest = await fetch(
    `http://localhost:3500/api/deleteRental/${EquipmentID}`,
    request
  );
  let result = await apiRequest.json();
  userListings.innerHTML = "";
  getAllFromUser();
}
