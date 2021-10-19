const index = function (req, res) {
  res.render('index', { title: 'My Mobile Shop' });
};

module.exports = {
  index,
};
