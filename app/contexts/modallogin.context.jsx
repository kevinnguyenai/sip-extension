import { createContext } from 'react';
import PT from 'prop-types';
import useModal from '~/components/ModalLogin/useModal';
import { RenderModal } from '~/components/ModalLogin/modal';

const ModalContext = createContext(null);
const ModalUpdateContext = createContext(null);

WithModalProvider.propTypes = {
  children: PT.oneOfType([PT.arrayOf(PT.node), PT.node]).isRequired,
};

export default function WithModalProvider({ children }) {
  const [modalOptions, setModalOptions] = useModal({
    isOpen: false,
    modalProps: {},
  });

  return (
    <ModalUpdateContext.Provider value={setModalOptions}>
      <ModalContext.Provider value={modalOptions}>
        {children}
        <RenderModal />
      </ModalContext.Provider>
    </ModalUpdateContext.Provider>
  );
}

export { ModalContext, ModalUpdateContext };
