import Certificate from "../models/certificate.model.js";


export const createCertificate = async (req, res, next) => {
  try {
    const { title, organization, endDate } = req.body;

    if (!title || !organization) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newCertificate = new Certificate({
      user: req.userId, 
      title, organization, endDate
    });

    await newCertificate.save();

    res.status(201).json({
      success: true,
      data: newCertificate,
    });
  } catch (err) {
    next(err);
  }
};

export const getUserCertificates = async (req, res, next) => {
  try {
    const certificates = await Certificate.find({ user: req.userId }).sort({
      endDate: -1,
    });

    res.status(200).json({
      success: true,
      data: certificates,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteCertificate = async (req, res, next) => {
  try {
    const { id } = req.params;

    const certificate = await Certificate.findById(id);
    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    if (certificate.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to delete this certificate" });
    }

    await certificate.deleteOne();

    res.status(200).json({
      success: true,
      message: "Certificate deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const getCertificateById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const certificate = await Certificate.findById(id);
    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    if (certificate.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to view this certificate" });
    }

    res.status(200).json({
      success: true,
      data: certificate,
    });
  } catch (err) {
    next(err);
  }
};

export const updateCertificate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, organization, endDate } = req.body;

    const certificate = await Certificate.findById(id);
    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    if (certificate.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to update this certificate" });
    }

    if (title !== undefined) certificate.title = title;
    if (organization !== undefined) certificate.organization = organization;
    if (endDate !== undefined) certificate.endDate = endDate;

    await certificate.save();

    res.status(200).json({
      success: true,
      data: certificate,
    });
  } catch (err) {
    next(err);
  }
};

