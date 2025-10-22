const Customer = require("../models/user-models");
const Contacts =require("../models/contact-model");

const getAllCustomers = async (req, res, next) => {
    try {
        const customers = await Customer.find({},{password:0});
        console.log(customers);

        if (!customers || customers.length === 0) {
            return res.status(404).json({
                message: "No Customers Found"
            });
        }

        return res.status(200).json(customers);

    } catch (error) {
        next(error); // ✅ now next is defined
    }
};


const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await Contacts.find();
        console.log(contacts);

        if (!contacts || contacts.length === 0) {
            return res.status(404).json({
                message: "No Contacts Found"
            });
        }

        return res.status(200).json(contacts);

    } catch (error) {
        next(error); // ✅ now next is defined
    }
};
const deleteCustomer = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Customer.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    next(error);
  }
};
// ✅ Get single customer (exclude password)
const getCustomerById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const customer = await Customer.findOne({ _id: id }, { password: 0 });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
};

// ✅ Update customer
const updateCustomer = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await Customer.updateOne(
      { _id: id },
      { $set: updatedData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res.status(200).json({ message: "Customer updated successfully" });
  } catch (error) {
    next(error);
  }
};
module.exports = {getAllCustomers ,getAllContacts,deleteCustomer,getCustomerById,  // ✅ new
  updateCustomer,};
