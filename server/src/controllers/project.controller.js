import Project from "../models/project.model.js";


export const createProject = async (req, res, next) => {
  try {
    const { title, link, stack, bullets } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

     const cleanStack = Array.isArray(stack)
      ? stack.map((s) => s.trim()).filter((s) => s.length > 0)
      : [];

    const cleanBullets = Array.isArray(bullets)
      ? bullets.map((b) => b.trim()).filter((b) => b.length > 0)
      : [];

    const newProject = new Project({
      user: req.userId, 
      title,
      link,
      stack: cleanStack,
      bullets: cleanBullets,
    });

    await newProject.save();

    res.status(201).json({
      success: true,
      data: newProject,
    });
  } catch (err) {
    next(err);
  }
};

export const getUserProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ user: req.userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to delete this project" });
    }

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to view this project" });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (err) {
    next(err);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, link, stack, bullets } = req.body;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to update this project" });
    }
    const cleanStack = Array.isArray(stack)
      ? stack.map((s) => s.trim()).filter((s) => s.length > 0)
      : [];

    const cleanBullets = Array.isArray(bullets)
      ? bullets.map((b) => b.trim()).filter((b) => b.length > 0)
      : [];

    if (title !== undefined) project.title = title;
    if (link !== undefined) project.link = link;
    if (stack !== undefined) project.stack = cleanStack;
    if (bullets !== undefined) project.bullets = cleanBullets;

    await project.save();

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (err) {
    next(err);
  }
};

