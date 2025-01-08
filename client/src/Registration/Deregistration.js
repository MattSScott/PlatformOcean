import { Button } from "@mui/material";

export default function Deregistration({ unsetUserDetails }) {
  const triggerLogout = () => {
    localStorage.removeItem("userData");
    unsetUserDetails();
  };

  return (
    <Button
      sx={{ left: "30%", marginBottom: "20px", fontSize: "1.2rem" }}
      variant="contained"
      color="error"
      onClick={triggerLogout}
    >
      Logout
    </Button>
  );
}
