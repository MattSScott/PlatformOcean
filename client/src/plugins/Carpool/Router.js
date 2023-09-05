import Button from "@mui/material/Button";

export default function Router({ locations }) {
  const generateRoute = () => {
    locations.map((loc) => {
      console.log(loc);
    });
  };

  return (
    locations.length > 1 && (
      <Button variant="outlined" onClick={generateRoute}>
        Generate Route
      </Button>
    )
  );
}
