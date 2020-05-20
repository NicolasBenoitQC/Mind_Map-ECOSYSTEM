const users = [];

const addUser = ({id, username, mindmap}) => {
    username = username.trim().toLowerCase();
    mindmap = mindmap.trim().toLowerCase();

    const existingUser = users.find(
        (user) => user.mindmap === mindmap && user.username === username
    );
    if(existingUser) {
        return { error: 'User is taken' }
    };
    const user = { id, username, mindmap };
    users.push(user);
    return { user };
};

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1) {
        return users.splice(index, 1)[0];
    };
}

const getUser = (id) => users.find((user) => user.id === id);

const getUserInMindmap = (mindmap) => users.filter((user) => user.mindmap === mindmap);

module.exports = {
    addUser, removeUser, getUser, getUserInMindmap
}