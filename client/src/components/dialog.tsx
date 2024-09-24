import React from "react";

type DialogProps = {
  isOpen: boolean;
  title: string;
  content: string;
  onClose: () => void;
};

const Dialog = ({ isOpen, title, content, onClose }: DialogProps) => {
  if (!isOpen) return null;

  return (
    <>
      {isOpen ? (
        <div style={overlayStyle}>
          <div style={dialogStyle}>
            <h2 style={titleStyle}>{title}</h2>
            <p>{content}</p>
            <button onClick={onClose} style={closeButtonStyle}>
              Close
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const dialogStyle: React.CSSProperties = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  maxWidth: "400px",
  width: "100%",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
};

const titleStyle: React.CSSProperties = {
  margin: "0 0 10px",
  fontSize: "24px",
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: "#4caf50",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "10px",
};

const closeButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  backgroundColor: "#f44336",
};

export default Dialog;
