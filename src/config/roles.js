const allRoles = {
  user: ['blog', 'getBlogs', 'comment', 'getComments', 'like', 'getLikes'],
  admin: ['getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
