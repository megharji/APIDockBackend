const validate = (schema) => (req, res, next) => {
  try {
    const result = schema.parse(req.body);
    req.body = result;
    next();
  } catch (error) {
    console.log("Zod error:", error.issues);

    return res.status(400).json({
      success: false,
      message: error.issues?.[0]?.message || "Validation failed",
      errors: error.issues || [],
    });
  }
};

module.exports = validate;