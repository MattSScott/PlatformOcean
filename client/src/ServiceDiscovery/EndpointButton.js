import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@mui/material";
import JoinPlatformDialog from "./JoinPlatformDialog";

export default function EndpointButton({
  userData,
  endpoint,
  platformOwner,
  bindEndpoint,
  setClientState,
}) {
  const endpointStateMap = useMemo(
    () => ({
      LOADING: "grey",
      NON_MEMBER: "orange",
      MEMBER: "green",
      BANNED: "red",
    }),
    []
  );

  const [buttonHasLoaded, setButtonHasLoaded] = useState(false);
  const [endpointState, setEndpointState] = useState(endpointStateMap.LOADING);
  const [fetchedUser, setFetchedUser] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogInput = (resp) => {
    resp && submitUserRegistrationRequest();
    setDialogOpen(false);
  };

  const submitUserRegistrationRequest = async () => {
    const endpointURL = `${endpoint}/registry/add`;
    console.log(endpointURL);
    try {
      const response = await fetch(endpointURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (response.status === 201) {
        alert("User successfully registered");
        setEndpointState(endpointStateMap.MEMBER);
        const USER_RESPONSE = await response.json();
        setFetchedUser(USER_RESPONSE);
      } else if (response.status === 409) {
        throw new Error("Unable to submit registration request.");
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const conditionalButtonAction = () => {
    if (endpointState === endpointStateMap.MEMBER) {
      bindEndpoint(endpoint);
      setClientState(fetchedUser);
    } else if (endpointState === endpointStateMap.NON_MEMBER) {
      setDialogOpen(true);
    } else if (endpointState === endpointStateMap.BANNED) {
      alert("You are banned from this platform.");
    } else {
      alert("Something has gone wrong. Please try again later.");
    }
  };

  useEffect(() => {
    const fetchEndpointData = async () => {
      try {
        const RegistrationAddress = `${endpoint}/registry/get`;
        const response = await fetch(RegistrationAddress, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        if (response.status === 401) {
          setEndpointState(endpointStateMap.NON_MEMBER);
          return;
        }

        if (response.status === 200) {
          const USER_RESPONSE = await response.json();
          if (USER_RESPONSE.locked) {
            setEndpointState(endpointStateMap.BANNED);
          } else {
            setEndpointState(endpointStateMap.MEMBER);
          }
          setFetchedUser(USER_RESPONSE);
        }
      } catch (error) {
        setEndpointState(endpointStateMap.LOADING);
        console.log(error);
      } finally {
        setButtonHasLoaded(true);
      }
    };
    // setTimeout(() => {
    //   fetchEndpointData();
    // }, 2000);
    fetchEndpointData();
  }, [endpoint, userData, endpointStateMap]);

  return (
    <>
      <Button
        variant="contained"
        sx={{
          position: "relative",
          padding: "10px 20px",
          margin: "20px",
          backgroundColor: endpointState,
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: endpointState, // Prevent hover background change
          },
        }}
        onMouseEnter={(e) => {
          const tooltip = e.target.querySelector(".endpoint-tooltip");
          tooltip.style.opacity = 1;
          tooltip.style.visibility = "visible";
        }}
        onMouseLeave={(e) => {
          const tooltip = e.target.querySelector(".endpoint-tooltip");
          tooltip.style.opacity = 0;
          tooltip.style.visibility = "hidden";
        }}
        onClick={conditionalButtonAction}
      >
        {buttonHasLoaded
          ? `${platformOwner}'s Platform`
          : "Loading Platform..."}
        <span
          className="endpoint-tooltip"
          style={{
            position: "absolute",
            bottom: "110%",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#333",
            color: "white",
            padding: "5px 10px",
            borderRadius: "5px",
            opacity: 0,
            pointerEvents: "none",
            visibility: "hidden",
            transition: "opacity 0.3s, visibility 0.3s",
            zIndex: 1,
          }}
        >
          {endpoint}
        </span>
      </Button>
      <JoinPlatformDialog
        platformOwner={platformOwner}
        isOpen={dialogOpen}
        handleClose={handleDialogInput}
      />
    </>
  );
}
