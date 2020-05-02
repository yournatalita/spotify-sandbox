import { IRequest } from '../store/models/declarations.d';
import { StoreInterface } from '../store/index.d';

export interface MainProps extends StoreInterface {
  getPersonalization: (options: IRequest) => void;
}

export interface DispatchProps {
  getPersonalization: (options: IRequest) => void;
}

export type StateProps = Partial<StoreInterface>;
