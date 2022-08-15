import React,  {Fragment} from 'react';
import { Modal } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import PT from 'prop-types';
import { connect } from 'dva';
import styles from './styles.less';
import LoginForm from '~/components/LoginForm';

Login.propTypes = {
  login: PT.shape({
    isOpen: PT.bool,
    element: PT.instanceOf(Object),
  }).isRequired,
  confirmLoading: PT.bool,
  onCancel: PT.func,
};

Login.defaultProps = {
  confirmLoading: false,
  onCancel: () => {},
};

function Login(props) {
  const {
    login: {
      isOpen,
      element: { content, footer, title, width, bodyStyle, closable },
    },
    confirmLoading,
    onCancel,
    history,
    location,
  } = props;
  
  const Content = (Item) => {
    return(<div><Item/></div>);
  }

  const closeLoginForm = (isOpen) => {
    props.dispatch({
      type: 'login/close',
      payload: isOpen,
    })
  }

  return (
    <Fragment>
      <Modal
        title={title}
        //className={styles.standardListForm}
        width={width}
        bodyStyle={{ padding: '16px 0', ...bodyStyle }}
        destroyOnClose
        visible={isOpen}
        onCancel={closeLoginForm.bind(null, isOpen)}
        confirmLoading={confirmLoading}
        closable={closable}
        closeIcon={<CloseCircleFilled twoToneColor="#eb2f96" />}
        footer= {footer}
      >
      <div>
        {Content(content)}
      </div>
      </Modal>
    </Fragment>
  );
}

export const { confirm } = Modal;

function mapStateToProps(state) {
  return(state)
}


export default connect(mapStateToProps)(Login);
