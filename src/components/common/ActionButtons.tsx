import { IconEye, IconTrash, IconEdit } from '@tabler/icons-react';

type ActionButtonsProps = {
    handleViewClick?: () => void;
    handleEditClick?: () => void;
    handleDeleteClick?: () => void;
}

export default function ActionButtons({ handleViewClick, handleEditClick, handleDeleteClick }: ActionButtonsProps) {
    return (
        <div className="flex items-center gap-4">
            <button className="p-0 text-black rounded " onClick={handleViewClick}>
                <IconEye className="inline-block mr-2" />
            </button>
            <button className="p-0 text-black rounded " onClick={handleEditClick}>
                <IconEdit className="inline-block mr-2" />
            </button>
            <button className="p-0 text-black rounded " onClick={handleDeleteClick}>
                <IconTrash className="inline-block mr-2" />
            </button>
        </div>
    );
}