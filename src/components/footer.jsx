import React from "react";

const year = new Date().getFullYear();
function Footer() {
  return (
    <footer style={{textAlign:'center',display:'flex',justifyContent:'center',fontFamily:'Times new roman'}}>
      <p>© {year}</p>
    </footer>
  );
}

export default Footer;