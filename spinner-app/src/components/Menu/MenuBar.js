import styles from "./MenuBar.module.css";
import React, {useState} from "react";


const MenuBar = ({ toggleIcons, resetWheel, toggleHistory, applyCustomTheme }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible((prev) => !prev);
  };

  const applyCustomThemeHandler = (theme) => {
    if (typeof applyCustomTheme === "function") {
      applyCustomTheme(theme); 
    }
    togglePopup();
  };
  

  return (
    <div className={styles.menu}>

      <button
        aria-label="Save wheel"
        className={styles.menuBtn}
      >
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="10 10 80 80"
        >
          <path d="m44.5 80c13.512 0 24.5-10.988 24.5-24.5 0-1.1719-0.078125-2.3398-0.25-3.5h5.1484c1.6914 0 3.3086-0.71875 4.4492-1.9688s1.6914-2.9414 1.5195-4.6211c-1.3281-13.32-11.961-23.949-25.281-25.27-0.19922-0.019531-0.39844-0.03125-0.60156-0.03125-1.4883 0-2.9219 0.55078-4.0312 1.5508-1.2617 1.1406-1.9688 2.7617-1.9688 4.4492v5.1484c-1.1602-0.17187-2.3281-0.25-3.5-0.25-13.512 0-24.5 10.988-24.5 24.5 0 13.512 10.988 24.5 24.5 24.5zm7.5-53.898c0-1.1797 1.0195-2.1094 2.1992-1.9883 11.469 1.1406 20.551 10.219 21.691 21.691 0.12109 1.1797-0.80859 2.1992-1.9883 2.1992h-19.941c-1.0781 0-1.9609-0.87891-1.9609-1.9609v-19.949zm-7.5 8.8984c1.1797 0 2.3516 0.10156 3.5 0.30078v10.699c0 3.3086 2.6914 6 6 6h10.699c0.19922 1.1484 0.30078 2.3203 0.30078 3.5 0 11.301-9.1992 20.5-20.5 20.5s-20.5-9.1992-20.5-20.5 9.1992-20.5 20.5-20.5z"/>
        </svg>
      </button>

      <button
        className={styles.menuBtn}
        aria-label="Change Color Palette Settings Button"
        onClick={togglePopup}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 100">
        <path d="m32 80h40c4.4102 0 8-3.5898 8-8v-8c0-4.4102-3.5898-8-8-8h-11.512l12.34-12.34c1.5117-1.5117 2.3398-3.5195 2.3398-5.6602s-0.82812-4.1484-2.3398-5.6602l-5.1719-5.1719c-1.5117-1.5117-3.5195-2.3398-5.6602-2.3398s-4.1484 0.82812-5.6602 2.3398l-12.34 12.34v-11.512c0-4.4102-3.5898-8-8-8h-8c-4.4102 0-8 3.5898-8 8v40c0 6.6211 5.3789 12 12 12zm12-34.828 15.172-15.172c1.5312-1.5312 4.1211-1.5312 5.6602 0l5.1719 5.1719c0.76172 0.76172 1.1719 1.7617 1.1719 2.8281 0 1.0703-0.42188 2.0703-1.1719 2.8281l-15.172 15.172h-10.828v-10.828zm0 22.828v-8h28c2.2109 0 4 1.7891 4 4v8c0 2.2109-1.7891 4-4 4h-31.078c1.9102-2.1289 3.0781-4.9297 3.0781-8zm-20-40c0-2.2109 1.7891-4 4-4h8c2.2109 0 4 1.7891 4 4v40c0 4.4102-3.5898 8-8 8s-8-3.5898-8-8z"/>
        </svg>
      </button>
  {/* Pop-up Menu */}
  {isPopupVisible && (
        <div className={styles.popup}>
          <div className={styles.popupHeader}>
            <h3>Change Your Colors</h3>
            <p class = "subtext">Change the colors of your wheels!</p>
          </div>
          <div className={styles.popupContent}>
            <h4>Presets:</h4>
            <div className={styles.presets}>
              <button
                className={`${styles.presetButton} ${styles.defaultTheme}`}
                onClick={() => applyCustomThemeHandler("default")}
              />
              <button
                className={`${styles.presetButton} ${styles.greenTheme}`}
                onClick={() => applyCustomThemeHandler("green")}
              />
              <button
                className={`${styles.presetButton} ${styles.pinkTheme}`}
                onClick={() => applyCustomThemeHandler("pink")}
              />
              <button
                className={`${styles.presetButton} ${styles.blueTheme}`}
                onClick={() => applyCustomThemeHandler("blue")}
              />
              <button
                className={`${styles.presetButton} ${styles.yellowTheme}`}
                onClick={() => applyCustomThemeHandler("yellow")}
              />
            </div>
            <h4>Customize:</h4>
            {/* Add custom color pickers here */}
            <p>Coming Soon: Custom Color Pickers</p>
          </div>
          <button
            className={styles.closeButton}
            onClick={togglePopup}
            aria-label="Close Popup"
          >
            Close
          </button>
        </div>
      )}

      <button
        aria-label="Edit Button"
        className={styles.menuBtn}
        onClick={toggleIcons} // Call toggleIcons on click
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 40">
        <path d="M13.104 6.866a.897.897 0 0 0 1.273.001.9.9 0 0 0 0-1.273l-1.248-1.249a.9.9 0 0 0-1.273 1.273l1.248 1.248zM26.407 17.623a.901.901 0 0 0-1.273 1.273l1.249 1.248a.9.9 0 0 0 1.273-1.274l-1.249-1.247zM25.771 7.129c.23 0 .46-.088.636-.264l1.249-1.249a.898.898 0 0 0 0-1.272.898.898 0 0 0-1.272 0l-1.249 1.249a.898.898 0 0 0 .636 1.536zM30.027 11.344h-1.766a.9.9 0 0 0 0 1.8h1.766a.9.9 0 0 0 0-1.8zM19.756 4.638a.9.9 0 0 0 .9-.9V1.973a.9.9 0 0 0-1.8 0v1.766a.9.9 0 0 0 .9.899zM21.806 8.071c-1.096-1.096-3.005-1.097-4.101 0L1.922 23.854c-.548.548-.85 1.276-.85 2.051s.302 1.503.85 2.05l2.123 2.123c.547.548 1.275.85 2.05.85s1.503-.302 2.05-.85l15.783-15.783a2.88 2.88 0 0 0 .85-2.05c0-.775-.302-1.503-.85-2.051l-2.122-2.123zM6.873 28.805a1.127 1.127 0 0 1-1.555 0l-2.123-2.123a1.096 1.096 0 0 1 0-1.555l11.61-11.61 3.679 3.679L6.873 28.805zm15.783-15.783-2.9 2.9-3.679-3.679 2.9-2.9a1.101 1.101 0 0 1 1.556 0l2.123 2.123c.429.43.429 1.127 0 1.556z"/>
        </svg>
      </button>

      <button
        aria-label="Reset Wheel Button"
        className={styles.menuBtn}
        onClick={resetWheel}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 250"
        >
          <path d="M91.3,63.5l19.5-18.4c2.4-2.3,2.5-6.1,0.2-8.5L92.6,17.2c-2.3-2.4-6.1-2.5-8.5-0.2c-2.4,2.3-2.5,6.1-0.2,8.5l8.3,8.8   C59.1,36.9,33,64.7,33,98.5c0,25.3,14.9,48.3,37.9,58.8c0.8,0.4,1.6,0.5,2.5,0.5c2.3,0,4.5-1.3,5.5-3.5c1.4-3,0-6.6-3-7.9   C57.1,137.8,45,119.1,45,98.5C45,71.4,65.7,49,92.1,46.3l-9,8.5c-2.4,2.3-2.5,6.1-0.2,8.5c1.2,1.2,2.8,1.9,4.4,1.9   C88.7,65.2,90.2,64.6,91.3,63.5z"/><path d="M162,98.5c0-22.9-12.4-44.3-32.2-55.8c-2.9-1.7-6.5-0.7-8.2,2.2c-1.7,2.9-0.7,6.5,2.2,8.2c16.2,9.4,26.3,26.8,26.3,45.5   c0,25.8-18.8,47.4-43.4,51.7l9.3-9c2.4-2.3,2.4-6.1,0.1-8.5c-2.3-2.4-6.1-2.4-8.5-0.1l-19.2,18.6c-2.4,2.3-2.4,6.1-0.1,8.5   l18.6,19.2c1.2,1.2,2.7,1.8,4.3,1.8c1.5,0,3-0.6,4.2-1.7c2.4-2.3,2.4-6.1,0.1-8.5l-8-8.3C138.3,157.4,162,130.7,162,98.5z"/>
        </svg>
      </button>

      <button
        aria-label="View Previous Winners Button"
        onClick={toggleHistory} 
        className={styles.menuBtn}
      >
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1280">
          <path d="M716.1 136.5v206.6c0 17 .1 33.9-2.2 50.8.4-2.7.7-5.3 1.1-8-2.8 20-8.1 39.5-15.8 58.2l3-7.2c-6.2 14.7-13.8 28.8-22.9 42-2 2.9-4 5.7-6.1 8.5-3.1 4.1 5-6.3.1-.2-.9 1.2-1.9 2.3-2.8 3.5-4.8 5.7-9.8 11.2-15.1 16.4-5.3 5.2-10.8 10.2-16.6 14.9-1.2.9-2.4 1.8-3.5 2.8 7.6-6.4 2-1.5.1-.2-2.8 2.1-5.7 4.1-8.6 6-12.5 8.4-25.8 15.4-39.6 21.3l7.2-3c-18.7 7.8-38.3 13.1-58.3 15.9 2.7-.4 5.3-.7 8-1.1-21.3 2.8-42.7 2.8-64 0 2.7.4 5.3.7 8 1.1-20-2.8-39.6-8.1-58.2-15.9l7.2 3c-13.6-5.7-26.6-12.6-38.9-20.8-2.9-1.9-5.8-4-8.7-6-1.7-1.3-7.1-5.6.2.3-1.3-1-2.6-2-3.8-3-5.7-4.6-11.1-9.5-16.3-14.6-5.5-5.4-10.8-11.1-15.7-17-1.1-1.3-2.2-2.7-3.3-4-3.8-4.6 3.8 5.1.4.6-2.4-3.3-4.8-6.5-7-9.9-8.6-12.8-16-26.4-22-40.7l3 7.2c-7.7-18.7-13-38.2-15.8-58.2.4 2.7.7 5.3 1.1 8-2.1-15.4-2.2-30.8-2.2-46.4V165.5c0-10.9-1.1-22.4.3-33.2-.4 2.7-.7 5.3-1.1 8 .4-2.2 1-4.3 1.9-6.4l-3 7.2c.6-1.2 1.2-2.3 1.8-3.5 2.3-4.5-5.4 5.9-1 1.5 4.1-4.1-4.6 2.5-2 1.4 1.4-.6 2.7-1.6 4-2.2l-7.2 3c2.1-.9 4.2-1.5 6.4-1.9-2.7.4-5.3.7-8 1.1 4.7-.6 9.6-.3 14.4-.3H669.9c16.5 0 33-.3 49.5 0 1.5 0 3.1.1 4.6.3-2.7-.4-5.3-.7-8-1.1 2.2.4 4.3 1 6.4 1.9l-7.2-3c1.2.6 2.3 1.2 3.5 1.8 4.5 2.3-5.9-5.4-1.5-1 4.1 4.1-2.5-4.6-1.4-2 .6 1.4 1.6 2.7 2.2 4l-3-7.2c.9 2.1 1.5 4.2 1.9 6.4-.4-2.7-.7-5.3-1.1-8 .1 1.5.2 2.8.3 4.2.4 15.7 13.5 30.7 30 30 15.9-.7 30.4-13.2 30-30-.8-31.2-25.3-55.7-56.5-56.3-2.8-.1-5.5 0-8.3 0h-403c-7.2 0-14.5.4-21.4 2.8-23.8 8.3-38.9 29.8-39 55-.2 45.3 0 90.7 0 136v71.9c0 27.5 1.4 54.8 8.2 81.6 13.4 52.9 44.3 102.3 86.5 136.8 44.6 36.5 98.3 58 156 61.2C602.1 631.3 704.1 571.7 749 478c18.2-37.9 27-78.3 27-120.3V136.5c0-15.7-13.8-30.7-30-30-16.2.7-29.9 13.2-29.9 30z"/><path d="M307 444.9c-7.4-.1-14.8-.7-22.2-1.6 2.7.4 5.3.7 8 1.1-17-2.3-33.6-6.8-49.4-13.3l7.2 3c-11.4-4.8-22.3-10.7-32.6-17.5-2.5-1.7-5.1-3.5-7.5-5.3-5.9-4.4 4.7 3.8.9.7-1-.8-2-1.6-3.1-2.5-4.7-3.9-9.2-8-13.6-12.4-4.3-4.3-8.4-8.9-12.3-13.6-.8-1-1.7-2-2.5-3.1-3.1-3.9 5.1 6.8.7.9-1.8-2.5-3.6-5-5.3-7.5-6.9-10.3-12.7-21.2-17.5-32.6l3 7.2c-6.4-15.4-10.8-31.5-13.1-48.1.4 2.7.7 5.3 1.1 8-2-14.9-1.8-29.8-1.8-44.7v-52.9c0-5.2-.4-10.6.3-15.8-.4 2.7-.7 5.3-1.1 8 .4-2.2 1-4.3 1.9-6.4l-3 7.2c.6-1.2 1.2-2.3 1.8-3.5 2.3-4.5-5.4 5.9-1 1.5 4.1-4.1-4.6 2.5-2 1.4 1.4-.6 2.7-1.6 4-2.2l-7.2 3c2.1-.9 4.2-1.5 6.4-1.9-2.7.4-5.3.7-8 1.1 5.3-.7 10.7-.3 16-.3H277.9l-30-30v188.8c.1 45 11.6 89.3 33.2 128.7 7.6 13.8 27.7 19.4 41 10.8 14-9 18.8-26.3 10.8-41-4.1-7.4-7.8-15.1-11.1-22.9l3 7.2c-7.7-18.7-13-38.2-15.8-58.2.4 2.7.7 5.3 1.1 8-3.8-28.2-2.2-57.5-2.2-85.9V172.9c0-16.2-13.7-30-30-30H150.3c-2.8 0-5.6-.1-8.4 0-24.5 1.4-45.1 16.7-52.6 40.3-2.4 7.4-2.3 15.2-2.3 22.8v72.3c0 22.7 2.7 45.6 9.2 67.3 8.6 28.8 23 54.6 41.7 78 17 21.4 38.9 39.5 62.8 52.9 26.9 15.1 55.8 23.6 86.3 27.3 6.7.8 13.4 1.2 20.2 1.4 15.7.3 30.7-14 30-30-.9-16.8-13.4-30-30.2-30.3zM877 198.9v80.4c0 9.7-.5 19.3-1.8 28.9.4-2.7.7-5.3 1.1-8-2.3 16.5-6.7 32.7-13.1 48.1l3-7.2c-4.8 11.4-10.6 22.3-17.5 32.6-1.7 2.6-3.5 5.1-5.3 7.5-4.4 5.9 3.8-4.7.7-.9-.8 1-1.6 2-2.5 3.1-3.9 4.7-8 9.3-12.3 13.6-4.3 4.3-8.9 8.5-13.6 12.4-1 .8-2 1.7-3.1 2.5-3.9 3.1 6.8-5.1.9-.7-2.5 1.8-5 3.6-7.5 5.3-10.3 6.9-21.2 12.7-32.6 17.5l7.2-3c-15.8 6.6-32.4 11.1-49.4 13.3 2.7-.4 5.3-.7 8-1.1-7.4.9-14.8 1.5-22.2 1.6 8.6 15 17.3 30.1 25.9 45.1 21.2-38.7 32.8-82.2 33.2-126.4.1-9.7 0-19.4 0-29.2V172.4l-30 30h119.6c6.3 0 12.9-.5 19.2.3-2.7-.4-5.3-.7-8-1.1 2.2.4 4.3 1 6.4 1.9l-7.2-3c1.2.6 2.3 1.2 3.5 1.8 4.5 2.3-5.9-5.4-1.5-1 4.1 4.1-2.5-4.6-1.4-2 .6 1.4 1.6 2.7 2.2 4l-3-7.2c.9 2.1 1.5 4.2 1.9 6.4-.4-2.7-.7-5.3-1.1-8 .2 1.7.3 3 .3 4.4.4 15.7 13.5 30.7 30 30 15.9-.7 30.4-13.2 30-30-.8-31.5-25.7-56.1-57.3-56.3-8.1-.1-16.2 0-24.3 0H746.1c-16.2 0-30 13.7-30 30v174.5c0 15.6-.1 31.1-2.2 46.7.4-2.7.7-5.3 1.1-8-2.8 20-8.1 39.5-15.8 58.2l3-7.2c-3.3 7.8-7 15.4-11.1 22.9-10.7 19.5 2.6 45.6 25.9 45.1 36-.7 71.2-9.8 102.9-26.8 30.6-16.4 56.2-40.2 76.5-68.2 19.2-26.6 32.4-58.6 37.3-91 3.2-21.3 3.3-42.1 3.3-63.5v-56.6c0-15.7-13.8-30.7-30-30-16.3 1-30 13.4-30 30.2zM537.6 589.2v96.4l30-30H456.4l30 30v-96.4c-12.7 9.6-25.3 19.3-38 28.9 41.8 10 85.3 10 127.1 0 15.3-3.7 25.8-21.8 21-36.9-5.1-15.9-20.5-24.9-36.9-21-7.8 1.9-15.7 3.4-23.6 4.5 2.7-.4 5.3-.7 8-1.1-21.3 2.8-42.7 2.8-64 0 2.7.4 5.3.7 8 1.1-7.9-1.1-15.8-2.6-23.6-4.5-18.8-4.5-38 8.9-38 28.9v96.4c0 16.2 13.7 30 30 30h111.2c16.2 0 30-13.7 30-30v-96.4c0-15.7-13.8-30.7-30-30-16.3.9-30 13.3-30 30.1zM696.6 846v26.8c0 9 .9 18.6-.2 27.6.4-2.7.7-5.3 1.1-8-.3 1.4-.7 2.5-1.2 3.8l3-7.2c-.4.8-.8 1.6-1.3 2.3 3.4-4 4.3-5.2 2.6-3.6-1.7 1.6-.5.8 3.6-2.6-.7.5-1.5.9-2.3 1.3l7.2-3c-1.3.5-2.5.9-3.8 1.2 2.7-.4 5.3-.7 8-1.1-4.2.5-8.6.2-12.8.2H361.6c-15.8 0-31.7.4-47.6 0-1.1 0-2.2-.1-3.3-.2 2.7.4 5.3.7 8 1.1-1.4-.3-2.5-.7-3.8-1.2l7.2 3c-.8-.4-1.6-.8-2.3-1.3 4 3.4 5.2 4.3 3.6 2.6-1.6-1.7-.8-.5 2.6 3.6-.5-.7-.9-1.5-1.3-2.3l3 7.2c-.5-1.3-.9-2.5-1.2-3.8.4 2.7.7 5.3 1.1 8-1.2-9.3-.2-19.2-.2-28.6 0-9.4-1-19.3.2-28.6-.4 2.7-.7 5.3-1.1 8 .3-1.4.7-2.5 1.2-3.8l-3 7.2c.4-.8.8-1.6 1.3-2.3-3.4 4-4.3 5.2-2.6 3.6 1.7-1.6.5-.8-3.6 2.6.7-.5 1.5-.9 2.3-1.3l-7.2 3c1.3-.5 2.5-.9 3.8-1.2-2.7.4-5.3.7-8 1.1 4.2-.5 8.6-.2 12.8-.2h338.9c15.8 0 31.7-.4 47.6 0 1.1 0 2.2.1 3.3.2-2.7-.4-5.3-.7-8-1.1 1.4.3 2.5.7 3.8 1.2l-7.2-3c.8.4 1.6.8 2.3 1.3-4-3.4-5.2-4.3-3.6-2.6 1.6 1.7.8.5-2.6-3.6.5.7.9 1.5 1.3 2.3l-3-7.2c.5 1.3.9 2.5 1.2 3.8-.4-2.7-.7-5.3-1.1-8 .1 1 .2 1.9.2 2.8.7 15.7 13.3 30.7 30 30 15.7-.7 30.7-13.2 30-30-1.1-25.8-20.5-45.4-46.5-46.1-2.1-.1-4.2 0-6.4 0h-389c-16.5.1-30.4 7.6-39.9 21-8.1 11.5-7.5 24.8-7.5 38v32.4c0 2.3-.1 4.7 0 7 1 16.6 9.2 32 24.4 39.9 7.6 4 15.9 5.5 24.3 5.5h377.9c5.5 0 10.9.2 16.4 0 26.3-.9 45.9-21.4 46.1-47.6.1-9.6 0-19.2 0-28.8v-21.4c0-15.7-13.8-30.7-30-30-16.1.9-29.8 13.3-29.8 30.1z"/><path d="M627.3 775.3v54.6l30-30H366.6l30 30v-31.8c0-11.7-.7-23.6.8-35.2-.4 2.7-.7 5.3-1.1 8 1.1-7.5 3.1-14.9 5.9-21.9l-3 7.2c2.2-5.2 4.8-10.3 8-15 .7-1.1 1.5-2.1 2.2-3.2 2.9-4.3-5.3 6.2-1.1 1.4 1.9-2.1 3.7-4.2 5.7-6.2 1.8-1.8 3.8-3.6 5.7-5.3 5.1-4.3-3.4 2.3-1.5 1.1 1.3-.8 2.5-1.8 3.7-2.6 4.8-3.1 9.8-5.8 15-8l-7.2 3c7.1-2.9 14.4-4.8 21.9-5.9-2.7.4-5.3.7-8 1.1 15.7-2 32.2-.8 47.9-.8h65c7.7 0 15.4-.2 23.1.8-2.7-.4-5.3-.7-8-1.1 7.5 1.1 14.9 3.1 21.9 5.9l-7.2-3c5.2 2.2 10.3 4.8 15 8 1.1.7 2.1 1.5 3.2 2.2 4.3 2.9-6.2-5.3-1.4-1.1 2.1 1.9 4.2 3.7 6.2 5.7 1.8 1.8 3.6 3.8 5.3 5.7 4.3 5.1-2.3-3.4-1.1-1.5.8 1.3 1.8 2.5 2.6 3.7 3.1 4.8 5.8 9.8 8 15l-3-7.2c2.9 7.1 4.8 14.4 5.9 21.9-.4-2.7-.7-5.3-1.1-8 1.1 4.3 1.4 8.4 1.4 12.5.1 15.7 13.7 30.7 30 30 16.2-.7 30.1-13.2 30-30-.4-53-36.2-101-87.5-115.3-24.6-6.9-52.1-4.4-77.4-4.4-22 0-44-.1-66 0-52.1.3-98 34.3-114.2 83.6-5.6 17.1-5.6 34.9-5.6 52.7v38c0 16.2 13.7 30 30 30h290.7c16.2 0 30-13.7 30-30v-54.6c0-15.7-13.8-30.7-30-30-16.2.8-30 13.2-30 30z"/>
        </svg> */}
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 135.0">
 <path d="m84.375 50c0-18.953-15.422-34.375-34.375-34.375s-34.375 15.422-34.375 34.375c0 11.535 5.7305 21.742 14.477 27.98l-7.6875 7.6875c-0.60937 0.60938-0.91406 1.4102-0.91406 2.2109 0 0.80078 0.30469 1.5977 0.91406 2.2109 0.60938 0.60938 1.4102 0.91406 2.2109 0.91406s1.5977-0.30469 2.2109-0.91406l8.8672-8.8672c4.3594 2.0039 9.1914 3.1523 14.297 3.1523s9.9375-1.1484 14.301-3.1562l8.8672 8.8672c0.60938 0.60937 1.4102 0.91406 2.2109 0.91406 0.80078 0 1.5977-0.30469 2.2109-0.91406 0.60938-0.60938 0.91406-1.4102 0.91406-2.2109s-0.30469-1.5977-0.91406-2.2109l-7.6914-7.6914c8.7461-6.2305 14.477-16.438 14.477-27.973zm-62.5 0c0-15.508 12.617-28.125 28.125-28.125s28.125 12.617 28.125 28.125-12.617 28.125-28.125 28.125-28.125-12.617-28.125-28.125zm6.3633-29.688c0.58594-0.58594 0.91406-1.3789 0.91406-2.2109 0-0.82812-0.32812-1.6211-0.91406-2.207l-1.1055-1.1055c-4.1328-4.1328-11.34-4.1328-15.469 0-2.0664 2.0664-3.2031 4.8125-3.2031 7.7344 0 2.9219 1.1367 5.6719 3.2031 7.7344l1.1055 1.1055c0.60938 0.60547 1.4102 0.91016 2.207 0.91016 0.80078 0 1.6016-0.30469 2.2109-0.91406zm-13.527 2.2109c0-1.25 0.48828-2.4297 1.375-3.3125 0.88281-0.88672 2.0625-1.375 3.3125-1.375 0.71094 0 1.3984 0.16016 2.0234 0.45312l-6.2578 6.2578c-0.29687-0.625-0.45312-1.3125-0.45312-2.0234zm73.625-7.7344c-4.1328-4.1328-11.336-4.1328-15.469 0l-1.1055 1.1055c-0.58594 0.58594-0.91406 1.3789-0.91406 2.2109 0 0.82812 0.32812 1.6211 0.91406 2.207l11.051 11.047c0.60938 0.60938 1.4102 0.91406 2.2109 0.91406 0.80078 0 1.5977-0.30469 2.2109-0.91406l1.1016-1.1055c2.0664-2.0625 3.207-4.8086 3.207-7.7344-0.003907-2.918-1.1406-5.6641-3.207-7.7305zm-3.5 9.7578-6.2539-6.2578c1.7227-0.81641 3.9492-0.46875 5.3359 0.91797 0.88672 0.88672 1.375 2.0625 1.375 3.3125-0.003907 0.71484-0.16016 1.3984-0.45703 2.0273zm-31.711 6.7031v18.75c0 1.7266-1.3984 3.125-3.125 3.125h-12.5c-1.7266 0-3.125-1.3984-3.125-3.125s1.3984-3.125 3.125-3.125h9.375v-15.625c0-1.7266 1.3984-3.125 3.125-3.125s3.125 1.3984 3.125 3.125z"/>
