export const customStyles = {
    control: (base, { isFocused, isSelected }) => ({
        ...base,
        position: 'relative',
        background: window.innerWidth > 1000 ? "#fff" : "#f0efef",
        minHeight: "35px",
        width: "250px",
        height: "35px",
        border: "1px solid #322108",
        borderRadius: "10px",
        borderColor: isSelected ? "#322108" : "#322108",
        boxShadow: isFocused ? "#322108" : "#322108",
        "&:hover": {
            borderColor: "#322108",
        },
        textAlign: "left",
        fontSize: '13px'
    }),
    valueContainer: (provided) => ({
        ...provided,
        height: "30px",
        padding: "0 15px",
    }),
    input: (provided) => ({
        ...provided,
        margin: "0px",
    }),
    indicatorSeparator: () => ({
        display: "none",
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
        height: "30px",
    }),
    option: (styles, { isFocused, isHovered }) => ({
        ...styles,
        backgroundColor: isFocused || isHovered ? "#D7B889" : "transparent",
        "&:hover": {
            backgroundColor: "#D7B889",
        },
        color: "#322108",
        textAlign: "left",
        fontSize: '13px'
    }),
    menu: (provided) => ({
        ...provided,
        position: "absolute",
        top: "100%",  // Posizione sotto la Select
        left: "0",    // Allinea a sinistra
        width: "250px", // Puoi definire una larghezza fissa per il menu
        background: window.innerWidth > 1000 ? "#fff" : "#f0efef",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: '10px'
    }),
    menuList: (provided) => ({
        ...provided,
        background: window.innerWidth > 1000 ? "#fff" : "#f0efef",
        padding: 0,
        maxHeight: "220px",
        overflowY: "auto",
        borderRadius: '0 0 10px 10px'
    }),
    clearIndicator: (base) => ({
        ...base,
        paddingLeft: "0px",
        "&:hover": {
            color: "#322108",
        },
    }),
};

export const customModalStyles = {
    overlay: {
        backgroundColor: 'rgba(77, 77, 77, 0.6)', // grigio topo trasparente
    },
    content: {
        backgroundColor: '#fafafa',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '10px',
        width: '50%'
    },
};
