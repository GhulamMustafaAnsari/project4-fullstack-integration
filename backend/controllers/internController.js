const Intern = require("../models/Intern");

async function getInterns(req, res) {
  const interns = await Intern.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, data: interns });
}

async function getInternById(req, res) {
  const intern = await Intern.findById(req.params.id);

  if (!intern) {
    return res.status(404).json({ success: false, message: "Intern not found" });
  }

  res.status(200).json({ success: true, data: intern });
}

async function createIntern(req, res) {
  const { name, role, email } = req.body;

  if (!name || !role || !email) {
    return res.status(400).json({
      success: false,
      message: "name, role, and email are all required",
    });
  }

  try {
    const intern = await Intern.create({ name, role, email });
    res.status(201).json({ success: true, data: intern });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: "Email already in use" });
    }
    throw err;
  }
}

async function updateIntern(req, res) {
  try {
    const intern = await Intern.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!intern) {
      return res.status(404).json({ success: false, message: "Intern not found" });
    }

    res.status(200).json({ success: true, data: intern });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: "Email already in use" });
    }
    throw err;
  }
}

async function deleteIntern(req, res) {
  const intern = await Intern.findByIdAndDelete(req.params.id);

  if (!intern) {
    return res.status(404).json({ success: false, message: "Intern not found" });
  }

  res.status(200).json({ success: true, data: {} });
}

module.exports = { getInterns, getInternById, createIntern, updateIntern, deleteIntern };
