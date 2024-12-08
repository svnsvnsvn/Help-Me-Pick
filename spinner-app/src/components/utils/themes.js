const themes = {
    default: {
      "--primary": "rgba(64, 37, 10, 1)", // Spinner main color
      "--secondary": "rgba(241, 230, 213, 1)", // Background
      "--tertiary": "rgba(216, 207, 198, 1)", // List highlight
      "--bg-tertiary": "rgba(236, 226, 218, 1)", // Additional background
      "--button": "rgba(109, 57, 21, 1)", // Button colors
      "--accent": "rgb(230, 106, 106)", // Accent (heart, hover effects)
      "--background": "rgba(236, 233, 224, 1)", // Overall background
      "--font-dark": "rgba(74, 64, 58, 1)", 
      "--font-light": "rgba(255, 255, 255, 1)", 
        
      "wheelColors": [
        { red: 0.961, green: 0.910, blue: 0.816 }, // Soft Cream
        { red: 0.820, green: 0.745, blue: 0.690 }, // Warm Beige
        { red: 0.659, green: 0.561, blue: 0.471 }, // Light Brown
        { red: 0.388, green: 0.298, blue: 0.224 }, // Dark Mocha
        { red: 0.427, green: 0.224, blue: 0.082 },]// Deep Mocha
      ,

      /* Typography */
      "--font-family-main": "'Reem Kufi', sans-serif",
      "--font-size-small": "16px",
      "--font-size-base": "18px",
      "--font-size-large": "24px",
  
      /* Spacing */
      "--spacing-small": "8px",
      "--spacing-medium": "16px",
      "--spacing-large": "24px",
  
      /* Shadow */
      "--drop-shadow-color": "rgba(157, 142, 130, 1)",
  
      /* Borders */
      "--border-size-small": "0.5px",
      "--border-size-medium": "1.0px",
      "--border-size-big": "1.5px",
      "--border-color": "rgba(59, 30, 10, 1)",
      "--border-radius": "10px",
      "--box-shadow": "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    green: {
      "--primary": "rgba(124, 146, 102, 1)", // Green for spinner
      "--secondary": "rgba(244, 249, 230, 1)", // Background
      "--tertiary": "rgba(208, 216, 203, 1)", // List highlight
      "--bg-tertiary": "rgba(226, 236, 220, 1)",
      "--button": "rgba(124, 146, 102, 1)", // Buttons
      "--accent": "#E66A6A", // Accent (Heart)
      "--font-dark": "rgba(34, 55, 24, 1)", 
      "--font-light": "rgba(245, 255, 240, 1)", 

      "wheelColors": [
        { red: 0.875, green: 0.945, blue: 0.875 }, // Pale Mint
        { red: 0.639, green: 0.831, blue: 0.647 }, // Fresh Green
        { red: 0.431, green: 0.710, blue: 0.486 }, // Vibrant Green
        { red: 0.212, green: 0.353, blue: 0.243 }, // Forest Green,
        { red: 0.200, green: 0.550, blue: 0.150 }, // Earthy Green
      ],
      "--drop-shadow-color": "rgba(140, 147, 129, 1)",
      "--border-color": "rgba(19, 52, 13, 1)",
    },
    pink: {
      "--primary": "rgba(210, 99, 160, 1)", // Pink for spinner
      "--secondary": "rgba(253, 242, 251, 1)", // Background
      "--tertiary": "rgba(222, 196, 210, 1)", // List highlight
      "--bg-tertiary": "rgba(242, 212, 228, 1)",
      "--button": "rgba(210, 99, 160, 1)", // Buttons
      "--accent": "#E66A6A", // Accent (Heart)
      "--font-dark": "rgba(119, 16, 72, 1)", 
      "--font-light": "rgba(255, 245, 250, 1)", 

      "wheelColors": [
        { red: 0.980, green: 0.863, blue: 0.898 }, // Light Rose
        { red: 0.969, green: 0.659, blue: 0.773 }, // Soft Pink
        { red: 0.851, green: 0.451, blue: 0.604 }, // Bright Pink
        { red: 0.569, green: 0.231, blue: 0.357 },  // Deep Raspberry
        { red: 0.600, green: 0.300, blue: 0.400 }, // Dusty Pink
      ]
      ,
      "--drop-shadow-color": "rgba(216, 190, 204, 1)",
      "--border-color": "rgba(119, 16, 72, 1)",
    },
    blue: {
      "--primary": "rgba(114, 152, 190, 1)", // Blue for spinner
      "--secondary": "rgba(221, 242, 248, 1)", // Background
      "--tertiary": "rgba(197, 210, 223, 1)", // List highlight
      "--bg-tertiary": "rgba(211, 233, 255, 1)",
      "--button": "rgba(114, 152, 190, 1)", // Buttons
      "--accent": "#E66A6A", // Accent (Heart)
      "--font-dark": "rgba(23, 69, 115, 1)", 
      "--font-light": "rgba(240, 250, 255, 1)", 
      "--drop-shadow-color": "rgba(167, 189, 211, 1)",
      "--border-color": "rgba(23, 69, 115, 1)",
      "wheelColors": [
        { red: 0.843, green: 0.922, blue: 0.976 }, // Light Sky Blue
        { red: 0.627, green: 0.824, blue: 0.945 }, // Soft Aqua
        { red: 0.416, green: 0.616, blue: 0.839 }, // Cool Blue
        { red: 0.157, green: 0.294, blue: 0.451 },  // Deep Navy
        { red: 0.200, green: 0.250, blue: 0.550 }, // Muted Blue
      ]
      
    },
    yellow: {
      "--primary": "rgba(236, 187, 26, 1)", // Yellow for spinner
      "--secondary": "rgba(255, 237, 211, 1)", // Background
      "--tertiary": "rgba(238, 213, 175, 1)", // List highlight
      "--bg-tertiary": "rgba(255, 230, 192, 1)",
      "--button": "rgba(237, 170, 69, 1)", // Buttons
      "--accent": "#E66A6A", // Accent (Heart)
      "--font-dark": "rgba(120, 80, 20, 1)", 
      "--font-light": "rgba(255, 250, 235, 1)", 
      "--drop-shadow-color": "rgba(237, 217, 150, 1)",
      "--border-color": "rgba(202, 121, 0, 1)",
      "wheelColors": [
        { red: 1.000, green: 0.961, blue: 0.839 }, // Pale Yellow
        { red: 1.000, green: 0.890, blue: 0.612 }, // Sunny Yellow
        { red: 1.000, green: 0.765, blue: 0.302 }, // Vibrant Gold
        { red: 0.722, green: 0.498, blue: 0.102 },  // Deep Amber
        { red: 0.550, green: 0.500, blue: 0.150 }, // Warm Yellow

      ]
      ,
    },
  };
  
  export default themes;
  