import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';
import useCheckout from '../bookings/useCheckout';

function CheckoutButton({ bookingId }) {
  const { checkOut, isCheckingOut } = useCheckout();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkOut(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
