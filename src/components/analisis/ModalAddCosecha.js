// import { Button, Modal } from 'antd'
// import React, { useContext, useState } from 'react'
// import { GlobalContext } from '../../context/GlobalContext';

// export const ModalAddCosecha = () => {

//     // const [isModalOpen, setIsModalOpen] = useState(false);

//     // const showModal = () => {
//     //   setIsModalOpen(true);
//     // };

//     const {
//       isModalOpen,
//       setIsModalOpen,
//   } = useContext(GlobalContext)

//     const handleGuardar = () => {
//       setIsModalOpen(false);
//     };

//     const handleCancel = () => {
//       setIsModalOpen(false);
//     };

//     return (
//         <>
//             {/* <Button type="primary" onClick={showModal}>
//                 Open Modal
//             </Button> */}
//             <Modal 
//               title="Agregar Cosecha" 
//               open={isModalOpen} onOk={handleGuardar} 
//               onCancel={handleCancel}
//               style={{"zIndex":"999"}}
//             >
//                 <p>Some contents...</p>
//                 <p>Some contents...</p>
//                 <p>Some contents...</p>
//             </Modal>
//         </>
//     )
// }