</svg>
      </button>

      <button
        aria-label="Play Audio Button"
        className={styles.menuBtn}

      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="-5.0 -10.0 110.0 135.0"
        >
          <path d="m42.414 19.301c6.7266-4.7188 15.586 0.33594 15.586 8.3125v44.773c0 7.9766-8.8594 13.035-15.586 8.3125l-18.605-13.051h-8.8672c-5.5742 0-9.9414-4.6055-9.9414-10.102v-15.094c0-5.4961 4.3672-10.102 9.9414-10.102h8.8672zm8.5859 8.3125c0-2.6406-2.7461-3.8594-4.5664-2.582l-20.414 14.32h-11.078c-1.543 0-2.9414 1.3047-2.9414 3.1016v15.094c0 1.7969 1.3984 3.1016 2.9414 3.1016h11.078l20.414 14.32c1.8203 1.2773 4.5664 0.058594 4.5664-2.582z" fill-rule="evenodd"/>
          <path d="m79.074 22.477c1.3906-1.3398 3.6094-1.2969 4.9492 0.097657 6.793 7.0625 10.977 16.754 10.977 27.426s-4.1836 20.363-10.977 27.426c-1.3398 1.3945-3.5586 1.4375-4.9492 0.097657-1.3945-1.3398-1.4375-3.5586-0.097657-4.9492 5.5742-5.793 9.0234-13.758 9.0234-22.574s-3.4492-16.781-9.0234-22.574c-1.3398-1.3906-1.2969-3.6094 0.097657-4.9492z"/>
          <path d="m70.098 31.656c-1.293-1.4375-3.5078-1.5508-4.9414-0.25391-1.4375 1.293-1.5508 3.5078-0.25391 4.9414 3.125 3.4648 5.0977 8.2812 5.0977 13.656s-1.9727 10.191-5.0977 13.656c-1.2969 1.4336-1.1836 3.6484 0.25391 4.9414 1.4336 1.2969 3.6484 1.1836 4.9414-0.25391 4.2969-4.7617 6.9023-11.25 6.9023-18.344s-2.6055-13.582-6.9023-18.344z"/>
        </svg>
      </button>

    </div>
  );
};

export default MenuBar;
