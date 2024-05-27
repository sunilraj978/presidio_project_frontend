import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './productbuy.css'
import { useNavigate } from 'react-router-dom';
function SellerCard({ image, firstName, lastName, price , Bedrooms , Bathrooms , Area , Place , Nearby , id}) {

    const navigate = useNavigate()

    const handleinterest = (id)=>{
        navigate(`/sellerpage/${id}`);
    }

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={image} alt={`${firstName} ${lastName}`} />
            <Card.Body>
                <Card.Title><b>Price: ${price}</b>               
                 </Card.Title>
                <Card.Text>
                Place and Area : {Place} , {Area}
                </Card.Text>
                <Card.Text>
                    No.of Bedrooms: {Bedrooms}
                </Card.Text>
                <Card.Text>
                    No.of Bathrooms: {Bathrooms}
                </Card.Text>
                <Card.Text>
                    Nearby College/Hospital : {Nearby}
                </Card.Text>
                <Button variant="primary" className='intBtn' onClick={()=>{handleinterest(id)}}>Interested</Button>
            </Card.Body>
        </Card>
    );
}

export default SellerCard;

