const errorHandler = (err, req, res, next) => {
  console.error(err);
  let errorStatusCode = err.statusCode || 500;
  let errorName = err.name || "InternalServerError";
  let errorMessage = err.message || "Internal Server Error";

  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    errorStatusCode = 400;
    errorName = "BadRequest";
    errorMessage = err.errors.map((element) => {
      return element.message;
    });
  } else if (
    err.name === "Passwords do not match" ||
    err.name === "Username and password are required"
  ) {
    errorStatusCode = 400;
    errorName = "BadRequest";
    errorMessage = err.name;
  } else if (err.name === "InvalidCredentials") {
    errorStatusCode = 401;
    errorName = "Unauthorized";
    errorMessage = "Invalid email or password";
  } else if (
    err.name === "Unauthenticated" ||
    err.name === "JsonWebTokenError" ||
    err.name === "TokenExpiredError"
  ) {
    errorStatusCode = 401;
    errorName = "Unauthorized";
    errorMessage = "Invalid token";
  } else if (err.name === "Unauthorized") {
    errorStatusCode = 403;
    errorName = "Forbidden";
    errorMessage = "Forbidden to Access";
  } else if (err.name === "NotFound") {
    errorStatusCode = 404;
    errorName = "NotFound";
    errorMessage = "Data Not Found";
  }

  let error = {
    name: errorName,
    message: errorMessage,
  };

  if (Array.isArray(errorMessage)) {
    error = {
      name: errorName,
      messages: errorMessage,
    };
  }

  res.status(errorStatusCode).json({
    statusCode: errorStatusCode,
    error,
  });
};

module.exports = errorHandler;
