import React from "react";
import { Button } from "@material-ui/core";

export default ({ label, handleModalOpen }) => (
  <Button
    variant="contained"
    color="primary"
    onClick={() => handleModalOpen(true)}
  >
    Adicionar {label}
  </Button>
);
