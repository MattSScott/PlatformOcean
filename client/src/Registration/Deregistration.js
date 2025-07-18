import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Deregistration({ unsetUserDetails }) {
  const triggerLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("endpointData");
    unsetUserDetails();
  };

  return (
    <Button
      sx={{
        position: "absolute",
        right: "5%",
        marginBottom: "20px",
        fontSize: "1.2rem",
      }}
      variant="contained"
      color="error"
      onClick={triggerLogout}
    >
      <LogoutIcon sx={{ marginRight: "10px" }} />
      Logout
    </Button>
  );
}
