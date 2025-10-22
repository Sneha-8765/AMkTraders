const validate = (schema) => async (req, res, next) => {
  try {
    const parsedData = await schema.parseAsync(req.body);
    req.body = parsedData;
    next();
  } catch (error) {
    console.log("Validation error:", error);

    // If Zod error with detailed messages
    if (error.errors && Array.isArray(error.errors)) {
        const status = 422;
      const message = error.errors[0].message;
      const error={
        status,
        message
      };
      return res.status(400).json({ msg: message });
    }

    // If some other error (not from Zod)
    //return res.status(500).json({ msg: "Internal Server Error" });
    next(error); 
  }
};

module.exports = validate;
