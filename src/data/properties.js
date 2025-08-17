export const propertyData = [
    {
      id: 1,
      name: "DLF Privana West",
      builder: "DLF Limited",
      location: "Sector 76-77, Gurgaon",
      subArea: "New Gurgaon",
      city: "Gurgaon",
      priceRange: "₹2.1 - 4.5 Cr",
      propertyType: "3/4 BHK Apartments",
      category: "residential",
      possessionDate: "Dec 2026",
      reraId: "GGM/298/2023/45",
      amenities: [
        "Swimming Pool", "Clubhouse", "Gym", "Kids Play Area", 
        "24/7 Security", "Power Backup", "Landscaped Gardens"
      ],
      images: [
        "/images/properties/dlf-privana-west/1.jpg",
        "/images/properties/dlf-privana-west/2.jpg",
        "/images/properties/dlf-privana-west/3.jpg"
      ],
      rating: 4.8,
      featured: true,
      contact: "+91 98765 43210",
      description: "Premium residences with world-class amenities in the heart of New Gurgaon.",
      brochure: "/images/brochures/dlf-privana-west.pdf",
      builderLogo: "/images/builders/dlf-logo.png"
    },
    // Add more properties here...
  ];
  
  // Helper function to add new property
  export const addProperty = (newProperty) => {
    const property = {
      ...newProperty,
      id: propertyData.length + 1,
      images: newProperty.images || ["/api/placeholder/800/600"],
      amenities: newProperty.amenities || [],
      rating: newProperty.rating || 4.0,
      featured: newProperty.featured || false,
    };
    
    propertyData.push(property);
    return property;
  };
  
  // Helper function to update property
  export const updateProperty = (id, updatedData) => {
    const index = propertyData.findIndex(prop => prop.id === id);
    if (index !== -1) {
      propertyData[index] = { ...propertyData[index], ...updatedData };
      return propertyData[index];
    }
    return null;
  };