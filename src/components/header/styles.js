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
    settingsIcon: {
      width: "2.3vw",
      height: "2.3vw",
      marginLeft: "0.3vw",
      verticalAlign: "text-top",
      cursor: "pointer",
    },
      githubIcon: {
      width: "1.9vw",
      height: "1.9vw",
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
    },
    formGroup: {
      textAlign: 'left',
      marginBottom: '20px'
    },
    input: {
      width: '100%',
      padding: '8px',
      marginTop: '8px',
      background: '#2a2a2a',
      border: '1px solid #444',
      color: '#fff'
    },
    submitButton: {
      padding: '8px 16px',
      background: '#444',
      border: 'none',
      color: '#fff',
      cursor: 'pointer'
    },
    popupOverlay: {
      background: 'rgba(0, 0, 0, 0.85)'
    },
    popupContent: {
      background: 'none',
      border: 'none',
      padding: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  });