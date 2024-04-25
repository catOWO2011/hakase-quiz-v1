import { Button, Modal } from "antd";
import React, { useState } from "react";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="fixed z-50 w-screen bg-slate-300 p-6 px-16">
      <div className="hidden md:flex w-full h-full items-stretch">
        <div className="flex items-center gap-2">
          LOGO
          {/* <img src={Logo} className='w-10 object-cover' alt='logo'/> */}
          <p className="text-fuchsia-400 text-xl font-bold">Hakase Quiz</p>
        </div>
        <div className="grow justify-end">
          <Button className="float-right" onClick={showModal}>
            Create a new quiz
          </Button>
          <Modal
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[
              <Button
                key="submit"
                type="primary"
              >
                Submit
              </Button>
            ]}
          ></Modal>
        </div>
      </div>
      <div className="flex md:hidden w-full h-full"></div>
    </div>
  );
};

export default Header;
