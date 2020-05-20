import React, { useState } from 'react';
import ReactModal from 'react-modal';

interface Props {
  content: ((toggle: () => void) => void) | React.ReactNode;
  children(toggle: () => void): void;
}

const Modal: React.FC<Props> = ({ content, children }) => {
  const [show, setShow] = useState(false);

  const toggle = () => {
    setShow(!show);
  };

  return (
    <>
      <ReactModal
        ariaHideApp={false}
        isOpen={show}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            top: '5vh',
            left: '10vw',
            right: '10vw',
            bottom: '',
          },
        }}
      >
        <div className="flex justify-between">
          <div className="flex flex-col items-center w-full">
            {typeof content === 'function' ? content(toggle) : content}
          </div>
          <button className="self-start" type="button" onClick={() => toggle()}>
            <i className="material-icons align-middle">close</i>
          </button>
        </div>
      </ReactModal>
      {children(toggle)}
    </>
  );
};

export { Modal };
