const { format } = require("date-fns");

function formatShortDate(date) {
  return format(new Date(date), "dd MMM yyyy");
}

module.exports = {
  formatShortDate,
};
