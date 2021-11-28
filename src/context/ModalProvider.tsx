import React, {
  ComponentType,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

export interface ModalProps {
  id: string;
  open?: Boolean;
  state?: any;
  close: (_param?: any) => void;
  dismiss: (_reason?: string) => void;
}

interface Modal {
  component: ComponentType<any>;
  props: ModalProps;
}

interface ModalConfiguration {
  onClose?: () => {};
  state?: any;
}

interface ModalProviderState {
  [id: string]: Modal;
}

interface ModalContextProps {
  showModal(
    _component: ComponentType<any>,
    _config?: ModalConfiguration
  ): Promise<any>;
  closeAll(): void;
}

const ModalContext = createContext<ModalContextProps>({
  showModal: (_component: ComponentType<any>, _config?: ModalConfiguration) =>
    Promise.reject(),
  closeAll: () => {},
});

const initialState: ModalProviderState = {};

export function ModalProvider({ children }: any) {
  const [state, setState] = useState<ModalProviderState>(initialState);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      setState({});
      setInitialized(true);
    }
  }, [initialized]);

  const closeAll = useCallback(() => {
    setState({});
  }, []);

  const closeModal = useCallback((id: string) => {
    setState((prevState) => {
      // eslint-disable-next-line no-unused-vars
      let { [id]: x, ...newState } = prevState;
      return newState;
    });
  }, []);

  const showModal = useCallback(
    (component: ComponentType<any>, config?: ModalConfiguration) => {
      const id =
        Math.random().toString(36).substring(5, 10) +
        "." +
        Math.random().toString(36).substring(2, 7);

      let resolveModal = (_param?: any) => {};
      let rejectModal = (_reason?: any) => {};

      setState((prevState) => ({
        ...prevState,
        [id]: {
          component,
          props: {
            id: id,
            open: true,
            state: config?.state,
            close: (param?: any) => {
              closeModal(id);
              resolveModal(param);
            },
            dismiss: (reason?: string) => {
              closeModal(id);
              rejectModal(reason);
            },
          },
        },
      }));

      return new Promise<any>((resolve, reject) => {
        resolveModal = resolve;
        rejectModal = reject;
      });
    },
    [closeModal]
  );

  return (
    <ModalContext.Provider value={{ showModal, closeAll }}>
      {children}
      {Object.keys(state).map((id) => {
        const { component: Component, props } = state[id];
        return Component ? <Component key={id} {...props} /> : null;
      })}
    </ModalContext.Provider>
  );
}

export default ModalContext;
