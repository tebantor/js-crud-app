import { User } from "../models/user";
import { loadUsersByPage } from "../usecases/load-users-by-page";

const state = {
    currentPage: 0,
    users: [],
}

const loadNextPage = async() => {
    const users = await loadUsersByPage(state.currentPage + 1);
    if(users.length === 0) return;

    state.currentPage += 1;
    state.users = users;
}

const loadPreviousPage = async() => {
    const users = await loadUsersByPage(state.currentPage - 1);
    if(state.currentPage === 1) return;

    state.currentPage -= 1
    state.users = users;
}

/**
 * 
 * @param {User} updatedUser 
 */
const onUserChanged = (updatedUser) => {

    let wasFound = false;

    state.users = state.users.map(user => {
        if (user.id === updatedUser) {
            wasFound = true;
            return updatedUser;
        }
        return user;
    });

    // Inserta el usuario si no existe
    if (state.users.length < 10 && !wasFound) {
        state.users.push(updatedUser);
    }
}

const reloadPage = async() => {
    const users = await loadUsersByPage(state.currentPage);
    if(users.length === 0) {
        await loadPreviousPage();
        return
    };

    state.users = users;
}

export default {
    loadNextPage,
    loadPreviousPage,
    onUserChanged,
    reloadPage,

    /**
     * 
     * @returns {User[]}
     */
    getUsers: () => [...state.users],
    /**
     * 
     * @returns {Number}
     */
    getCurrentPage: () => state.currentPage,
}

