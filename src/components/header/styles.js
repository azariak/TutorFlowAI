export const useHeaderStyles = () => ({
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginLeft: "0vw",
      marginRight: "5vw",
      height: "80px",
      padding: "10px 0",
    },
    logo: {
      margin: 0,
      display: "flex",
      alignItems: "center",
    },
    logoImage: {
      height: "250px",
      width: "auto",
      objectFit: "contain",
    },
    logoLink: {
      textDecoration: "none",
      color: "inherit",
      display: "flex",
      alignItems: "center",
    },
    tagline: {
      fontSize: "22px",
      display: "flex",
      alignItems: "center",
    },
    icon: {
      width: "2vw",
      height: "2vw",
      marginLeft: "0.5vw",
      verticalAlign: "text-top",
      cursor: "pointer",
    },
    popup: {
      backgroundColor: "#1a1a1a",
      color: "#ffffff",
      padding: "40px",
      borderRadius: "12px",
      maxWidth: "600px",
      maxHeight: "600px",
      overflowY: "auto",
      scrollbarWidth: "thin",
      position: "relative",
      textAlign: "center"
    },
    closeButton: {
      position: "absolute",
      right: "20px",
      top: "20px",
      cursor: "pointer",
      fontSize: "24px",
      color: "#888",
      background: "none",
      border: "none",
      padding: "0"
    },
    title: {
      fontSize: "20px",
      marginBottom: "25px"
    },
    content: {
      fontSize: "15px",
      lineHeight: "1.8",
      marginBottom: "30px",
      textAlign: "left"
    },
    section: {
      marginBottom: "20px"
    }
  });