import Electro from "../model/electroModel.js";

const getElectros = async (req, res) => {
  try {
    const response = await Electro.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

const getElectroById = async (req, res) => {
  try {
    const response = await Electro.findOne({
      where: { id: req.params.id },
    });
    if (!response) {
      return res.status(404).json({ message: "Electro not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

const createElectro = async (req, res) => {
  try {
    await Electro.create(req.body);
    res.status(200).json({ message: "Electro created" });
  } catch (error) {
    console.log(error.message);
  }
};

const updateElectro = async (req, res) => {
  try {
    await Electro.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Electro updated" });
  } catch (error) {
    console.log(error.message);
  }
};

const deleteElectro = async (req, res) => {
  try {
    await Electro.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Electro deleted" });
  } catch (error) {
    console.log(error.message);
  }
};

export { getElectros, createElectro, updateElectro, deleteElectro, getElectroById };