import Experience from "../models/experience.model.js";

export const createExperience = async (req, res, next) => {
  try {
    const { role, company, location, startDate, endDate, bullets } = req.body;

    if (!role || !company || !location || !startDate || !endDate || !bullets) {
      return res.status(400).json({ message: "Missing fields!" });
    }

    const newExperience = new Experience({
      user: req.userId, 
      role,
      company,
      location,
      startDate, 
      endDate,
      bullets
    });

    await newExperience.save();

    res.status(201).json({
      success: true,
      data: newExperience,
    });
  } catch (err) {
    next(err);
  }
};

export const getUserExperiences = async (req, res, next) => {
  try {
    const experiences = await Experience.find({ user: req.userId }).sort({
      startDate: -1
    });

    res.status(200).json({
      success: true,
      data: experiences,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteExperience = async (req, res, next) => {
  try {
    const { id } = req.params;

    const experience = await Experience.findById(id);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    if (experience.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to delete this experience" });
    }

    await experience.deleteOne();

    res.status(200).json({
      success: true,
      message: "Experience deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const getExpereinceById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const experience = await Experience.findById(id);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    if (experience.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to view this experience" });
    }

    res.status(200).json({
      success: true,
      data: experience,
    });
  } catch (err) {
    next(err);
  }
};

export const updateExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role, company, location, startDate, endDate, bullets } = req.body;

    const experience = await Experience.findById(id);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    if (experience.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to update this experience" });
    }

    if (role !== undefined) experience.role = role;
    if (company !== undefined) experience.company = company;
    if (location !== undefined) experience.location = location;
    if (startDate !== undefined) experience.startDate = startDate;
    if (endDate !== undefined) experience.endDate = endDate;
    if (bullets !== undefined) experience.bullets = bullets;

    await experience.save();

    res.status(200).json({
      success: true,
      data: experience,
    });
  } catch (err) {
    next(err);
  }
};