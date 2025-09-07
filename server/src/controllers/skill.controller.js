import Skill from "../models/skill.model.js";


export const createSkill = async (req, res, next) => {
  try {
    const { languages, technical, web, other, interests } = req.body;

    const newSkill = new Skill({
      user: req.userId, 
      languages,
      technical, 
      web,
      other,
      interests
    });

    await newSkill.save();

    res.status(201).json({
      success: true,
      data: newSkill,
    });
  } catch (err) {
    next(err);
  }
};

export const getUserSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findOne({ user: req.userId });

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    res.status(200).json({
      success: true,
      data: skill,
    });
  } catch (err) {
    next(err);
  }
};

export const updateSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { languages, technical, web, other, interests } = req.body;

    const skill = await Skill.findById(id);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    if (skill.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to update this skill" });
    }

    if (languages !== undefined) skill.languages = languages;
    if (technical !== undefined) skill.technical = technical;
    if (web !== undefined) skill.web = web;
    if (other !== undefined) skill.other = other;
    if (interests !== undefined) skill.interests = interests;

    await skill.save();

    res.status(200).json({
      success: true,
      data: skill,
    });
  } catch (err) {
    next(err);
  }
};