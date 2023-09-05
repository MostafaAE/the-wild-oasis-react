import styled from 'styled-components';
import BookingDataBox from '../../features/bookings/BookingDataBox';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from '../bookings/useBooking';
import Spinner from '../../ui/Spinner';
import Empty from '../../ui/Empty';
import { useEffect, useState } from 'react';
import Checkbox from '../../ui/Checkbox';
import { formatCurrency } from '../../utils/helpers';
import { useCheckin } from '../bookings/useCheckin';
import { useSettings } from '../settings/useSettings';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { isLoading, booking } = useBooking();
  const { isCheckingIn, checkIn } = useCheckin();
  const { isLoading: isLoadingSettings, settings } = useSettings();

  useEffect(
    function () {
      setConfirmPaid(booking?.isPaid || false);
      setAddBreakfast(booking?.hasBreakfast || false);
    },
    [booking?.isPaid, booking?.hasBreakfast]
  );

  const moveBack = useMoveBack();

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    extrasPrice,
  } = booking;

  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      checkIn({
        bookingId,
        breakfast: {
          extrasPrice: optionalBreakfastPrice,
          hasBreakfast: true,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else checkIn({ bookingId, breakfast: {} });
  }

  if (!booking) return <Empty resourceName={'checkin'} />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast(breakfast => !breakfast);
              setConfirmPaid(false);
            }}
            id="breakfast"
            disabled={hasBreakfast}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid || isCheckingIn}
          onChange={() => setConfirmPaid(confirm => !confirm)}
          id="confirm"
          disabled={confirmPaid}
        >
          I confirm that {guests.fullName} has paid the total amount of{' '}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice - extrasPrice
              )} (${formatCurrency(totalPrice - extrasPrice)} +
                ${formatCurrency(optionalBreakfastPrice)})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
