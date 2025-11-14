import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const OfficeForm = ({ office, onClose }) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    location: {
      city: "",
      address: "",
      zip: "",
    },
    type: "Virtual Office",
    features: [],
    services: [],
    upsellservices: [],
    pricing: {
      yearly: "",
      monthly: "",
      daily: "",
      hourly: "",
      discount: "",
    },
    gstPercent: "",
    description: "",
    specialtag: "",
    capacity: "",
    images: [],
    slug: "",
    mapEmbed: "",
  });
  const [featureInput, setFeatureInput] = useState("");
  const [newService, setNewService] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [newupsellService, setNewupsellService] = useState({
    name: "",
    regularprice: "",
    assetsenseprice: "",
    description: "",
  });

  const availableFeatures = [
    "Wi-Fi",
    "Meeting Rooms",
    "Parking",
    "Coffee",
    "Printing",
    "Reception",
    "Phone Booths",
    "Lounge",
    "Kitchen",
    "Security",
    "Air Conditioning",
    "Natural Light",
    "24/7 Access",
    "Cleaning Service",
  ];

  useEffect(() => {
    if (office) {
      setFormData({
        name: office.name || "",
        location: {
          city: office.location?.city || "",
          address: office.location?.address || "",
          zip: office.location?.zip || "",
        },
        type: office.type || "Virtual Office",
        features: office.features || [],
        services: office.services || [],
        upsellservices: office.upsellservices || [],

        pricing: {
          yearly: office.pricing?.yearly || "",
          monthly: office.pricing?.monthly || "",
          daily: office.pricing?.daily || "",
          hourly: office.pricing?.hourly || "",
          discount: office.pricing?.discount || "",
        },
        gstPercent: office.gstPercent || "",
        specialtag: office.specialtag || " ",
        description: office.description || "",
        capacity: office.capacity || "",

        images: office.images || [],
        slug: office.slug || "",
        mapEmbed: office.mapEmbed || "",
      });
      setImagePreviews(office.images || []);
    }
  }, [office]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFeatureToggle = (feature) => {
    setFormData((prev) => {
      const features = prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature];

      return { ...prev, features };
    });
  };

  const handleCustomFeatureAdd = () => {
    if (
      featureInput.trim() &&
      !formData.features.includes(featureInput.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, featureInput.trim()],
      }));
      setFeatureInput("");
    }
  };

  const handleFeatureRemove = (featureToRemove) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((feature) => feature !== featureToRemove),
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const removeImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  //Reordering of Image
  const handleReorder = (result) => {
    if (!result.destination) return;

    // Reorder previews
    const reorderedPreviews = Array.from(imagePreviews);
    const [movedPreview] = reorderedPreviews.splice(result.source.index, 1);
    reorderedPreviews.splice(result.destination.index, 0, movedPreview);
    setImagePreviews(reorderedPreviews);

    // Reorder actual file objects in formData
    setFormData((prev) => {
      const reorderedImages = Array.from(prev.images);
      const [movedImage] = reorderedImages.splice(result.source.index, 1);
      reorderedImages.splice(result.destination.index, 0, movedImage);

      return { ...prev, images: reorderedImages };
    });
  };

  // services handlers
  const handleAddService = () => {
    if (!newService.name || !newService.price) {
      alert("Please fill service name and price");
      return;
    }

    setFormData((prev) => {
      const updated = {
        ...prev,
        services: [...(prev.services || []), newService],
      };
      console.log("✅ Updated services after add:", updated.services);
      return updated;
    });

    // Clear input
    setNewService({ name: "", price: "", description: "" });
  };

  // remove services
  const handleRemoveService = (index) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
  };
  // services handlers end

  // upsell services handlers
  const handleAddupsellService = () => {
    if (!newupsellService.name || !newupsellService.regularprice) {
      alert("Please fill upsell service name and Regularprice");
      return;
    }
    setFormData((prev) => {
      const updated = {
        ...prev,
        upsellservices: [...(prev.upsellservices || []), newupsellService],
      };
      console.log(
        "✅ Updated upsellServices after add:",
        updated.upsellservices
      );
      return updated;
    });
    // Clear input
    setNewupsellService({
      name: "",
      regularprice: "",
      assetsenseprice: "",
      description: "",
    });
  };
  // remove upsell services
  const handleRemoveupsellService = (index) => {
    setFormData((prev) => ({
      ...prev,
      upsellservices: prev.upsellservices.filter((_, i) => i !== index),
    }));
  };

  // upselll services handlers end

  // submit form Data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData.services);

    try {
      const submitData = new FormData();

      // Prepare office object
      const officeData = {
        name: formData.name,
        location: formData.location,
        type: formData.type,
        features: formData.features,
        services: formData.services,
        upsellservices: formData.upsellservices,
        pricing: {
          yearly: Number(formData.pricing.yearly),
          monthly: Number(formData.pricing.monthly),
          daily: formData.pricing.daily
            ? Number(formData.pricing.daily)
            : undefined,
          hourly: formData.pricing.hourly
            ? Number(formData.pricing.hourly)
            : undefined,
          discount: formData.pricing.discount
            ? Number(formData.pricing.discount)
            : 0,
        },

        gstPercent: formData.gstPercent ? Number(formData.gstPercent) : 18,
        specialtag: formData.specialtag,
        description: formData.description,
        capacity: formData.capacity ? Number(formData.capacity) : undefined,
        mapEmbed: formData.mapEmbed, // ✅ Add this
        slug: formData.slug,
        // ✅ send existing images when updating
        existingImages: office
          ? formData.images.filter((img) => typeof img === "string")
          : [],
      };
      console.log("🧠 FINAL OFFICE DATA BEFORE SUBMIT:", officeData);
      console.log("➡️ SERVICES SENT:", officeData.services);
      console.log("➡️ SERVICES SENT:", officeData.upsellservices);

      submitData.append("data", JSON.stringify(officeData));

      // Append only new image files
      formData.images.forEach((img) => {
        if (img instanceof File) submitData.append("images", img);
      });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      let response;
      if (office) {
        // Update office
        response = await axios.put(
          `${backendUrl}/api/offices/${office._id}`,
          submitData,

          config
        );
        toast.success("Office updated successfully!");
      } else {
        // Create office
        response = await axios.post(
          `${backendUrl}/api/offices`,
          submitData,
          config
        );
        toast.success("Office created successfully!");
      }

      if (response.data.success) onClose();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error saving office");
    } finally {
      setLoading(false);
    }
  };

  //Services Handlers

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 pt-10 flex items-center justify-center mt-20 p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {office ? "Edit Office" : "Add New Office"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 cursor-pointer hover:text-gray-700 text-xl font-bold"
              disabled={loading}
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Office Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter office name"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Office Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={loading}
                >
                  <option value="Virtual Office">Virtual Office</option>
                  <option value="Coworking Space">Coworking Space</option>
                  <option value="Virtual and Coworking">
                    Virtual and Coworking
                  </option>
                </select>
              </div>
            </div>

            {/* Location Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Location</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="location.city"
                    value={formData.location.city}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter city"
                    disabled={loading}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="location.address"
                    value={formData.location.address}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter full address"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="location.zip"
                    value={formData.location.zip}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter ZIP code"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Features</h3>

              {/* Available Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                {availableFeatures.map((feature) => (
                  <label key={feature} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.features.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      disabled={loading}
                    />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </label>
                ))}
              </div>

              {/* Custom Features */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  placeholder="Add custom feature"
                  className="flex-1 p-2 border border-gray-300 rounded-md"
                  onKeyPress={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(), handleCustomFeatureAdd())
                  }
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={handleCustomFeatureAdd}
                  className="bg-gray-500 text-white px-4 py-2 cursor-pointer rounded-md hover:bg-gray-600 disabled:opacity-50"
                  disabled={loading}
                >
                  Add
                </button>
              </div>

              {/* Selected Features */}
              <div className="flex flex-wrap gap-2">
                {formData.features.map((feature) => (
                  <span
                    key={feature}
                    className="inline-flex items-center px-3 py-1 cursorpointer rounded-full text-sm bg-blue-100 text-blue-800"
                  >
                    {feature}
                    <button
                      type="button"
                      onClick={() => handleFeatureRemove(feature)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                      disabled={loading}
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Pricing</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year Price (₹)
                  </label>
                  <input
                    type="number"
                    name="pricing.yearly"
                    value={formData.pricing.yearly}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Price (₹)
                  </label>
                  <input
                    type="number"
                    name="pricing.monthly"
                    value={formData.pricing.monthly}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Daily Price (₹)
                  </label>
                  <input
                    type="number"
                    name="pricing.daily"
                    value={formData.pricing.daily}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hourly Price (₹)
                  </label>
                  <input
                    type="number"
                    name="pricing.hourly"
                    value={formData.pricing.hourly}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Percentage
                  </label>
                  <input
                    type="number"
                    name="pricing.discount"
                    value={formData.pricing.discount}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GST Percentage
                  </label>
                  <input
                    type="number"
                    name="gstPercent"
                    value={formData.gstPercent}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Any Special Tag
                  </label>
                  <input
                    type="text"
                    name="specialtag"
                    value={formData.specialtag}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Special Tag(like-Popular,Affordable)"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/*start Services Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Services</h3>

              {/* Add New Service */}
              {/* Add Services Section */}
              <div className="flex flex-col md:flex-row gap-3">
                {/* Service Name */}
                <input
                  type="text"
                  placeholder="Service Name"
                  value={newService?.name || ""}
                  onChange={(e) =>
                    setNewService((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="flex-1 p-2 border border-gray-300 rounded-md"
                  disabled={loading}
                />

                {/* Price */}
                <input
                  type="text"
                  placeholder="Price (e.g. ₹999/month)"
                  value={newService?.price || ""}
                  onChange={(e) =>
                    setNewService((prev) => ({
                      ...prev,
                      price: e.target.value,
                    }))
                  }
                  className="w-48 p-2 border border-gray-300 rounded-md"
                  disabled={loading}
                />

                {/* Description */}
                <input
                  type="text"
                  placeholder="Enter point ending with ;(semicolon)"
                  value={newService?.description || ""}
                  onChange={(e) =>
                    setNewService((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="flex-1 p-2 border border-gray-300 rounded-md"
                  disabled={loading}
                />

                {/* Add Button */}
                <button
                  type="button"
                  onClick={handleAddService}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  disabled={loading}
                >
                  Add
                </button>
              </div>

              {/* List of Added Services */}
              <div className="space-y-2 mt-3">
                {formData.services?.length > 0 ? (
                  formData.services.map((srv, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col md:flex-row justify-between items-start md:items-center p-3 border border-gray-200 rounded-md bg-gray-50"
                    >
                      <div>
                        <p className="font-semibold text-gray-800">
                          {srv.name}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {srv.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-2 md:mt-0">
                        <span className="font-medium text-blue-700">
                          ₹{srv.price}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveService(idx)}
                          className="text-red-500 hover:text-red-700"
                          disabled={loading}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm italic">
                    No services added yet.
                  </p>
                )}
              </div>
            </div>
            {/* // End of Services Section */}

            {/* Start of upsellServices section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Upsell Services
              </h3>

              {/* Add New UpsellService */}

              <div className="flex flex-col md:flex-row gap-3">
                {/* upsellService Name */}
                <input
                  type="text"
                  placeholder="upsellService Name"
                  value={newupsellService?.name || ""}
                  onChange={(e) =>
                    setNewupsellService((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="flex-1 p-2 border border-gray-300 rounded-md"
                  disabled={loading}
                />

                {/* Regular Price */}
                <input
                  type="text"
                  placeholder="RegularPrice (e.g. ₹999/month)"
                  value={newupsellService?.regularprice || ""}
                  onChange={(e) =>
                    setNewupsellService((prev) => ({
                      ...prev,
                      regularprice: e.target.value,
                    }))
                  }
                  className="w-48 p-2 border border-gray-300 rounded-md"
                  disabled={loading}
                />
                {/* Assetsense Price */}
                <input
                  type="text"
                  placeholder="AssetSense Price (e.g. ₹999/month)"
                  value={newupsellService?.assetsenseprice || ""}
                  onChange={(e) =>
                    setNewupsellService((prev) => ({
                      ...prev,
                      assetsenseprice: e.target.value,
                    }))
                  }
                  className="w-48 p-2 border border-gray-300 rounded-md"
                  disabled={loading}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                {/* Description */}
                <input
                  type="text"
                  placeholder="Upsell Description"
                  value={newupsellService?.description || ""}
                  onChange={(e) =>
                    setNewupsellService((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="flex-1 p-2 border border-gray-300 rounded-md"
                  disabled={loading}
                />

                {/* Add Button */}
                <button
                  type="button"
                  onClick={handleAddupsellService}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  disabled={loading}
                >
                  Add
                </button>
              </div>

              {/* List of Added Services */}
              <div className="space-y-2 mt-3">
                {formData.upsellservices?.length > 0 ? (
                  formData.upsellservices.map((srv, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col md:flex-row justify-between items-start md:items-center p-3 border border-gray-200 rounded-md bg-gray-50"
                    >
                      <div>
                        <p className="font-semibold text-gray-800">
                          {srv.name}
                        </p>
                        <p className="font-semibold text-gray-800">
                          {srv.regularprice} (Regular Price)
                        </p>
                        <p className="font-semibold text-gray-800">
                          {srv.assetsenseprice} (Assetsense Price)
                        </p>
                        <p className="text-gray-600 text-sm">
                          {srv.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-2 md:mt-0">
                        <span className="font-medium text-blue-700">
                          ₹{srv.regularprice}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveupsellService(idx)}
                          className="text-red-500 hover:text-red-700"
                          disabled={loading}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm italic">
                    No services added yet.
                  </p>
                )}
              </div>
            </div>

            {/* End of upsellServices section */}

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capacity
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Number of people"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter Unique slug for this office identity"
                  disabled={loading}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe the office space, amenities, and any additional information"
                  disabled={loading}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">
                Google Map Embed Link
              </label>
              <input
                type="text"
                name="mapEmbed"
                value={formData.mapEmbed}
                onChange={handleInputChange}
                placeholder="Paste Google Maps Embed URL"
                className="w-full border p-2 rounded"
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Images</h3>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full"
                  disabled={loading}
                />
                <p className="text-sm text-gray-500 mt-2">
                  Upload multiple images of your office space (Max 5MB per
                  image)
                </p>
              </div>

              {/* Image Previews */}
              {/* {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                        disabled={loading}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )} */}
              {imagePreviews.length > 0 && (
                <DragDropContext onDragEnd={handleReorder}>
                  <Droppable droppableId="images" direction="horizontal">
                    {(provided) => (
                      <div
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {imagePreviews.map((preview, index) => (
                          <Draggable
                            key={index}
                            draggableId={`image-${index}`}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="relative group"
                              >
                                <img
                                  src={preview}
                                  alt={`Preview ${index + 1}`}
                                  className="w-full h-32 object-cover rounded-lg"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeImage(index)}
                                  className="absolute cursor-pointer top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                                  disabled={loading}
                                >
                                  ✕
                                </button>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border cursor-pointer border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 cursor-pointer text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Saving..."
                  : office
                  ? "Update Office"
                  : "Create Office"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OfficeForm;
