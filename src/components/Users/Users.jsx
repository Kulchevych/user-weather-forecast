import { useLayoutEffect, useState } from "react";
import { getUser } from "../../services/user";

import UserCard from "./UserCard/UserCard";

import classes from "./styles.module.scss";

export default function Users({ readOnly }) {
  const [users, setUsers] = useState([]);
  const [savedUser, setSavedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUsersFromLocalStorage = () => {
    const localeStorageUsers = JSON.parse(localStorage.getItem("users"));

    if (!localeStorageUsers) {
      return [];
    }

    return localeStorageUsers;
  };

  const saveUserToLocalStorage = (newUser) => {
    const users = getUsersFromLocalStorage();

    if (users.find((user) => user.email === newUser.email)) {
      return;
    }

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    setSavedUsers(users);
  };

  const deleteUserFromLocalStorage = (deletedUser) => {
    const users = getUsersFromLocalStorage();

    const filteredUsers = users.filter(
      (user) => deletedUser.id.value !== user.id.value
    );

    localStorage.setItem("users", JSON.stringify(filteredUsers));

    setSavedUsers(filteredUsers);
  };

  useLayoutEffect(() => {
    setSavedUsers(getUsersFromLocalStorage());
  }, [readOnly]);

  const loadUser = async () => {
    try {
      setIsLoading(true);
      const newUser = await getUser();
      setUsers((prev) => [...prev, newUser]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUser = () => {
    loadUser();
  };

  const visibleUsers = readOnly ? savedUser : users;

  return (
    <div className={classes.Users}>
      <ul className={classes.list}>
        {visibleUsers.map((user) => (
          <UserCard
            key={user.email}
            user={user}
            handleSaveUser={() => saveUserToLocalStorage(user)}
            handleDeleteUser={() => deleteUserFromLocalStorage(user)}
            readOnly={readOnly}
            leftButtonDisabled={savedUser.find(
              (savedUser) => savedUser.email === user.email
            )}
          />
        ))}
        {!readOnly && (
          <li className={classes.buttonContainer} key="button">
            <button
              className={classes.addButton}
              onClick={handleAddUser}
              disabled={isLoading}
            />
          </li>
        )}
      </ul>
      {readOnly && !visibleUsers.length && (
        <span className={classes.emptyData}>No saved users</span>
      )}
    </div>
  );
}
