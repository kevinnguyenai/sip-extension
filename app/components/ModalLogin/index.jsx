import React,  {Fragment} from 'react';
import { Modal } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import PT from 'prop-types';
import { connect } from 'dva';
import styles from './styles.less';

ModalWrapper.propTypes = {
  modal: PT.shape({
    isOpen: PT.bool,
    element: PT.instanceOf(Object),
  }),
  confirmLoading: PT.bool,
  onCancel: PT.func,
};

ModalWrapper.defaultProps = {
  modal: {
    isOpen: true,
    element: {
      content: "Hello Login",
      title: "Login From",
      width: "32vh",
    }
  },
  confirmLoading: false,
  onCancel: () => {},
};

function ModalWrapper(props) {
  const {
    modal: {
      isOpen,
      element: { content, footer, title, width, bodyStyle, closable },
    },
    confirmLoading,
    onCancel,
  } = props;

  return (
    <Fragment>
      <Modal
        title={title}
        style={{
          margin: 0,
          position: 'relative',
          background: 'green',
        }}
        //className={styles.standardListForm}
        width={width}
        bodyStyle={{ padding: '16px 0', ...bodyStyle }}
        destroyOnClose
        visible={isOpen}
        onCancel={onCancel}
        confirmLoading={confirmLoading}
        closable={closable}
        closeIcon={<CloseCircleFilled twoToneColor="#eb2f96" />}
        {...footer}
      >
        <div>
          <h1>LOGIN FORM</h1>
        </div>
      </Modal>
    </Fragment>
  );
}

export const { confirm } = Modal;

export default connect(({ modal }) => ({ modal }))(ModalWrapper);
