import { Property } from "../models/property.model.js";

// Create Property
export const createProperty = async (req, res) => {
  try {
    req.body.owner = req.user.id;

    const property = await Property.create(req.body);
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllProperties = async (req, res) => {
  const { page = 1,search,location, limit = 10 } = req.query;

  const filter = {};

  if (search) {
    filter.title = { $regex: search, $options: "i" }; 
  }

  if (location) {
    filter.address = { $regex: location, $options: "i" };
  }

  // Pagination logic
  const skip = (Number(page) - 1) * Number(limit);

  const total = await Property.countDocuments(filter);

  const properties = await Property.find(filter)
    .skip(skip)
    .limit(Number(limit))
    .sort({ createdAt: -1 }); // latest first

  res.status(200).json({
    total,
    page: Number(page),
    totalPages: Math.ceil(total / limit),
    count: properties.length,
    data: properties,
  });
};

// Get Single Property
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate("owner");
    if (!property)
      return res.status(404).json({ message: "Property not found" });
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Property
export const updateProperty = async (req, res) => {
  try {
    const updated = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated)
      return res.status(404).json({ message: "Property not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Property
export const deleteProperty = async (req, res) => {
  try {
    const deleted = await Property.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Property not found" });
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
