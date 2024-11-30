import React, { useState } from "react";

function NewPlantForm({ onAddPlant }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Create the plant object with price as a string
    const newPlant = {
      name: formData.name,
      image: formData.image,
      price: formData.price, // Keep price as a string
    };

    // Make a POST request
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON", 
      },
      body: JSON.stringify(newPlant),
    })
      .then((response) => response.json())
      .then((addedPlant) => {
        onAddPlant(addedPlant); // Notify parent component
        setFormData({ name: "", image: "", price: "" }); // Reset form
      });
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        <input
          type="text" // Use text input for price to keep it as a string
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
