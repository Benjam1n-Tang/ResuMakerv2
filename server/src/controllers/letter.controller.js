import Letter from "../models/letter.model.js";

export const createLetter = async (req, res, next) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const letter = new Letter({
      user: req.user._id,
      title: req.body.title,
      file: req.file.buffer,
      contentType: req.file.mimetype,
    });

    await letter.save();

    res.status(201).json({
      message: "Letter saved in MongoDB!",
      letter: {   // 🔹 was "resume"
        id: letter._id,
        title: letter.title,
        contentType: letter.contentType,
        uploadedAt: letter.createdAt,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getLetter = async (req, res, next) => {
  try {
    const letter = await Letter.findById(req.params.id);

    if (!letter) {
      return res.status(404).json({ message: "Letter not found" });
    }

    res.set("Content-Type", letter.contentType || "application/pdf");
    res.set("Content-Disposition", "inline");
    res.send(letter.file);
  } catch (err) {
    next(err);
  }
};

export const getUserLetter = async (req, res, next) => {
  try {
    const letter = await Letter.findById(req.params.id);

    if (!letter) {
      return res.status(404).json({ message: "Letter not found" });
    }

    if (letter.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to view this letter" }); // 🔹 updated text
    }

    res.set("Content-Type", letter.contentType || "application/pdf");
    res.set("Content-Disposition", "inline");
    res.send(letter.file);
  } catch (err) {
    next(err);
  }
};

export const getUserLetters = async (req, res, next) => {
  try {
    const letters = await Letter.find({ user: req.user._id }); // 🔹 fixed

    if (!letters || letters.length === 0) {
      return res
        .status(404)
        .json({ message: "No letters found for this user" });
    }

    res.status(200).json(
      letters.map((r) => ({
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

export const getAllLetters = async (req, res, next) => {
  try {
    const letters = await Letter.find();
    res.status(200).json(
      letters.map((l) => ({
        id: l._id,
        user: l.user,
        title: l.title,
        contentType: l.contentType,
        uploadedAt: l.createdAt,
      }))
    );
  } catch (err) {
    next(err);
  }
};

export const deleteLetter = async (req, res, next) => {
  try {
    const letter = await Letter.findById(req.params.id);

    if (!letter) {
      return res.status(404).json({ message: "Letter not found" });
    }

    if (letter.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this letter" });
    }

    await Letter.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Letter deleted successfully" });
  } catch (err) {
    console.error("Delete letter error:", err);
    next(err);
  }
};
