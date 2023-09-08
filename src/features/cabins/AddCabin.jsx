import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   function handleCloseModal() {
//     setIsOpenModal(false);
//   }
//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal(open => !open)}>
//         Add new cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={handleCloseModal}>
//           <CreateCabinForm onCloseModal={handleCloseModal} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
