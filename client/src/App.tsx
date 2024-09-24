import React, { useState } from "react";

import Dialog from "./components/dialog";
import useData from "./hooks/useData";
import useDialog from "./hooks/useDialog";

function App() {
  const { latestData, input, setInput, updateData, verifyData, restoreData } =
    useData();
  const {
    isOpen: isCreateDialogOpen,
    openDialog: openCreateDialog,
    closeDialog: closeCreateDialog,
  } = useDialog();
  const {
    isOpen: isVerifyDialogOpen,
    openDialog: openVerifyDialog,
    closeDialog: closeVerifyDialog,
  } = useDialog();
  const {
    isOpen: isRestoreDialogOpen,
    openDialog: openRestoreDialog,
    closeDialog: closeRestoreDialog,
  } = useDialog();

  const [isCreated, setCreateStatus] = useState<boolean>(true);
  const [isDataValid, setDataValid] = useState<boolean>(true);
  const [isRestoreSuccess, setRestoreStatus] = useState<boolean>(true);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);

  const onCreateNewData = async () => {
    setCreateStatus(await updateData());
    openCreateDialog();
  };

  const onClickVerifyCurrentData = async () => {
    setDataValid(await verifyData());
    openVerifyDialog();
  };

  const onClickRestore = async () => {
    setRestoreStatus(await restoreData());
    openRestoreDialog();
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        position: "absolute",
        padding: 0,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
        fontSize: "30px",
      }}
    >
      <div>Saved Data</div>
      <input
        style={{ fontSize: "30px" }}
        type='text'
        value={input ?? latestData?.content}
        onChange={onChangeInput}
      />
      <div style={{ display: "flex", gap: "10px" }}>
        <button style={{ fontSize: "20px" }} onClick={onCreateNewData}>
          Update Data
        </button>
        <button style={{ fontSize: "20px" }} onClick={onClickVerifyCurrentData}>
          Verify Data
        </button>
        <button style={{ fontSize: "20px" }} onClick={onClickRestore}>
          Restore Database
        </button>
      </div>

      <Dialog
        isOpen={isCreateDialogOpen}
        title='Create Database Status'
        content={`${
          isCreated ? "New data is correctly created" : "Data creation failed"
        }`}
        onClose={closeCreateDialog}
      />
      <Dialog
        isOpen={isVerifyDialogOpen}
        title='Verify Database Status'
        content={`Database is ${isDataValid ? "valid" : "invalid"}`}
        onClose={closeVerifyDialog}
      />
      <Dialog
        isOpen={isRestoreDialogOpen}
        title='Restore Database Status'
        content={`Database Backup ${isRestoreSuccess ? "succeeds" : "fails"}`}
        onClose={closeRestoreDialog}
      />
    </div>
  );
}

export default App;
