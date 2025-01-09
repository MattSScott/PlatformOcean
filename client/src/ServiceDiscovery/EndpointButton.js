import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";

export default function EndpointButton({
  userData,
  endpoint,
  platformOwner,
  bindEndpoint,
}) {
  const endpointStateMap = {
    LOADING: "grey",
    NON_MEMBER: "orange",
    MEMBER: "green",
    BANNED: "red",
  };

  const [buttonHasLoaded, setButtonHasLoaded] = useState(false);
  // const [buttonColour, setButtonColour] = useState("red");
  const [endpointState, setEndpointState] = useState(endpointStateMap.LOADING);

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
      console.log(response);
      if (response.status == 201) {
        alert("User successfully registered");
        // setButtonColour("green");
        setEndpointState(endpointStateMap.MEMBER);
      } else if (response.status == 409) {
        throw new Error("Unable to submit registration request.");
      }
      // const UUID_Resp = await response.json();
    } catch (error) {
      console.log(error);
      alert("Unable to submit registration request.");
    }
  };

  const conditionalButtonAction = () => {
    if (endpointState === endpointStateMap.MEMBER) {
      bindEndpoint(endpoint);
    } else if (endpointState === endpointStateMap.NON_MEMBER) {
      // TODO: generate dialog box, then perform following:
      submitUserRegistrationRequest();
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
          // setButtonColour("orange");
          setEndpointState(endpointStateMap.NON_MEMBER);
          return;
        }

        if (response.status === 200) {
          const UUID_Resp = await response.json();
          console.log(UUID_Resp);
          if (UUID_Resp.locked) {
            // setButtonColour("red");
            setEndpointState(endpointStateMap.BANNED);
          } else {
            // setButtonColour("green");
            setEndpointState(endpointStateMap.MEMBER);
          }
        }
      } catch (error) {
        // setButtonColour("red");
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
  }, [endpoint, userData]);

  return (
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
      {buttonHasLoaded ? `${platformOwner}'s Platform` : "Loading Platform..."}
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
  );
}
