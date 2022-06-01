import { CommerceModel } from "../models/index.js";

export const index = async (req, res) => {
  const commerce = await CommerceModel.find().select(
    "-__v -_id -createdAt -updatedAt"
  );
  res.json({
    message: "Commerce list",
    resources: null,
    data: commerce,
  });
};

export const store = async (req, res) => {
  try {
    const { description } = req.body;
    const commerce = await CommerceModel.findOneAndUpdate(
      {
        description,
      },
      {
        description,
      },
      {
        new: true,
        overwrite: true,
        upsert: true,
      }
    );
    res.json({
      message: "Commerce created successfully",
      resources: null,
      data: commerce,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      resource: null,
      data: null,
    });
  }
};

export const show = async (req, res) => {
  try {
    const { id } = req.params;
    const commerce = await CommerceModel.findById(id);
    res.json({
      message: "Commerce found",
      resources: null,
      data: commerce,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      resource: null,
      data: null,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const commerce = await CommerceModel.findByIdAndUpdate(
      id,
      {
        description,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "Commerce updated successfully",
      resources: null,
      data: commerce,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      resource: null,
      data: null,
    });
  }
};

export const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const commerce = await CommerceModel.findByIdAndDelete(id);
    res.json({
      message: "Commerce deleted successfully",
      resources: null,
      data: commerce,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      resource: null,
      data: null,
    });
  }
};

export const findByDescription = async (req, res) => {
  try {
    const { query } = req.params;
    const commerce = await CommerceModel.find({
      description: {
        $regex: query,
        $options: "imsx",
      },
    })
      .select("-__v -createdAt -updatedAt")
      .lean();
    res.json(commerce);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      resource: null,
      data: null,
    });
  }
};
