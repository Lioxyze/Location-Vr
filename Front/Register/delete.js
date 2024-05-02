async function deleteRental() {
  try {
    const RentalID = "RentalID";

    const response = await fetch(
      `http://localhost:3000/api/deleteRental/${RentalID}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      const data = await response.json();
      alert(data.message);
    }
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
  }
}
