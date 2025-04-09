import styled from "styled-components";
import type { Cabin } from "./types/Cabin.ts";
import { formatCurrency } from "../../utils/helpers.ts";
import CreateCabinForm from "./CreateCabinForm.tsx";
import useDeleteCabin from "./hooks/useDeleteCabin.ts";
import { HiSquare2Stack } from "react-icons/hi2";
import { HiPencil, HiTrash } from "react-icons/hi";
import useCreateCabin from "./hooks/useCreateCabin.ts";
import Modal from "../../ui/Modal.tsx";
import ConfirmDelete from "../../ui/ConfirmDelete.tsx";
import Table from "../../ui/Table.tsx";
import Menus from "../../ui/Menus.tsx";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
  text-align: center;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  text-align: center;
  color: var(--color-green-700);
`;

const Span = styled.span`
  text-align: center;
`;

function CabinRow({ cabin }: { cabin: Cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <Span>&mdash;</Span>
      )}
      <div>
        <button disabled={isCreating} onClick={handleDuplicate}>
          <HiSquare2Stack />
        </button>

        <Modal>
          <Modal.Open opens="editCabin">
            <button>
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Window name="editCabin">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          <Modal.Open opens="deleteCabin">
            <button>
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Window name="deleteCabin">
            <ConfirmDelete
              onConfirm={() => deleteCabin(cabinId)}
              disabled={isDeleting}
              resourceName={name}
            />
          </Modal.Window>
        </Modal>
        <Menus.Menu>
          <Menus.Toggle id={cabinId} />
          <Menus.List id={cabinId}>
            <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
              Duplicate
            </Menus.Button>

            <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>

            <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
