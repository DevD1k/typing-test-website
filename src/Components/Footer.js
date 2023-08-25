import Select from "react-select";
import { themeOptions } from "../Utils/themeOptions";
import { useTheme } from "../Context/ThemeContext";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";

function Footer() {
  const { theme, setTheme } = useTheme();
  const iconStyle = {
    fontSize: "2.5rem",
    margin: "5px",
    color: `${theme.textColor}`,
  };

  function handleChange(e) {
    setTheme(e.value);
    localStorage.setItem("theme", JSON.stringify(e.value));
  }
  return (
    <div className="footer">
      <div className="links">
        <span>
          <Link to="https://github.com/DevD1k" target="_blank">
            <GitHubIcon style={iconStyle} />
          </Link>
        </span>
        <span>
          <Link
            to="https://www.linkedin.com/in/devdutt-mehrol-005205264/"
            target="_blank"
          >
            <LinkedInIcon style={iconStyle} />
          </Link>
        </span>
      </div>
      <div className="themeButton">
        <Select
          onChange={handleChange}
          options={themeOptions}
          menuPlacement="top"
          defaultValue={{ label: themeOptions.label, value: theme }}
          styles={{
            control: (styles) => ({
              ...styles,
              backgroundColor: theme.background,
              width: "8rem",
            }),
            menu: (styles) => ({
              ...styles,
              backgroundColor: theme.background,
            }),
            option: (styles, { isFocused }) => {
              return {
                ...styles,
                backgroundColor: !isFocused
                  ? theme.background
                  : theme.textColor,
                color: !isFocused ? theme.textColor : theme.background,
              };
            },
          }}
        />
      </div>
    </div>
  );
}

export default Footer;
