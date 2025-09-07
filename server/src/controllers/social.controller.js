import Social from "../models/social.model.js";


export const createSocial = async (req, res, next) => {
  try {
    const { title, link } = req.body;

    if (!title || !link) {
      return res.status(400).json({ message: "Title and link are required" });
    }

    const newSocial = new Social({
      user: req.userId, 
      title,
      link,
    });

    await newSocial.save();

    res.status(201).json({
      success: true,
      data: newSocial,
    });
  } catch (err) {
    next(err);
  }
};

export const getUserSocials = async (req, res, next) => {
  try {
    const socials = await Social.find({ user: req.userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: socials,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteSocial = async (req, res, next) => {
  try {
    const { id } = req.params;

    const social = await Social.findById(id);
    if (!social) {
      return res.status(404).json({ message: "Social not found" });
    }

    if (social.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to delete this social" });
    }

    await social.deleteOne();

    res.status(200).json({
      success: true,
      message: "Social deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const getSocialById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const social = await Social.findById(id);
    if (!social) {
      return res.status(404).json({ message: "Social not found" });
    }

    // ensure the social belongs to the logged-in user
    if (social.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to view this social" });
    }

    res.status(200).json({
      success: true,
      data: social,
    });
  } catch (err) {
    next(err);
  }
};

export const updateSocial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, link } = req.body;

    const social = await Social.findById(id);
    if (!social) {
      return res.status(404).json({ message: "Social not found" });
    }

    // ensure the social belongs to the logged-in user
    if (social.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to update this social" });
    }

    // update fields
    if (title !== undefined) social.title = title;
    if (link !== undefined) social.link = link;

    await social.save();

    res.status(200).json({
      success: true,
      data: social,
    });
  } catch (err) {
    next(err);
  }
};

