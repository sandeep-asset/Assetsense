import Office from "../models/Office.js";

//Get all Office for admin
export const getAllOffice = async (req, res) => {
  try {
    const { type, city } = req.query;
    let query = {};

    if (type && type !== "all") query.type = type;
    if (city) query["location.city"] = new RegExp(city, "i");

    const offices = await Office.find(query).sort({ createdAt: -1 });
    res.json({
      success: true,
      data: {
        offices,
      },
    });
  } catch (error) {
    console.error("Get offices error:", error);
    res.status(500).json({ success: false, message: "Error fetching offices" });
  }
};

// Toggle office Visibility
// PATCH /api/admin/offices/:id/status
export const toggleOfficeStatus = async (req, res) => {
  try {
    const office = await Office.findById(req.params.id);

    if (!office) {
      return res.status(404).json({ message: "Office not found" });
    }

    office.isActive = !office.isActive;
    await office.save();

    res.json({
      message: "Office visibility updated",
      isActive: office.isActive,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
