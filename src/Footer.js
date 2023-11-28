const Footer = (props) => {
  return (
    <footer>
      You have {props.length === 0 ? "NO" : props.length} wrok balance!
    </footer>
  );
};
export default Footer;
