import {Container, Card, Button} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

const Hero = () => {
    return (
        <div className="py-5">
            <Container className="d-flex justify-content-center">
                <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
                    <h1 className="text-center mb-4">Allo Media Auth</h1>
                    <p>Allo Media Auth Stores a JWT in an HTTP-Only cookie. It uses Redux Toolkit and the react bootstrap </p>
                    <div className="d-flex">
                        <LinkContainer to="/login">
                            <Button variant='primary' className="me-3">
                                Login
                            </Button>
                        </LinkContainer>
                        <LinkContainer to="/register">
                            <Button variant='secondary' className="me-3">
                                Register
                            </Button>
                        </LinkContainer>
                    </div>
                </Card>
            </Container>
        </div>
    )

}

export default Hero