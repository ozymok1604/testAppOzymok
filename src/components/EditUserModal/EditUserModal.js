import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Button } from "@material-ui/core";
import { UsersContext } from "../../context";
import { Input } from "../Input";
import { useUserUpdate } from "../../effects/useUserUpdate";
import { InputSelect } from "../Select";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  flexContainer: {
    display: "grid",
    gridRowGap: "20px",
    paddingTop: "50px",
    paddingBottom: "50px",
  },
}));

export const EditUserModal = () => {
  const [userValues, setUserValues] = useState({
    name: "",
    email: "",
    gender: "",
    status: "",
  });
  const { handleUserUpdate } = useUserUpdate();
  const { isModalOpen, handleModalClose, activeUser } =
    useContext(UsersContext);
  const classes = useStyles();

  useEffect(() => {
    const { name, email, gender, status } = activeUser;
    setUserValues((prevState) => ({
      ...prevState,
      name,
      email,
      gender,
      status,
    }));
  }, [activeUser]);

  const handleInputChange = ({ target: { name, value } }) => {
    console.log(name, "sdfsdf");
    setUserValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Modal open={isModalOpen} onClose={handleModalClose}>
      <div className={classes.paper}>
        <div className={classes.flexContainer}>
          <Input
            label="Name"
            name="name"
            value={userValues.name}
            onChange={handleInputChange}
          />
          <Input
            label="Email"
            name="email"
            value={userValues.email}
            onChange={handleInputChange}
          />
          <InputSelect
            label="Gender"
            name="gender"
            defaultValue={activeUser.gender}
            value={userValues.gender}
            values={[
              { value: "male", label: "male" },
              { value: "female", label: "female" },
            ]}
            onChange={handleInputChange}
          />
          <InputSelect
            label="Status"
            name="status"
            defaultValue={activeUser.status}
            value={activeUser.status}
            values={[
              { value: "active", label: "active" },
              { value: "inactive", label: "inactive" },
            ]}
            onChange={handleInputChange}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleUserUpdate(activeUser.id, userValues);
            handleModalClose();
          }}
        >
          Edit
        </Button>
      </div>
    </Modal>
  );
};
