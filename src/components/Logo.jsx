const Logo = ({ size = 32 }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {/* Logo Icon */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Red Rounded Square */}
        <rect
          x="0"
          y="0"
          width="32"
          height="32"
          rx="8"
          fill="#E53935"
        />

        {/* White Heart Outline */}
        <path
          d="M16 22.5s-6.5-4.3-6.5-8.3c0-2.1 1.6-3.7 3.6-3.7
             1.4 0 2.6.8 3.2 1.9
             .6-1.1 1.8-1.9 3.2-1.9
             2 0 3.6 1.6 3.6 3.7
             0 4-6.5 8.3-6.5 8.3z"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      {/* Brand Name */}
      <span
        style={{
          fontSize: "25px",
          fontWeight: 700,
          color: "#111111",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        BloodConnect
      </span>
    </div>
  );
};

export default Logo;
