import Resume from "../models/resume.model.js";

export const createResume = async (req, res, next) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const resume = new Resume({
      user: req.user._id,
      title: req.body.title, 
      file: req.file.buffer, 
      contentType: req.file.mimetype,
    });

    await resume.save();

    res.status(201).json({
      message: "Resume saved in MongoDB!",
      resume: {
        id: resume._id,
        title: resume.title,
        contentType: resume.contentType,
        uploadedAt: resume.createdAt,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getResume = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.set("Content-Type", resume.contentType || "application/pdf");
    res.set("Content-Disposition", "inline"); 
    res.send(resume.file); 
  } catch (err) {
    next(err);
  }
};

export const getUserResume = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    if (resume.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to view this resume" });
    }

    res.set("Content-Type", resume.contentType || "application/pdf");
    res.set("Content-Disposition", "inline");
    res.send(resume.file);
  } catch (err) {
    next(err);
  }
};

export const getUserResumes = async (req, res, next) => {
  try {
    const resumes = await Resume.find({ user: req.user._id });

    if (!resumes || resumes.length === 0) {
      return res
        .status(404)
        .json({ message: "No resumes found for this user" });
    }

    res.status(200).json(
      resumes.map((r) => ({
        id: r._id,
        title: r.title,
        contentType: r.contentType,
        uploadedAt: r.createdAt,
      }))
    );
  } catch (err) {
    next(err);
  }
};

export const getAllResumes = async (req, res, next) => {
  try {
    const resumes = await Resume.find();
    res.status(200).json(
      resumes.map((r) => ({
        id: r._id,
        user: r.user,
        title: r.title, 
        contentType: r.contentType,
        uploadedAt: r.createdAt,
      }))
    );
  } catch (err) {
    next(err);
  }
};

export const deleteResume = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    if (resume.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this resume" });
    }

    await Resume.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (err) {
    console.error("Delete resume error:", err);
    next(err);
  }
};
