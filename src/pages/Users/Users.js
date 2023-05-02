import { useState } from "react";
import { EditUserModal } from "../../components/EditUserModal";
import { Loader } from "../../components/loader";
import { InputSelect } from "../../components/Select";
import { UsersTable } from "../../components/users-table";
import { UsersContext } from "../../context";
import { useUsersFetch } from "../../effects/useUsersFetch";

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeUser, setActiveUser] = useState({});
  const [genderFilter, setGenderFilter] = useState("male/female");

  const [page, setPage] = useState(1);
  const { users, isLoading } = useUsersFetch(page);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFilterChange = ({ target: { value } }) => {
    setGenderFilter(value);
  };

  const handleUserClick = (user) => {
    setActiveUser(user);
    setIsModalOpen(true);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    console.log(value);
  };

  return (
    <UsersContext.Provider
      value={{
        handlePageChange,
        page,
        activeUser,
        isModalOpen,
        handleModalClose,
        users,
        isLoading,
        genderFilter,
        handleUserClick,
      }}
    >
      <InputSelect
        label="Gender"
        name="gender"
        value={genderFilter}
        defaultValue={genderFilter}
        onChange={handleFilterChange}
        values={[
          { value: "male/female", label: "male/female" },
          { value: "male", label: "male" },
          { value: "female", label: "female" },
        ]}
      />
      <EditUserModal />

      <UsersTable />
    </UsersContext.Provider>
  );
};

export { Users };
