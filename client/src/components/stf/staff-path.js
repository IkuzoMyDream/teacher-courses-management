import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export default function StaffPath() {
  const { pathname } = useLocation();
  const courseName = pathname.split("/")[3];
  console.log(pathname);
  return (
    <Container>
      <h3>{pathname}</h3>
    </Container>
  );
}
