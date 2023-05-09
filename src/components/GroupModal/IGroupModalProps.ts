import {IGroupForm} from "../../types/forms";

export interface IGroupModalProps {
    open: boolean,
    onClose: () => void,
    onSubmit: (values: IGroupForm) => void,
    initialValues?: IGroupForm,
    submitText?: string,
    titleText?: string,
    loading?: boolean
}