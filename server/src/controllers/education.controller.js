import Education from "../models/education.model.js";


export const createEducation = async (req, res, next) => {
  try {
    const { school, degree, gradDate, location, gpa, coursework, involvement, leadership } = req.body;

    if (!school || !degree || !gradDate || !location) {
      return res.status(400).json({ message: "Make sure fields are filled" });
    }

    const newEducation = new Education({
      user: req.userId, 
      school,
      degree,
      gradDate,
      location, 
      gpa,
      coursework,
      involvement, 
      leadership
    });

    await newEducation.save();

    res.status(201).json({
      success: true,
      data: newEducation,
    });
  } catch (err) {
    next(err);
  }
};

export const getUserEducation = async (req, res, next) => {
  try {
    const education = await Education.find({ user: req.userId }).sort({
      gradDate: -1,
    });

    res.status(200).json({
      success: true,
      data: education,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteEducation = async (req, res, next) => {
  try {
    const { id } = req.params;

    const education = await Education.findById(id);
    if (!education) {
      return res.status(404).json({ message: "Education not found" });
    }

    if (education.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to delete this education" });
    }

    await education.deleteOne();

    res.status(200).json({
      success: true,
      message: "Education deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const getEducationById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const education = await Education.findById(id);
    if (!education) {
      return res.status(404).json({ message: "Education not found" });
    }

    if (education.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to view this education" });
    }

    res.status(200).json({
      success: true,
      data: education,
    });
  } catch (err) {
    next(err);
  }
};

export const updateEducation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { school, degree, gradDate, location, gpa, coursework, involvement, leadership } = req.body;

    const education = await Education.findById(id);
    if (!education) {
      return res.status(404).json({ message: "Education not found" });
    }

    if (education.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to update this education" });
    }

    if (school !== undefined) education.school = school;
    if (degree !== undefined) education.degree = degree;
    if (gradDate !== undefined) education.gradDate = gradDate;
    if (location !== undefined) education.location = location;
    if (gpa !== undefined) education.gpa = gpa;
    if (coursework !== undefined) education.coursework = coursework;
    if (involvement !== undefined) education.involvement = involvement;
    if (leadership !== undefined) education.leadership = leadership;

    await education.save();

    res.status(200).json({
      success: true,
      data: education,
    });
  } catch (err) {
    next(err);
  }
};

