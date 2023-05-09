import {ILevelForm} from "../../types/forms";


export interface ILevelModalProps {
    open: boolean,
    onClose: () => void,
    onSubmit: (values: ILevelForm) => void,
    initialValues?: ILevelForm,
    submitText?: string,
    titleText?: string,
    loading?: boolean
}